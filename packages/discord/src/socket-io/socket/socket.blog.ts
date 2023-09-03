import { getChannel, getServer, getTitles } from "@/utility/discord"
import { ForumChannel } from "discord.js"
import { Socket } from '../types'
const title:Socket = {
  type: 'blog:nd:title',
  handler: async (socketManager,data:{serverID:string}) => {
    // console.log('discord getting title',data.serverID)
    const guild = getServer(socketManager.getClient(),data.serverID)

    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,'1088461106701422735')
    const threads = await getTitles(channel as ForumChannel)
    const threadsName = threads.threads.map(thread => thread.name)
    socketManager.getSocket().emit('blog:dn:title',threadsName)
  }
}

const blog:Socket = {
  type: 'blog:getPost',
  handler: async (socketManager,data) => {
    console.log(data.serverID)
    // socketManager.getSocket().emit('blog:getPost',socketManager.getClient().guilds.cache.get(data.serverID).id)
  }
}

export { title,blog }
