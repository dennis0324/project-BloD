import { getBlogPostContent, getChannel, getServer, getThumbnails, getTitles } from "@/utility/discord"
import { ForumChannel } from "discord.js"
import { Socket } from '../types'

const title:Socket = {
  type: 'blog:titles',
  handler: async (
    socketManager,
    data:{serverID:string,guildID:string,postCount:number,page:number}
  ) => {
    console.log(data)
    const guild = getServer(socketManager.getClient(),data.serverID)

    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,data.guildID)
    let titleData = await getTitles(channel as ForumChannel,data.postCount,data.page);
    return titleData
  }
}

const blogPostContent:Socket = {
  type: 'blog:postContent',
  handler: async (socketManager,data) => {
    const guild = getServer(socketManager.getClient(),data.serverID)
    const channel = getChannel(guild,data.guildID)
    const messages = await (channel as ForumChannel).threads.fetch(data.messageID)
    const thread = await getBlogPostContent(messages)
    console.log(socketManager.getSocket())
    return thread
  }
}

const thumbnail:Socket = {
  type: 'blog:thumbnail',
  handler: async (socketManager,data:{serverID:string,guildID:string,messageID:string}) => {
    const guild = getServer(socketManager.getClient(),data.serverID)
    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,data.guildID)
    const threads = await getThumbnails(channel as ForumChannel,data.messageID)

    return threads
  }
}

export { title,blogPostContent,thumbnail }
