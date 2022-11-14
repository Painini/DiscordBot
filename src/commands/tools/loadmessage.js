const Message = require(require('path').resolve(__dirname, "../../schemas/message"));
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("loadmessage").setDescription("Load a saved message"),

    async execute(interaction, client) {

        const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
        let messageProfile = await Message.findOne({ userId: member});

        if (!messageProfile)
        {
            await interaction.reply({
                content: "You have no message saved",
                ephemeral: true,

            });
        }
        else {
            const message = messageProfile.userMessage;
            await interaction.reply({
                content: message,
            });
        }
    },
};