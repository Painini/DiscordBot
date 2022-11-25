const { givePromptAsync } = require(require("path").resolve(
  __dirname,
  "./input"
));

async function ContTakeInput() {
    while (true) {
        await givePromptAsync(); // Code runs once before exiting for loop
    }
}

module.exports = { ContTakeInput };
