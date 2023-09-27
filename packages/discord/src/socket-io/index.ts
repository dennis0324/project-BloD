import { BloDClient } from '@/utility/blod-client';
// import * from './socket'
import { Manager,Socket, io } from 'socket.io-client';
import { Sockets } from './types';
import { WebhookClient } from 'discord.js';

export class BLoDDiscordSocket{
  private socket:Socket
  private discordLoadReady:boolean = false
  private connectionReady:boolean = false

  resolve: (data?:unknown) => void
  constructor(private client: BloDClient){
    const manager = new Manager("ws://localhost:3000", {
      reconnectionDelayMax: 10000,
      query:{
        token:this.client.createToken()
      }
    });


    // if(!this.socket)
      this.socket = manager.socket("/blog");
    // else
    //   console.log('socket already exist')

    this.registerSocketEvent()
  }

  private registerSocketEvent(){
    const sockets:Sockets = require('./socket')
    Object.keys(sockets).forEach(key => {
      const socket = sockets[key]
      const t:Socket = this.socket.on(socket.type,async (data,callback:Function) => {
        const a = await socket.handler(this,data)
        // console.log('ttt',callback)
        if(typeof callback === 'function')
          callback(a)
      })
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