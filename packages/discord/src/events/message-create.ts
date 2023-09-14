import { BLoDDiscordSocket } from "@/socket-io"
import { Message } from "discord.js"
import { generateLatex } from "testing/latex"

export const onMessageCreate = async (socketManager:BLoDDiscordSocket,message:Message<boolean>) => {
  if(message.content.startsWith('$$') && message.content.endsWith('$$')){
    const buffer = Buffer.from(await generateLatex(message.content))
    message.reply({files:[{attachment:buffer,name:'test.png'}]})

  }
}