import { BloDClient } from '@/utility/blod-client';
// import * from './socket'
import { Manager,Socket } from 'socket.io-client';
import { Sockets } from './types';

export class BLoDDiscordSocket{
  private socket:Socket
  private discordLoadReady:boolean = false
  private connectionReady:boolean = false

  resolve: (data?:unknown) => void
  constructor(private client: BloDClient){
    const manager = new Manager("http://localhost:3000", {
      reconnectionDelayMax: 10000,
    });


    if(!this.socket)
      this.socket = manager.socket("/polls");
    else
      console.log('socket already exist')

    this.registerSocketEvent()
    // console.log(sockets)
  }

  private registerSocketEvent(){
    const sockets:Sockets = require('./socket')
    Object.keys(sockets).forEach(key => {
      const socket = sockets[key]
      this.socket.on(socket.type,async (data) => socket.handler(this,data))
    })
  }

  public getSocket(){
    return this.socket
  }

  public getClient(){
    return this.client
  }

  // 디스코드 서버가 준비되어야만 
  public insureEmit(event:string,data:any){
    this.socket.emit(event,data)
  } 

  public ready(){
    return new Promise(resolve => {
      this.resolve = resolve
    })
  }

  public socketReady(){
    this.connectionReady = true
    if(this.connectionReady && this.discordLoadReady)
      this.resolve()
  }

  public socketDisconnect(){
    this.connectionReady = false
  }

  public discordReady(){
    this.discordLoadReady = true
    if(this.connectionReady && this.discordLoadReady)
      this.resolve()
  }

  

}