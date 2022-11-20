const { SlashCommandBuilder } = require("discord.js");
const Player = require(require("path").resolve(
  __dirname,
  "../../schemas/player"
));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("characterimage")
    .setDescription("Set your character's image!")
    .addStringOption((option) =>
      option.setName("input")
        .setDescription("Paste an image URL here")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const url = interaction.options.getString("input")
    const member = await interaction.guild.members
      .fetch(interaction.user.id)
      .catch(console.error);

    let playerProfile = await Player.findOne({playerId: member})
    if (!playerProfile)
    {
        await interaction.reply({
            content: "No character exists! Please use the register command to create a character",
            ephemeral: true,
        })
    }
    else
    {
        await playerProfile.updateOne({ playerImg: url})
        await interaction.reply({
            content: "Character image sucessfully updated!",
        })
    }
  },
};
