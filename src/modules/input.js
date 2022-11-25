const prompt = require("prompt");
const chalk = require("chalk");

function givePromptAsync() {
    prompt.get([chalk.magentaBright("pooka")], function (err, result) {
      return result.pooka;
  })
}

module.exports = {givePromptAsync}

//Have an async function read a message from the terminal
//Save input from the terminal, send it to the bot 
//Have an interval every ten seconds or so that closes the async function
//AND runs a new async function that can take a new prompt input
//This way I can always consistantly know that the async function
//Will run on intervals. This solves the problem of it running 
//only once or a thousand times a second.