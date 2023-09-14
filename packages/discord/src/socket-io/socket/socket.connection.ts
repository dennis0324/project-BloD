// import { getChannel, getServer, getTitles } from "@/utility/discord"
import { ChannelType, ForumChannel } from "discord.js"
import { Socket } from '../types'
const connection:Socket = {
  type: 'connect',
  handler: async (socketManager,data) => {
    // socketManager
    console.log('discord connected')
    socketManager.socketReady()
    
    // 디스코드 완료와 서버간의 연결이 완료되면 보내야한다.
    socketManager.ready().then(() => {
      const channelsData:Record<string,string> = {}
      console.log('ready to send')

      const guildCache = socketManager.getClient().guilds.cache
      if(guildCache.size > 1) console.warn('discord server is more than 1');
      const guild = guildCache.first()
      const channels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum)
      channels.forEach((channel,channelTitle) => {
        const serverID = channelTitle
        const title = channel.name

        channelsData[title] = serverID
      })
      socketManager.getSocket().emit("discord:ready",{id:guild.id,routes:channelsData})
    })

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
