import { ForumChannel, Guild } from "discord.js";
import { BloDClient } from "./blod-client";

export async function getTitles(channel : ForumChannel){
  //TODO: after 와 before 넣기
  return await channel.threads.fetch({archived:{limit:100}})
}

export function getServer(client:BloDClient,serverID:string){
  return client.guilds.cache.get(serverID)
}

export function getChannel(guild:Guild,channelID:string){
  return guild.channels.cache.get(channelID)
}

//TODO: 사진 따오는거 크롤링해서 맨 첫번에 있는 사진 가지고 오면 될 것같습니다.
export function previewImage(){
  
}