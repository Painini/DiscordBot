const prompt = require("prompt");
const chalk = require("chalk");

const givePrompt = () =>{
  let promptGiven = false;
  prompt.start();
  promptGiven = true;
  prompt.get(["input"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log(`Command-line input received: ${result.input}`);
  });
  function onErr(err) {
    console.log(err);
  }
}

exports.givePrompt = givePrompt();
