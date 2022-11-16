require('dotenv').config();
const Player = require(require('path').resolve(__dirname, "../../schemas/player"));
const imageSearch = require('../../search/imageSearch');
const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
const mongoose = require("mongoose");

module.exports = { 
    data: new SlashCommandBuilder()
    .setName("battle")
    .setDescription("Battle an enemy!"),

    async execute(interaction, client) {
        let playerProfile = await Player.findOne({playerId: interaction.guild.members.fetch(interaction.user.id).catch(console.error)});
        if (!playerProfile) {
            playerProfile = await new Player({
                _id: mongoose.Types.ObjectId(),
                playerId: interaction.guild.id,
                playerName: interaction.guild.name,
                playerPower: "10",
                playerTier: "0",
            });

            await playerProfile.save().catch(console.error);

            await interaction.reply({
                content: `No character was found, a new one has been created for you!\nHappy battling!`,
              });
        }
        else
        {
            //Code that builds enemy 
            const enemyImageKeywords = ["scary", "giant", "awful", "frightening", "strong", "weak", "little"]
            const enemyTier = playerTier;
            const enemyPower = Math.floor(Math.random() * (playerPower/0.95) + playerPower/1.1)
            
            //Code that searches for enemy image
            const query = "";
            switch (enemyTier) {
                case "0":
                    query = enemyImageKeywords[Math.random(enemyImageKeywords.length())] + "Rat";
                    break;

                case "1":
                    query = enemyImageKeywords[Math.random(enemyImageKeywords.length())] + "Skeleton";
                    break;

                case "2":
                    query = enemyImageKeywords[Math.random(enemyImageKeywords.length())] + "Demon";
                    break;

                default:
                    break;    

            }

            const searchResult = await imageSearch.ImageSearch(query);
            const url = searchResult.CurrentSearch().link;
            const customSearchEngineUrl = query.replaceAll(' ', '%20');

            //Embed that shows enemy image
            const enemyEmbed = new EmbedBuilder()
            .setTitle(`Your enemy is a ${query}!  `)
            .setURL(`https://cse.google.com/cse?cx=${process.env.cx}#gsc.q=${customSearchEngineUrl}`)
            .setDescription(`Tier: ${enemyTier}`)
            .addFields([
                {
                    name:  `Power: ${enemyPower}`,
                    inline: true,
                }
            ])          
            .setImage(url);

            //Code that replies with enemy Embed
            await interaction.reply({
                embeds: [enemyEmbed], 
                content: "You are battling!!!",
                fetchReply: true 
            });

            //Code that calculates winner
            battleResult = Math.floor(((playerPower + Math.random() * playerPower/10) + 1) - ((enemyPower + Math.random() * enemyPower/10) + 1))
            if (battleResult > 1) {
                //Win
            }
            else if (battleResult < 1) {
                //Loss
            }

            setTimeout(function() {
                
                ,
                3000    
            });

            //Code that gives player more power if they win

            

        }
    }
}