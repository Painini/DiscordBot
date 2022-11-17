const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Weapon = require("../../schemas/weapon");
const Player = require(require("path").resolve(
  __dirname,
  "../../schemas/player"
));

module.exports = {
  data: new SlashCommandBuilder().setName("profile").setDescription("View your character!"),

  async execute(interaction, client) {
    const member = await interaction.guild.members
      .fetch(interaction.user.id)
      .catch(console.error);

    let playerProfile = await Player.findOne({ playerId: member });
    if (!playerProfile) {
      interaction.reply({
        content: `You have no character! Use the "/register" command to create one!`
      })
    }

    const playerEmbed = new EmbedBuilder()
      .setTitle(`Your character`)
      .setURL(
        `${playerProfile.playerImg}`
      )
      .setDescription(`Name: ${playerProfile.playerName}`)
      .addFields([
        {
          name: `Power: ${playerProfile.playerPower}`,
          value: `Tier: ${playerProfile.playerTier}`,
          inline: true,
        },
      ])
      .setImage(playerProfile.playerImg);


    let weaponProfile = await Weapon.findOne({ playerId: member })
    if (!weaponProfile) {
      await interaction.reply({
        embeds: [playerEmbed],
      });
    }
    else {
      let equipment = "";
      if (playerProfile.playerClass == "Warrior")
        equipment = "Weapon"
      else if (playerProfile.playerClass == "Mage")
        equipment = "Tome"
      const weaponEmbed = new EmbedBuilder()
      .setTitle(`Your ${equipment}`)
      .setURL(
      `${weaponProfile.weaponImg}`
      )
      .addFields([
        {
          name: `Power: ${weaponProfile.weaponPower}`,
          value: `${playerProfile.playerClass}`,
          inline: true,
        },
      ])
      .setImage(weaponProfile.weaponImg);

      await interaction.reply({
        embeds: [playerEmbed, weaponEmbed],
      });
    }
  },
};