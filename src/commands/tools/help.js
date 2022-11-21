const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("For information about Pooka!"),

    async execute (interaction, client) {
        interaction.reply({
            content: "I'm Pooka! Here are my abilities:\n" +
            "/ping - Show my current delay.\n" +
            "/image - Display an image with a given prompt.\n" +
            "/reminder - Set a timed reminder for a user on the server.\n" +
            "/savemessage | /loadmessage - Store and bring forth a message.\n" +
            "/activity - Find out what you're currently doing.\n" +
            "/register - Create a character to be used in battles.\n" +
            "/profile - See your character and their stats.\n" +
            "/characterimage - Set your character's image.\n" +
            "/battle - Fight an enemy.\n" + 
            "/grow - Grow a pretty flower.\n" + 
            "**| Administrative Commands |**\n" +
            "/verify - Let a new user into the main server.\n" +
            "/database - Store info about the server.\n",
        })
    }
}