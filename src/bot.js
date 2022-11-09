require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds,  GatewayIntentBits.GuildPresences]});
client.commands = new Collection();
client.commandArray = [];

//Reads .js files and imports them as functions to the client variable.
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
     require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);

//Database login: discordbot, HsxYucIzzvrguZV9