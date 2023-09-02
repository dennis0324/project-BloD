import { getChannel, getServer, getTitles } from "@/utility/discord"
import { ForumChannel } from "discord.js"
import { Socket } from '../types'
const title:Socket = {
  type: 'blog:nd:title',
  handler: async (client,socket,data) => {
    console.log('discord getting title',data.serverID)
    const guild = getServer(client,data.serverID)

    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,'1088461106701422735')
    const threads = await getTitles(channel as ForumChannel)
    const threadsName = threads.threads.map(thread => thread.name)
    socket.emit('blog:dn:title',threadsName)
  }
}

const blog:Socket = {
  type: 'blog:getPost',
  handler: async (client,socket,data) => {
    console.log(data.serverID)
    socket.emit('blog:getPost',client.guilds.cache.get(data.serverID).id)
  }
}

export { title,blog }
