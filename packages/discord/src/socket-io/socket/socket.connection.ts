// import { getChannel, getServer, getTitles } from "@/utility/discord"
import { ChannelType, ForumChannel } from "discord.js"
import { Socket } from '../types'
const connection:Socket = {
  type: 'connect',
  handler: async (socketManager,data) => {
    // socketManager
    socketManager.socketReady()

  }
}

const disconnection:Socket = {
  type: 'disconnect',
  handler: async (socketManager,data) => {
    socketManager.socketDisconnect()
  }
}

export { connection }
