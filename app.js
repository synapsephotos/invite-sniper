const express = require('express');
const chalk = require("chalk");
const server = express();

server.all("/", (req, res) => res.send(`<meta http-equiv="refresh" content="0; URL=https://passwordpassword.online"/>`));
server.listen(process.env.PORT ?? 3000, () => {
    console.log(`${chalk.magentaBright.bold("scanner")} | ${chalk.redBright.bold("GAG")}`);
    console.log(`\n[${chalk.green.bold("+")}] The webserver is ready.\n`);
});

const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// === Configuration ===
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = 'YOUR_TARGET_CHANNEL_ID';

// === Invite Link Pattern ===
const INVITE_REGEX = /(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+/;

// === Event Listener ===
client.on('messageCreate', async (msg) => {
   if (msg.channel.id !== CHANNEL_ID) return;
   if (!msg.content) return;

   const matches = [...msg.content.matchAll(INVITE_REGEX)];
   const codes = matches.map(m => m[1]);

   for (const code of codes) {
      try {
         const joined = await client.acceptInvite(code, {
            bypassOnboarding: true,
            bypassVerify: true
         });

         console.log(`[JOINED] ${joined?.name || joined?.id || 'Unknown server'} (${code})`);
      } catch (err) {
         console.error(`[ERROR] Could not join ${code}: ${err.message}`);
      }
   }
});

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
