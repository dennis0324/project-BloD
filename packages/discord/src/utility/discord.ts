import { AnyThreadChannel, ForumChannel, Guild, MessageType } from "discord.js";
import { BloDClient } from "./blod-client";

export function getServer(client:BloDClient,serverID:string){
  return client.guilds.cache.get(serverID)
}

export function getChannel(guild:Guild,channelID:string){
  return guild.channels.cache.get(channelID)
}

export async function getTitles(channel : ForumChannel,postCount:number,page:number){
  await channel.threads.fetch({archived:{limit:100}})
  let threads = channel.threads.cache
  const threadFetch2 = await Promise.all(threads.map(async (thread,_) => {
    const message = await thread.messages.fetch({limit:1})
    return {
      name:thread.name,
      id:thread.id,
      tags:thread.appliedTags,
      createAt:thread.createdAt,
      updateAt: message.first().editedAt ?? message.first().createdAt,
      archived:thread.archived,
      preface:message.first().content,
    }
  }))
  return {data:threadFetch2,length:threads.size}
}

//TODO: 사진 따오는거 크롤링해서 맨 첫번에 있는 사진 가지고 오면 될 것같습니다.
export async function getThumbnails(channel : ForumChannel,channelID:string){
  const thumbnailInfo = {
    url:'',
    type:Infinity,
    id:channelID
  }
  const thread = await channel.threads.fetch(channelID)
  const messages = await thread.messages.fetch({limit:100})
  messages.forEach(message => {
    if(message.embeds.length > 0){
      if(thumbnailInfo.type > 1){
        thumbnailInfo.url = message.embeds[0]?.thumbnail?.url
        thumbnailInfo.type = 1 // make a priority for thumbnail image
      }

    }
    if(message.attachments.size > 0){
      if(thumbnailInfo.type > 0){
        const image = message.attachments.find(attachment => attachment.contentType === 'image/png')
        thumbnailInfo.url = image.url
        thumbnailInfo.type = 0 // make a priority for attachment image
      }
    }
  })
  console.log(thumbnailInfo)
  return thumbnailInfo

}
type Paragraph = {
  createAt: Date,
  content:string,
  mentions:string[],
  comments?:boolean
  attachments?:string[]
  embeds?:string[]
}

export async function getBlogPostContent(messageChannel:AnyThreadChannel){
  const comments:Map<string,Paragraph> = new Map()
  const blogpost:Map<string,Paragraph> = new Map()
  // const comments:Paragraph[] = []
  // const blogpost:Paragraph[] = []
  //createAt
  //content
  //attachments?
  //
  
  
  const messages = await messageChannel.messages.fetch({limit:100})
  // const messages = messageChannel.messages.cache.filter(messsage => !messsage.author.bot)
  const reverseMessages = messages.reverse()
  for(const [_,message] of reverseMessages){
    let link = ''
    if(message.type === MessageType.Reply) {
      const refer = await message.fetchReference()
      link = refer.id
    }
    const payload = {
      createAt: message.editedAt ?? message.createdAt,
      content:message.content,
      mentions: message.mentions.users.map(user => user.username) ?? [],
      comments: message.author.bot,
      link: link
    }
    message.author.bot ? comments.set(message.id,payload) : blogpost.set(message.id,payload)
  }
  const com = JSON.stringify(Array.from(comments))
  const blog = JSON.stringify(Array.from(blogpost))
  return {comments:com,blogpost:blog}
}