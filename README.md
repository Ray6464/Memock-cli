# Memock-cli
A CLI tool for developing mock servers to aid in development tools like APIs without access to seperate severs. It will allow you to develop and initiate a server that serves predetermined files and JSON objects over predetermined nodes, all in one CLI command.

# Installition
To install globally use:
```
npm i memocl-cli -g
```

# Usage
Initialize MeMock-cli with:
```
memock-cli init
```
Answer some questions line `portNumber` or `delay` in downloads and server speed.
You will get a json file with your system configuration.

Start the server with:
```
memock-cli start
```

