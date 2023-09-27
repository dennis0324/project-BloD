// import { getChannel, getServer, getTitles } from "@/utility/discord"
import { ChannelType, ForumChannel, GuildBasedChannel, TextChannel } from "discord.js"
import { Socket } from '../types'

/**
 * this is for discord connection handler for socket.io
 */
const connection:Socket = {
  type: 'connect',
  handler: async (socketManager,data) => {
    // 디스코드 완료와 서버간의 연결이 완료되면 보내야한다.
    socketManager.ready().then(async () => {
      const channelsData:Record<string,string> = {}
      console.log('ready to send')

      const guildCache = socketManager.getClient().guilds.cache
      
      // NOTE
      // guild(server) needs to be one
      // when server got more than one, it will get first one
      // when you are going to make multi pages, you need to make more thread channel(ForumChannel) not server
      if(guildCache.size > 1) console.warn('discord server is more than 1');
      // getting first server
      const guild = guildCache.first()
      const channels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum)

      
      for(const [channelTitle,channel] of channels){
        const serverID = channelTitle
        const title = channel.name
        channelsData[title] = serverID;

        const webhooks = await (channel as TextChannel).fetchWebhooks()
        const webhook = webhooks.find(wh => wh.token);
        if(webhook) continue
        (channel as TextChannel).createWebhook({
          name:'BLoD',
          avatar:'https://i.imgur.com/AfFp7pu.png'
        })
      }
      socketManager.getSocket().emit("discord:ready",{id:guild.id,routes:channelsData})
    })
    // socketManager
    console.log('discord connected')
    socketManager.socketReady()
  }
}

const disconnection:Socket = {
  type: 'disconnect',
  handler: async (socketManager,data) => {
    console.log('discord disconnected')
    socketManager.socketDisconnect()
  }
}

export { connection,disconnection }
