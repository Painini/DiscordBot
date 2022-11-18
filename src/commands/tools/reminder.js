const { SlashCommandBuilder } = require("discord.js");
//Reminder needs to be able to send reminders to other users as well
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Set a reminder for a user")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("<message>,<minutes until reminder>,<target>")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const input = interaction.options.getString("input");
    const inputs = input.split(',');
    const message = inputs[0];
    const time = inputs[1];
    const target = inputs[2];
    console.log(target);
    const targetTrimmed = target.replaceAll(" ", "");
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    setTimeout(function () {
      interaction.editReply({
        content: `${targetTrimmed} Reminder: "${message}" `,
      });
    }, (time * 60000))
  },
};
