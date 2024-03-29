const fs = require("fs");
const { connection } = require("mongoose");

//Reads .js files in "client" folder and executes them either once or continuously.
//Sends with it client and any args inputted
module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client": 
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
            else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
            console.log(`Event: ${event.name} is executing.`)
          }
          break; 

//Reads .js files in "mongo" folder and executes them either once or continuously.        
        case "mongo":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;
          
        default:
          break;
      }
    }
  };
};
