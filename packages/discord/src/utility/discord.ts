import { ForumChannel, Guild } from "discord.js";
import { BloDClient } from "./blod-client";

export async function getTitles(channel : ForumChannel,postCount:number,page:number){
  await channel.threads.fetch({archived:{limit:100}})
  postCount = Number(postCount)
  page = Number(page)
  const start = postCount * page
  let threads = Array.from(channel.threads.cache)
  if(page === -1){
    return {length:Math.ceil(threads.length / postCount)}
  }
  threads = threads.slice(start,start + (+postCount))
  
  const threadFetch2 = Promise.all(threads.map(async ([s,thread],i) => {
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
  return {data:threadFetch2,length:threads.length}
}

export function getServer(client:BloDClient,serverID:string){
  return client.guilds.cache.get(serverID)
}

export function getChannel(guild:Guild,channelID:string){
  return guild.channels.cache.get(channelID)
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

  return thumbnailInfo

}