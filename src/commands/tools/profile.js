const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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

        await interaction.reply({
            embeds: [playerEmbed],
        })    
    }
} 