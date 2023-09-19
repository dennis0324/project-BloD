import { getChannel, getServer, getThumbnails, getTitles } from "@/utility/discord"
import { ForumChannel } from "discord.js"
import { Socket } from '../types'

const title:Socket = {
  type: 'blog:nd:title',
  handler: async (responseSocket,socketManager,data:{serverID:string,guildID:string,postCount:number,page:number}) => {
    const guild = getServer(socketManager.getClient(),data.serverID)

    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,'1088461106701422735')
    let titleData = await getTitles(channel as ForumChannel,data.postCount,data.page)
    socketManager.getSocket().emit('blog:dn:title',titleData)
  }
}

const blog:Socket = {
  type: 'blog:getPost',
  handler: async (socketManager,data) => {
    // console.log(data.serverID)
  }
}

const thumbnail:Socket = {
  type: 'blog:nd:thumbnail',
  handler: async (responseSocket,socketManager,data:{serverID:string,messageID:string}) => {
    const guild = getServer(socketManager.getClient(),data.serverID)
    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,'1088461106701422735')
    const threads = await getThumbnails(channel as ForumChannel,data.messageID)
    responseSocket.emit('blog:dn:thumbnail',threads)
  }
}

export { title,blog,thumbnail }
