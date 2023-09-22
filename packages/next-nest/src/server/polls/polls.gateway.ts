import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
// import 

@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway implements 
OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  constructor(private configService: ConfigService) {
    // const t = configService.get('BLOD_MESSAGE_SECRET')
    // console.log(t)
  }
  // web socket with discord and nextjs
  @WebSocketServer() io : Namespace
  private readonly logger = new Logger(PollsGateway.name);
  private routeMap = new Map<string, string>();
  private GuildID:string
  // constructor(private readonly pollsService: PollsService) {}
  afterInit(server: any) {
      this.logger.log('Websocket Initialized!');
  }


  //Todo: make proper emit function in nestjs format
  handleConnection(client: Socket, ...args: any[]) {
    const socket = this.io.sockets

    // title data info
    client.on('blog:nxns:title',(data:BlogPostsSendingEmit) => {
      const guildID = this.routeMap.get(data.routePath)
      const query = {
        serverID:this.GuildID,
        guildID:guildID,
        postCount:data.postCount,
        page:data.page
      }
      this.io.emit('blog:nd:title',query)
    })

    client.on('blog:dn:title',(data) => {
      this.io.emit('blog:nsnx:title',data)
    })

    // thumbnail
    const responseSocket = client.on('blog:nxns:thumbnail',(data:ThumbnailSendingEmit) => {
      const guildID = this.routeMap.get(data.routePath)
      this.io.emit('blog:nd:thumbnail',{serverID:this.GuildID,guildID:guildID,messageID:data.messageID})
    })

    responseSocket.on('blog:dn:thumbnail',(data) => {
      this.io.emit('blog:nsnx:thumbnail',data)
    })

    client.on('discord:ready',(data:{
      id:string,
      routes:{
        [key:string]:string
      }
    }) => {
      this.routeMap.clear()
      this.GuildID = data['id']
      Object.entries(data['routes']).forEach(([key,value]) => {
        this.routeMap.set(key,value)
      })
      console.log(this.routeMap,this.GuildID)
    })


    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`total clients: ${socket.size}`);
  }

  handleDisconnect(client: Socket) {
    const socket = this.io.sockets
    this.logger.log(`Client disconnected: ${client.id}`);
    this.logger.log(`total clients: ${socket.size}`);
  }
}