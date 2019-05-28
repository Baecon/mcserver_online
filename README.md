# server_online

server_online is a simple but useful discord bot meant to be paired with some sort of minecraft server to show if the server is online, the player count, etc.

## Installation

Simply install [nodejs](https://nodejs.org/en/download/) and use the provided bat files.

arent on windows? 
refer to the commands below.

1. Run this in terminal to install the packages needed.
```bash
npm i
```
2. Once that has completed run this command to start the bot.
```bash
node online
```
### settings.json setup
```json
{
    1. "token":"",
    2. "server":"localhost",
    3. "thumbnail":"", (optional)
    4. "authorizedUsers":["userid1", "userid2"] (optional)
}
```
1. Here you will set the bots token which can be found over at [discord developer panel](https://discordapp.com/developers/applications/). *fig.1a*
2. Here you will enter the minecraft servers ip.
3. If you would like a custom thumbnail to show instead of the mojang logo *fig.1b*, enter a url to the image you would like here. *fig.1c*
4. This is used for the `>>leave` command which will make the bot leave the guild. Only users on this list will be able to trigger the command. To get userids, refer to *fig.1d*

## Usage
To get the servers status simply just @ the bot.

![](https://i.gangweed.net/6xef2Y.gif)

`>>leave` is used to force the bot to leave the guild where the command is ran. This is only available to the users in the authorizedUsers list set in settings.json.

## Figures
1a where to get a bot token

![](https://i.gangweed.net/1mDOD5.gif)

1b mojang logo

![](https://i.gangweed.net/dErWD9)

1c custom example logo

![](https://i.gangweed.net/U6FOXq)

1d get user id

![](https://i.gangweed.net/BCIUSB.gif)

![](https://i.gangweed.net/v4zMHd.gif)
