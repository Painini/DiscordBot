const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('activity').setDescription('Return user activity'),
    async execute(interaction, client) {
        let member = interaction.member;
        if (member.presence.activities.length == 0 || (member.presence.activities[0] == "Custom Status" && member.presence.activities.length == 1)) {
            await interaction.reply({
                content: "No current activity"
            });
        }

        else if (member.presence.activities.length == 2){
            let newMessage = member.presence.activities[1].toString();
            await interaction.reply({
                content: newMessage
            });
        }
    }
}
    