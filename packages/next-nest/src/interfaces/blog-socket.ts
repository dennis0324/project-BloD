interface BaseSendingEmit{
  routePath:string
}

interface ThumbnailSendingEmit extends BaseSendingEmit{
  messageID:string
}

interface ThumbnailSendingDiscordEmit{
  messageID:string
  guildID:string
  serverID:string
}

interface BlogPostsSendingEmit extends BaseSendingEmit{
  postCount:number
  page:number
}