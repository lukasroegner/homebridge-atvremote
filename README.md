# homebridge-atvremote
HTTP API running on homebridge to control Apple TV.

## Who is it for?

The use case for this plugin is controlling Apple TVs via HomeKit shortcuts to enable complex automation scenarios. HomeKit shortcuts are supported starting with iOS 13. Use the "download content from URL" action with GET or POST to control Apple TVs.

## Installation

Install the Python package https://github.com/postlund/pyatv on the device you are running homebridge on. The tool comes with a command line tool called `atvremote` that is used by this plugin to control Apple TVs. Make sure that atvremote runs correctly on your system by using the command `atvremote scan` to scan for devices.

Then, install the plugin via npm:

```bash
npm install https://github.com/lukasroegner/homebridge-atvremote.git -g
```

Afterwards, use the `atvremote scan` and `atvremote pair` commands to get information and credentials for all Apple TVs that you want to control.

## Configuration

```json
{
    "platforms": [
        {
            "platform": "AtvRemotePlatform",
            "apiPort": 40222,
            "apiToken": "<YOUR-TOKEN>",
            "atvremoteCommand": "<COMMAND-FOR-ATVREMOTE>",
            "appleTvs": [
                {
                    "name": "<UNIQUE-NAME>",
                    "ipAddress": "<IP-ADDRESS>",
                    "mrpPort": <PORT-NUMBER>,
                    "mrpCredentials": "<MRP-CREDENTIALS>"
                }
            ]
        }
    ]
}
```

**apiPort** (optional): The port that the API runs on. Defaults to `40222`, please change this setting of the port is already in use.

**apiToken**: The token that has to be included in each request of the API. Is required and has no default value.

**atvremoteCommand**: The fully qualified command to invoke the `atvremote` tool. Depending on the type of installation (e.g. `pip3`), it could be `python3 ~/.local/lib/python3.5/site-packages/pyatv`.

**appleTvs**: A list of all devices you want to use the API with.

**name**: A name you can choose for the access via API.

**ipAddress**: The IP address of the Apple TV (can be found with `atvremote scan` command).

**mrpPort**: The port number for the MRP protocol of the Apple TV (can be found with `atvremote scan` command).

**mrpCredentials**: The credentials that you get after successful pairing via `atvremote pair`.

## API

The API can be reached at the specified port on the host of this plugin. 
```
http://<YOUR-HOST-IP-ADDRESS>:<apiPort>
```

The token has to be specified as value of the `Authorization` header on each request:
```
Authorization: <YOUR-TOKEN>
```

### API - Send Commands

Use the `/<APPLE-TV-NAME>` endpoint to send commands to an Apple TV. The HTTP method has to be `POST`:
```
http://<YOUR-HOST-IP-ADDRESS>:<apiPort>/<APPLE-TV-NAME>
```

The body of the request has to be JSON in the following format:

```
{
    "commands": [
        "COMMAND1",
        "COMMAND2",
        "COMMAND3"
    ]
}
```

Each command string can be any of the commands that the `atvremote` tool supports. Commands are executed sequentially. Use `wait X` as command with `X` in milliseconds to wait before sending the next command.
