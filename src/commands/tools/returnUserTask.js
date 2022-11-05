//Write script for returning what game/app the user is currently using
//Consider following more tutorials 

const {SlashCommandBuilder}  = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('task').setDescription('Return user task'),
}
    