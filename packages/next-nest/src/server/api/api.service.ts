import { Injectable } from '@nestjs/common'
import { Socket, io } from 'socket.io-client';
import { PollsService } from '../polls/polls.service';

@Injectable()
export class ApiService {

  // @Inject(ApiService)
  // private readonly apiService: ApiService;

  constructor(
    private readonly pollService: PollsService,
  ){
    const token = this.pollService.createToken()
    this.socket = io('http://localhost:3000/polls',{query:{token:token}})
  }
  private socket:Socket

  getHello(): string{
    return 'Hello World!'
  }
  
  // Todo: change emit to nestjs format emit
  getTitle(query:{postCount:number,page:number}){
    return new Promise((resolve) => {
      const querys = {routePath:'blog',postCount:query.postCount,page:query.page}
      this.socket.timeout(5000).emit('blog:nxns:title',querys,(err:any) =>{
        if(err) return resolve({data:err,err:1})
      })
      this.socket.on('blog:nsnx:title',(data) => {
        return resolve({err:0,...data})
      })
    })
  }

  // Todo: change emit to nestjs format emit
  getThumbnail(messageID:string){
    return new Promise((resolve) => {
      this.socket.timeout(5000).emit('blog:nxns:thumbnail',{routePath:'blog',messageID},(err:any) =>{
        if(err) return resolve({data:err,err:1})
      })
      this.socket.on('blog:nsnx:thumbnail',(data) => {
        if(data.id === messageID) 
          return resolve({err:0,data:data,length:data.length})
      })
    })
  }

}