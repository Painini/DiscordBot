const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  //Retrieves targeted user from command call
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify the user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you want to verify")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const verifiedID = "969254922849746974";
    const unverifiedID = "1004040256854708275";

    const user = interaction.options.getUser("target");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    member.roles.remove(unverifiedID).catch(console.error);
    member.roles.add(verifiedID).catch(console.error);
    await interaction.reply({
      content: `User verified`,
    });
  },
};
