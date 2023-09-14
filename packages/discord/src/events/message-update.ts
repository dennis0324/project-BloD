import { BLoDDiscordSocket } from "@/socket-io";
import { BloDClient } from "@/utility/blod-client";
import { Message, PartialMessage } from "discord.js";
import { generateLatex } from 'src/utility/latex';

// import { CommandList } from "../../temp";

export const onMessageUpdate = async (socketManager:BLoDDiscordSocket,newMessage:Message<boolean> | PartialMessage) => {
  console.log('thread update')
  if(newMessage.author.bot) return
  if(newMessage.content.startsWith('$$') && newMessage.content.endsWith('$$')){
    const memo =  newMessage.content.replace('$$','')
    const mess = await newMessage.channel.messages.fetch({limit:2,around:newMessage.id})
    const buffer = Buffer.from(await generateLatex(newMessage.content))
    if(mess.first().author.id !== newMessage.author.id)
      mess.first().edit({files:[{attachment:buffer,name:'test.png'}]})
    else
      newMessage.reply({files:[{attachment:buffer,name:'test.png'}]})

  }
};