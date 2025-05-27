const express = require('express');
const chalk = require("chalk");
const server = express();

server.all("/", (req, res) => res.send(`<meta http-equiv="refresh" content="0; URL=https://passwordpassword.online"/>`));
server.listen(process.env.PORT ?? 3000, () => {
    console.log(`${chalk.magentaBright.bold("scanner")} | ${chalk.redBright.bold("GAG")}`);
    console.log(`\n[${chalk.green.bold("+")}] The webserver is ready.\n`);
});

// like njtro sniper..
require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const TOKEN = process.env.TOKEN;

// 🎯 Channels to scan for invites
const SCAN_CHANNEL_IDS = ['1358537025124569352', '1358537064538312935', '1119967762559815722']; // Replace with real channel IDs

// 📤 Log channel where invite links will be sent
const LOG_CHANNEL_ID = '1119967762559815722'; // Replace with real channel ID

const client = new Client({
  checkUpdate: false
});

// Regex to match Discord invite links
const INVITE_REGEX = /(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+/;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.id == '1215711442259542056') return;

  if (!SCAN_CHANNEL_IDS.includes(message.channel.id)) return;

  const match = message.content.match(INVITE_REGEX);
  if (match) {
    const inviteLink = match[0];
    const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
    if (logChannel) {
      logChannel.send(`🔗 Invite link detected \\@everyone\nin <#${message.channel.id}>\nby <@${message.author.id}>\n\n# ${inviteLink}`);
    } else {
      console.log("❌ Couldn't find log channel.");
    }
  }
});

client.login(TOKEN);

// what color did i use for the text GAG?
