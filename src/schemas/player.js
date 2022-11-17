const {Schema, model} = require('mongoose');

const playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    playerId: String,
    playerName: String,
    playerPower: Number,
    playerTier: Number,
    playerClass: String,
    playerImg: String,
});

module.exports = new model("Player", playerSchema, "players");