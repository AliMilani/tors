# tors

> tor for Node.js

## Install

```sh
npm install tors
```

## Usage

### Run without any options

In this case, you can only have one active tor process

```js
const TorProxy = require("tors");

let tor = new TorProxy(9051);

(async () => {
    await tor.startTorProcess();
    //=> tor is now running (127.0.0.1:9051)

    await tor.newTorSession();
    //=> new tor ip address

    await tor.killTorProcess();
    //=> tor is now stopped
})();
```

### Run multiple tor processes at the same time

In this case, the options (`controlPort`, `dataPath`, `port`) must be unique

```js
let theProxy = new TorProxy({
    port: "1234",
    controlPort: "8124",
    dataPath: "data3",
});
await theProxy.startTorProcess();
```

## API

### TorProxy(port)

### TorProxy(options)

If a string is provided, it is treated as a shortcut for [`options.port`](#port).

#### options

Type: `object`

##### port

Type: `string`\
Default: `9050`

port to use for tor process

##### path

Type: `string`\
Default: `./.local-tor/Tor`

Address of the folder of the tor executable file

##### controlPort

Type: `string`\
Default: `9151`

Used for new session and IP change

#### controlPassword

Type: `string`\
Default: `giraffe`

Used for new session and IP change

#### ip

Type: `string`\
Default: `127.0.0.1`

Tor ip address

#### dataPath

Type: `string`\
Default: `./.local-tor/data/default`

Tor sessions data folder

#### torrcPath

Type: `string`\
Default: `./.local-tor/Tor/torrc`

Tor configuration folder

### Instance

#### .startTorProcess()

Starts tor process.

#### .killTorProcess()

Stops tor process.

#### .newTorSession()

It changes the tor IP address

