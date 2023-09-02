import { BloDClient } from '@/utility/blod-client';
// import * from './socket'
import { Manager,Socket } from 'socket.io-client';
import { Sockets } from './types';

export class BLoDDiscordSocket{
  private socket:Socket
  constructor(private client: BloDClient){
    const manager = new Manager("http://localhost:3000", {
      reconnectionDelayMax: 10000,
    });
  
    this.socket = manager.socket("/polls");

    this.registerSocketEvent()
    // console.log(sockets)
  }

  private registerSocketEvent(){
    const sockets:Sockets = require('./socket')
    Object.keys(sockets).forEach(key => {
      const socket = sockets[key]
      this.socket.on(socket.type,async (data) => socket.handler(this.client,this.socket,data))
    })
  }

  public getSocket(){
    return this.socket
  }


}