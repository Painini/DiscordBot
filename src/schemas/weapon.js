const { schema, model } = require('mongoose');

const weaponSchema = new Schema ({
    playerId: String,
    weaponPower: String,
    weaponImg: String,
})

module.exports = new model ("Weapon", weaponSchema, "weapons");