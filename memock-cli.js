const memock = require('memock');
const path = require('path');
const fs = require('fs');
const readline = require("readline");

const firstArgument = process.argv[2];
const mainPageJSONFileName = "memock-cli.json";
const version = "2.0.1";

let serverInfo = {
  serverName: "Memock-cli",
  serverVersion: version,
  port: 4321,
  serverDelay: 10000,
  fileDirectory: ".",
  filesToServe: [],
}
const questions = {
  q1: `Which port Do you want to use? (${serverInfo.port})`,
  q2: `How much delay do you want in your server? (${serverInfo.serverDelay})`,
}

if (firstArgument == "init") {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(questions.q1, function(port) {
    rl.question(questions.q2, function(delay) {
      if (port != "")  serverInfo.port = port;
      if (delay != "") serverInfo.serverDelay = delay;
      rl.close();
    });
  });

  rl.on("close", function() {
    let absoluteDownloadDirectory = path.join(process.cwd(), serverInfo.fileDirectory);
    fs.readdirSync(absoluteDownloadDirectory).forEach(file => {
      const fileEXT = path.extname(file);
      if (fileEXT != "") {
          serverInfo.filesToServe.push(file);
      } 
    })

    console.log("MeMock initialized with the following info:");
    console.log(serverInfo);
    fs.writeFileSync(path.join(process.cwd(), mainPageJSONFileName), JSON.stringify(serverInfo, null, 2));
    process.exit();
  });

} else if ( firstArgument == "start" ) {
  let absoluteDownloadDirectory = path.join(process.cwd(), serverInfo.fileDirectory);
  serverInfo = JSON.parse(fs.readFileSync(path.join(process.cwd(), mainPageJSONFileName)));
    
  memock.usePort( serverInfo.port );
  memock.setServerDelay( serverInfo.serverDelay );
  memock.setFilesDirectory( absoluteDownloadDirectory );

  serverInfo.filesToServe.forEach((file) => {
    memock.addFile(file);
  });

  memock.mainPageJSON(serverInfo);
  memock.init(); //on start
} else {
  console.log(`Invalid argument: ${firstArgument}`);
}

