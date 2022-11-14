require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});
client.commands = new Collection();
client.commandArray = [];

//Reads .js files (commands) and imports them as functions to the client variable.
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
client.login(token); //Bot goes online

(async () => {
  await connect(databaseToken).catch(console.error); //Asynchronously connects to database
})();

//Database user: discordbot, HsxYucIzzvrguZV9

//<script async src="https://cse.google.com/cse.js?cx=1411e1dd27c05486e">
//</script>
//<div class="gcse-search"></div>