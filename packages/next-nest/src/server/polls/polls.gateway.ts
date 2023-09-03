import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
// import 

@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway implements 
OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  @WebSocketServer() io : Namespace
  private readonly logger = new Logger(PollsGateway.name);
  private routeMap = new Map<string, string>();
  private GuildID:string
  // constructor(private readonly pollsService: PollsService) {}
  afterInit(server: any) {
      this.logger.log('Websocket Initialized!');
  }
  //pull: discord -> nestjs
  //push: nestjs -> discord
  handleConnection(client: Socket, ...args: any[]) {
    const socket = this.io.sockets

    //nextjs -> discord
    client.on('blog:nxns:title',(data:{routePath:string}) => {
      console.log('getting',data)
      const guildID = this.routeMap.get(data.routePath)
      console.log('got',guildID)
      this.io.emit('blog:nd:title',{serverID:this.GuildID,guildID:guildID})
    })

    //discord -> nextjs
    client.on('blog:dn:title',(data) => {
      console.log('pushing',data)
      this.io.emit('blog:nsnx:title',data)
    })

    //TODO: make EnsureSendFunction 
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