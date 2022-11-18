require('dotenv').config();
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const imageSearch = require('../../modules/imageSearch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('Search for an image')
    .addStringOption((option) =>
        option.setName('input')
              .setDescription('The search term/query')
              .setRequired(true)),
    
    async execute(interaction, client) {
        const query = interaction.options.getString('input');
        const searchResult = await imageSearch.ImageSearch(query);
        const url = searchResult.CurrentSearch().link;
        const customSearchEngineUrl = query.replaceAll(' ', '%20');
        const resultEmbed = new EmbedBuilder()
        .setTitle(`Image`)
        .setURL(`https://cse.google.com/cse?cx=${process.env.cx}#gsc.q=${customSearchEngineUrl}`)
        .setDescription(`Showing result for ${query}`)
        .addFields([
            {
                name:  searchResult.CurrentSearch().title,
                value: searchResult.CurrentSearch().displayLink,
                inline: true,
            }
        ])
        .setImage(url);
        await interaction.reply({
            embeds: [resultEmbed], 
            fetchReply: true 
        });
    },
};
