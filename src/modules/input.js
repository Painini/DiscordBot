const prompt = require("prompt");
const ps = require("prompt-sync")
const promptSync = ps();
const chalk = require("chalk");

function givePromptAsync() {
    prompt.get(["pooka"], function (err, result) {

      return true;
    })
  }

function givePromptSync() {
  console.log("You are now in Pooka mode. Type .. to exit Pooka mode")
  const run = true
  while (run) { 
    let input = promptSync(chalk.magentaBright("Pooka: "));
    if (input == "..")
    {
      return false;
    }
    //Code for discord bot here
  }
}

module.exports = {givePromptSync, givePromptAsync}