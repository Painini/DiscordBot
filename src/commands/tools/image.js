require('dotenv').config();
const {SlashCommandBuilder, EmbedBuilder, MessageActionRow, MessageButton} = require('discord.js');
const imageSearch = require('../../search/imageSearch');

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
        .setTitle(`Images`)
        .setURL(`https://cse.google.com/cse?cx=${process.env.cx}#gsc.q=${customSearchEngineUrl}`)
        .setDescription(`Result ${searchResult.currentResult + 1} of ${searchResult.resultArray.length}`)
        .addFields([
            {
                name:  searchResult.CurrentSearch().title,
                value: searchResult.CurrentSearch().displayLink,
                inline: true,
            }
        ])          
        .setImage(url);

       // const row = new MessageActionRow()
       // .addComponents(
       //     new MessageButton()
       //         .setCustomId('prev')
       //         .setLabel('Previous')
       //         .setStyle('PRIMARY'),
       //     new MessageButton()
       //         .setCustomId('next')
       //         .setLabel('Next')
       //         .setStyle('PRIMARY'),
       //     new MessageButton()
       //         .setLabel('View Original')
       //         .setStyle('LINK')
       //         .setURL(searchResult.CurrentSearch().image.contextLink),
       //     
       // );

        await interaction.reply({
            embeds: [resultEmbed], 
            //components: [row], 
            fetchReply: true 
        });
    },
};
