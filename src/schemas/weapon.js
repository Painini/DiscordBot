const { Schema, model } = require('mongoose');

const weaponSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    playerId: String,
    weaponPower: String,
    weaponImg: String,
});

module.exports = new model ("Weapon", weaponSchema, "weapons");