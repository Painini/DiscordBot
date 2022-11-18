require("dotenv").config();
const Player = require(require("path").resolve(
  __dirname,
  "../../schemas/player"
));
const imageSearch = require("../../modules/imageSearch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register a new character for yourself!")
    .addIntegerOption((option) => option
        .setName("class")
        .setDescription("Pick warrior(1) or mage(2)")
        .setRequired(true)
    ),

    async execute(interaction, client) {
        
        const classIndex = interaction.options.getInteger("class");
        
        let playerClass = "";
        if (classIndex == 1)
        {
            playerClass = "Warrior"
        }
        else if (classIndex == 2)
        {
            playerClass = "Mage"
        }
        else {
            await interaction.reply({
                content: "Invalid Class Number!"
            })
            return;
        }
        const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
        let playerProfile = await Player.findOne({ playerId: member });
        if (!playerProfile) {
            const currentPlayerName = interaction.user.username;
            const query = `Fantasy ${playerClass}`
            //const searchResult = await imageSearch.ImageSearch(query);
            const searchResult = await imageSearch.ImageSearch(query);
            const customSearchEngineUrl = query.replaceAll(" ", "%20");
            const image = searchResult.resultArray[Math.floor(Math.random() * 9)].link
            const playerEmbed = new EmbedBuilder()
            .setTitle(`Your new character!`)
            .setURL(
              `https://cse.google.com/cse?cx=${process.env.cx}#gsc.q=${customSearchEngineUrl}`
            )
            .setDescription(`Tier: ${0}`)
            .addFields([
              {
                name: `Name: ${currentPlayerName}`,
                value: "Awesome!",
                inline: true,
              },
            ])
            .setImage(image);
            playerProfile = await new Player({
                _id: mongoose.Types.ObjectId(),
                playerId: member,
                playerName: currentPlayerName,
                playerPower: 10,
                playerTier: 0,
                playerClass: playerClass,
                playerImg: image,
            });
            await playerProfile.save().catch(console.error);
            await interaction.reply({
                embeds: [playerEmbed],
                content: `Your player character ${currentPlayerName} has been created! Happy battling!`
            })
        }
        else {
            await interaction.reply({
                content: `Character already exists!`,
            });
        }
    }
}        