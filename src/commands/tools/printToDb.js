const Message = require(require('path').resolve(__dirname, "../../schemas/message"));
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder.setName("savemessage")
    .setDescription("Save a message you write to a database")
    .addStringOption((option) => //Function may not exist
      option
        .setName("message")
        .setDescription("The message you want to save")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
    const message = interaction.options.getString("message")

    let messageProfile = await Message.findOne({ userId: member});
    if (!messageProfile) {
        messageProfile = await new Message({
            _id: mongoose.Types.ObjectId(),
            userId: member,
            message: message,
          });

          await messageProfile.save().catch(console.error);
          await interaction.reply({
            content: "Message saved",
          });
          console.log(messageProfile);
    }
    else {
        //Continue here by watching tutorial on updating mongoose object
    }
  },
};