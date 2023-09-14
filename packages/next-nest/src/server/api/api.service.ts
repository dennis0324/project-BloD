import { Injectable, OnModuleInit } from '@nestjs/common'
import { resolve } from 'path';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class ApiService {
  constructor(){
    this.socket = io('http://localhost:3000/polls')
    console.log(this.socket.id)
  }
  private socket:Socket

  getHello(): string{
    return 'Hello World!'
  }

  getTitle(){

    return new Promise((resolve) => {
      this.socket.timeout(5000).emit('blog:nxns:title',{routePath:'blog'},(err:any) =>{
        if(err) return resolve({data:err,err:1})
      })
      this.socket.on('blog:nsnx:title',(data) => {
        console.log('getting with api',data)
        return resolve({err:0,data:data})
      })
    })
  }

}