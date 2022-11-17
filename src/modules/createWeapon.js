require("dotenv").config();
const Weapon = require("../schemas/weapon");

const imageSearch = require("../modules/imageSearch")
const mongoose = require("mongoose");



  async function createWeapon(playerClass, userId, power) {
    let query = "";
    if (playerClass == "Warrior") {
      query = "single big fantasy war axe art";

    }
    else if (playerClass == "Mage") {
      query = "Magical Tome"
    }
    const searchResult = await imageSearch.ImageSearch(query);
    const image = searchResult.resultArray[Math.floor(Math.random() * 9)].link
  
    weaponProfile = await new Weapon({
      _id: mongoose.Types.ObjectId(),
      playerId: userId,
      weaponPower: power,
      weaponImg: image,
    });
  
  await weaponProfile.save().catch(console.error);
  return weaponProfile;
  }


  module.exports = {
    createWeapon,
  }
