const memock = require('memock');
const path = require('path');
const fs = require('fs');
const readline = require("readline");

const firstArgument = process.argv[2];
const mainPageJSONFileName = "memock-cli.json";
const version = "2.0.1";

const serverInfo = {
  serverName: "Memock-cli",
  serverVersion: version,
  port: 4321,
  serverDelay: 10000,
  fileDirectory: ".",
  filesToServe: []
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
    /* 
    memock.usePort( serverInfo.port );
    memock.setServerDelay( serverInfo.serverDelay );
    memock.setFilesDirectory( absoluteDownloadDirectory );
    */ // on start

    fs.readdirSync(absoluteDownloadDirectory).forEach(file => {
      serverInfo.filesToServe.push(file);
    })

    /*
    serverInfo.filesToServe.forEach(file => {
      memock.addFile(file);
    });
    */ // on start

    // memock.mainPageJSON(serverInfo); // on start
    console.log("MeMock initialized with the following info:");
    console.log(serverInfo);
    fs.writeFileSync(path.join(process.cwd(), mainPageJSONFileName), JSON.stringify(serverInfo, null, 2));
    process.exit();

    //memock.init(); //on start
  });

}

