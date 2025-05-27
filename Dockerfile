FROM node:slim

WORKDIR /app
COPY . .
RUN npm ci

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
