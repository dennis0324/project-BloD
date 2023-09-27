import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SocketGateway } from './socket.gateway';


@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketGateway.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly socket: SocketGateway
  ) {
    this.logger.log('SocketService Initialized!')
  }

  createToken(){
    const payload = {
      sercet:this.configService.get<string>('BLOD_MESSAGE_SECRET')
    }
    const token = this.jwtService.sign(payload)
    return token
  }

  async getTitle(
    param:{serverID:string,guildID:string}
  ):Promise<{err:number,data:any[]}>{
    return new Promise((resolve) => {
      const querys = {...param}
      this.socket.io.timeout(4000).emit('blog:titles',querys,(err:any,data:any) => {
        if(err) return resolve({err:1,data:err})
        else {
          return resolve({err:0,...data})
        }
      })
    })
  }

  getThumbnail(
    param:{serverID:string,guildID:string,messageID:string}
  ){
    return new Promise((resolve) => {
      this.socket.io.timeout(5000).emit('blog:thumbnail',param,(err:any,data:any) =>{
        if(err) return resolve({err:1,data:err})
        else {
          return resolve({err:0,...data})
        }
      })
    })
  }


  getBlogPostContent(
    param:{serverID:string,guildID:string,messageID:string}
  ){
    return new Promise((resolve) => {
      this.socket.io.timeout(5000).emit('blog:postContent',param,(err:any,data:any) =>{
        if(err) return resolve({err:1,data:err})
        else {
          return resolve({err:0,...data})
        }
      })
    })
  }

}