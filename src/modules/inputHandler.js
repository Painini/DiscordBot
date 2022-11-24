const {givePromptSync, givePromptAsync} = require(require("path").resolve(
    __dirname,
    "./input"
  ));

 function ContTakeInput() {
    let useSyncMethod = false;
        if (!useSyncMethod)
            useSyncMethod = givePromptAsync();
        if (useSyncMethod)
            useSyncMethod = givePromptSync();
    }

module.exports = {ContTakeInput}
  