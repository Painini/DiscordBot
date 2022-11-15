const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("grow").setDescription("Grow a flower!"),

    async execute(interaction, client) {
        //Continuously print text to give illusion of flower growing
        await interaction.reply({
            content: "|/"
        });

        setTimeout(
            function()
            {interaction.editReply({
                content: "@\n |\n |/"
            })},
            2000
        );
        setTimeout(
            function()
            {interaction.editReply({
                content: "@\n |/'\n |\n |/'"
            })},
            4000
        );
        setTimeout(
            function()
            {interaction.editReply({
                content: "(@)\n  |/'\n  |\n  |/'"
            })},
            6000
        );
        setTimeout(
            function()
            {interaction.editReply({
                content: "ㅤ.-.\n ((@))\nㅤ'-'\nㅤ |/'\nㅤ |\nㅤ |/'"
            })},
            8000
        ); 
    }
} /* INVISIBLE CHARACTER, USE WISELY:ㅤ*/