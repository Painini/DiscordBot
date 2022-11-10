const {Schema, model} = require('mongoose');
const textSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    userMessage: String,

});

module.exports = new model("Message", textSchema, "messages")