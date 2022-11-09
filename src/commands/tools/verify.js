const { SlashCommandBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
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

    
    const verifiedID = "1039503588839399434";
    const unverifiedID = "1039503650122379294";

    const user = interaction.options.getUser("target");
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers))
    {
        member.roles.remove(unverifiedID).catch(console.error);
        member.roles.add(verifiedID).catch(console.error);
        await interaction.reply({
            content: `User verified`
        });
    }
    else
        await interaction.reply({
            content: "No Permissions",
            ephemeral: true,
        });
  },
};
