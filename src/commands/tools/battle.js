require("dotenv").config();
const Player = require(require("path").resolve(
  __dirname,
  "../../schemas/player"
));
const imageSearch = require("../../search/imageSearch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("battle")
    .setDescription("Battle an enemy!"),

  async execute(interaction, client) {
    const member = await interaction.guild.members
      .fetch(interaction.user.id)
      .catch(console.error);
    let playerProfile = await Player.findOne({ playerId: member });
    if (!playerProfile) {
      playerProfile = await new Player({
        _id: mongoose.Types.ObjectId(),
        playerId: member,
        playerName: interaction.user.name,
        playerPower: 10,
        playerTier: 0,
      });

      await playerProfile.save().catch(console.error);
      await interaction.reply({
        content: `No character was found, a new one has been created for you!\nHappy battling!`,
      });
    } else {
      playerPower = playerProfile.playerPower;
      //Code that builds enemy
      const enemyImageKeywords = [
        "Scary",
        "Giant",
        "Awful",
        "Frightening",
        "Strong",
        "Weak",
        "Little",
      ];
      const enemyTier = playerProfile.playerTier;
      const enemyPower = Math.floor(
        Math.random() * (playerPower / 0.95) + playerPower / 1.1
      );

      //Code that searches for enemy image
      let query = "";
      switch (enemyTier) {
        case 0:
          query =
            enemyImageKeywords[
              Math.floor(Math.random() * enemyImageKeywords.length)
            ] + " Slime";
          console.log(query);
          break;

        case 1:
          query =
            enemyImageKeywords[
              Math.floor(Math.random() * enemyImageKeywords.length)
            ] + " Skeleton";
          break;

        case 2:
          query =
            enemyImageKeywords[
              Math.floor(Math.random() * enemyImageKeywords.length)
            ] + " Demon";
          break;

        default:
          query = "cute bunny";
          break;
      }

      const searchResult = await imageSearch.ImageSearch(query);
      const url = searchResult.CurrentSearch().link;
      const customSearchEngineUrl = query.replaceAll(" ", "%20");

      //Embed that shows enemy image
      const enemyEmbed = new EmbedBuilder()
        .setTitle(`Your enemy is a ${query}!`)
        .setURL(
          `https://cse.google.com/cse?cx=${process.env.cx}#gsc.q=${customSearchEngineUrl}`
        )
        .setDescription(`Tier: ${enemyTier}`)
        .addFields([
          {
            name: `Power: ${enemyPower}`,
            value: "Scary!",
            inline: true,
          },
        ])
        .setImage(url);

      //Code that replies with enemy Embed
      await interaction.reply({
        embeds: [enemyEmbed],
        content: "You are battling!!!",
        fetchReply: true,
      });

      //Code that calculates winner
      battleResult = Math.floor(
        playerPower +
          (Math.random() * playerPower) / 10 +
          1 -
          (enemyPower + (Math.random() * enemyPower) / 10 + 1)
      );

      if (battleResult > 1) {
        //Win
        //Code that gives player more power if they win
        //Code that updates player Tier if they have enough power
        await playerProfile.updateOne({ playerPower: playerPower + 1 });
        if (playerPower == 20 || playerPower == 30 || playerPower == 50) {
          await playerProfile.updateOne({ playerTier: playerTier + 1 });
        }
        await playerProfile.save().catch(console.error);

        setTimeout(function () {
          interaction.editReply({
            embeds: [enemyEmbed],
            content: `You won against ${query}!\nYou gain Power`,
            fetchReply: true,
          });
        }, 4000);
      } 
      else if (battleResult < 1) {
        //Loss
        setTimeout(function () {
          interaction.editReply({
            embeds: [enemyEmbed],
            content: `You lost against ${query}!`,
          });
        }, 4000);
      }
    }
  },
};
