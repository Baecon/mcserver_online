//ignore this
const Discord = require("discord.js");
const client = new Discord.Client({
    disabledEvents: [
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_DELETE',
        'GUILD_ROLE_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'CHANNEL_CREATE',
        'CHANNEL_DELETE',
        'CHANNEL_UPDATE',
        'CHANNEL_PINS_UPDATE',
        'MESSAGE_DELETE',
        'MESSAGE_UPDATE',
        'MESSAGE_DELETE_BULK',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        'USER_UPDATE',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'PRESENCE_UPDATE',
        'VOICE_STATE_UPDATE',
        'TYPING_START',
        'VOICE_SERVER_UPDATE',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE'
      ]
});
const mc = require("minecraft-protocol")
const settings = require("./settings.json");
//bleh bleh declaring shit bleh bleh

//checks if token was specified
if(!settings.token) {
    console.log('No token set!')
    setTimeout(function(){
        process.exit(1)
    }, 5000)
}
else {
    //checks if server setting is set
    if(!settings.server) {
        console.log('No server was specified!')
        setTimeout(function(){
                process.exit(1)
        }, 5000)
    }
    else{
        //checks if user actually set a thumbnail, if not it defaults to mojang
        if(!settings.thumbnail) {
            settings.thumbnail = "https://i.gangweed.net/NlfIbV"
        }
        startDiscord(settings.token)
    }
}


//only reason why i made it a function is so stupid errors dont pop up when the top checks fail lol
function startDiscord(token){ 
    //ready?
    client.on('ready', () => console.log('server online yet?'));
    //checks if someone pings the bot
    client.on("message", message => {
        //makes bot ignore itself in case
        if(message.author == client.user) return
        if(message.isMentioned(client.user)) {
            message.channel.send('hmm let me check for you...').then(msg =>{
                //pings the server
                mc.ping({"host": settings.server}, (err, result) =>{
                    //if it fails (wrong ip, server is down etc etc)
                    if(err) {
    
                        return msg.edit('couldnt get server status...\nServer probs offline');
                    }
                    //if we actually dont fucking fail this runs
                    if(result) {
                        //trys to query the players online, if theres none it just defaults to "0 players" and a period since embed fields cannot be empty
                        try {
                            var players = []
                            for(i=0;result.players.sample.length > i; i++) {
                                players.push(result.players.sample[i].name)
                            }
                            var players2 = players.splice(0, Math.ceil(players.length / 2))
                            if (players == []) {
                                players.push(players2)
                                players2 = "."
                            }  
                        }
                        catch {
                            var players = '0 players'
                            var players2 = '.'
                        }
                        //creates the embed...
                        const embed = new Discord.RichEmbed()
                            .setColor(0xffe9f3)
                            .setFooter('https://baecon.dev')//change this if you want idc
                            .setThumbnail(settings.thumbnail)
                            .setTimestamp()
                            .addField("Status", 'server is online!', true)
                            .addField("MOTD", result.description.text, true)
                            .addField("Players", `${result.players.online} / ${result.players.max}`, true)
                            .addBlankField(true)
                            .addField("Players", players, true)
                            .addField('Online', players2, true)
                            .addField("Server info", `${result.version.name}\n ip: ${settings.server}`, true)
                            .addField("Latency", result.latency, true)
                        msg.edit({ embed })//edits first message to the embed
                    }
                })
            })
        }
        //this was meant for a diffrent server but watever lets make it a F E A T U R E
        if(settings.authorizedUsers.includes(message.author.id)){
            if(message.content == '>>leave') {
                message.reply('later! thanks for having me around.')
                message.guild.leave()
            }
        }
    });
    //logins to discord
    client.login(token).catch(err =>{
        if(err.toString().includes('Incorrect login details were provided') || err.toString().includes('An invalid token was provided')) {
            console.log('Incorrect login details!\n Please double check your token before relaunching the script')
            setTimeout(function(){
                process.exit(1)
            }, 5000)
        }
        else console.log(err)
    })
}
