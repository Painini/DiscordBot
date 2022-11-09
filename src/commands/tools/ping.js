const {SlashCommandBuilder}  = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Return my ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        //Print latency of bot
        const newMessage = `API latency: ${client.ws.ping}\n Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}