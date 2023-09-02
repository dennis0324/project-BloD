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
  // constructor(private readonly pollsService: PollsService) {}
  afterInit(server: any) {
      this.logger.log('Websocket Initialized!');
  }
  //pull: discord -> nestjs
  //push: nestjs -> discord
  handleConnection(client: Socket, ...args: any[]) {
    const socket = this.io.sockets

    //nextjs -> discord
    client.on('blog:nxns:title',(data) => {
      console.log('getting',data)
      this.io.emit('blog:nd:title',data)
    })

    //discord -> nextjs
    client.on('blog:dn:title',(data) => {
      console.log('pushing',data)
      this.io.emit('blog:nsnx:title',data)
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