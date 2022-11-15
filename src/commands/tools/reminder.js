const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Set a reminder for yourself")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("<message>,<minutes until reminder>")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const member = interaction.member;
    const input = interaction.options.getString("input");
    const i = input.indexOf(",");
    const message = input.slice(0, i);
    let time = input.slice(i + 1);
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    setTimeout(function () {
      interaction.editReply({
        content: `${member} Reminder: "${message}" `,
      });
    }, (time * 60000));
  },
};
