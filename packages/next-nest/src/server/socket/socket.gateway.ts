import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  WebSocketGateway, 
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
// import 

@WebSocketGateway({namespace:'blog'})
export class SocketGateway implements 
OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  constructor(private configService: ConfigService) {
    // const t = configService.get('BLOD_MESSAGE_SECRET')
    // console.log(t)
  }
  // web socket with discord and nextjs
  @WebSocketServer() io : Namespace
  private readonly logger = new Logger(SocketGateway.name);
  private routeMap = new Map<string, string>();
  private GuildID:string
  // constructor(private readonly pollsService: PollsService) {}
  afterInit(server: any) {
      this.logger.log('Websocket Initialized!',this.io.sockets.size);
  }


  //Todo: make proper emit function in nestjs format
  handleConnection(client: Socket, ...args: any[]) {
    const socket = this.io.sockets

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