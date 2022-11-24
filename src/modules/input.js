const prompt = require("prompt");
const chalk = require("chalk");
async function givePrompt() {
  prompt.on();
  prompt.get(["input"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    return result.input;
  });
  function onErr(err) {
    console.log(err);
  }
}

module.exports = {givePrompt}