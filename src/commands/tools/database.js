const Guild = require(require('path').resolve(__dirname, "../../schemas/guild"));
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

//Saves info about server to database
module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Stores server information in database"),
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${guildProfile.guildName}`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
