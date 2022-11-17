require("dotenv").config();
const Player = require(require("path").resolve(
  __dirname,
  "../../schemas/player"
));
const imageSearch = require("../../search/imageSearch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
      await interaction.reply({
        content: `No character was found! Please register one with the "/register" command!`,
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
      const playerTier = playerProfile.playerTier
      const enemyTier = playerTier
      const enemyPower = playerPower;
      //Code that searches for enemy image
      let query = "";
      switch (enemyTier) {
        case 0:
          query =
            enemyImageKeywords[
              Math.floor(Math.random() * enemyImageKeywords.length)
            ] + " Slime";
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
        .setImage(searchResult.resultArray[Math.floor(Math.random() * 9)].link);

      //Code that replies with enemy Embed
      await interaction.reply({
        embeds: [enemyEmbed],
        content: "You are battling!!!",
        fetchReply: true,
      });

      //Code that calculates winner
      battleResult = Math.floor(Math.random() * 10);
      if (battleResult > 4) {
        //Win
        //Code that gives player more power if they win
        //Code that updates player Tier if they have enough power
        const oldPlayerTier = playerTier;
        await playerProfile.updateOne({ playerPower: playerPower + 1 });
        if (playerPower == 20 || playerPower == 30 || playerPower == 50) {
          await playerProfile.updateOne({ playerTier: playerTier + 1 });
        }
        await playerProfile.save().catch(console.error);

        let message = "";
        if (!playerTier == oldPlayerTier) {
            message = `You won against ${query}!\nYou gain Power\nYou have reached a new Tier!`
        }
        else
        {
            message = `You won against ${query}!\nYou gain Power`
        }
            
        setTimeout(function () {
          interaction.editReply({
            embeds: [enemyEmbed],
            content: message,
          });
        }, 4000);
      } 
      else if (battleResult < 5) {
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
