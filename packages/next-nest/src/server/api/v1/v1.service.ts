import { Injectable } from "@nestjs/common";
import { SocketService } from "../../socket/socket.service";

@Injectable()
export class V1Service{
  constructor(
    private readonly socketService:SocketService
  ){}

  async getTitles(
    param:{serverID:string,guildID:string,postCount?:string,page?:string},
  ){
    const titles = await this.socketService.getTitle(param)
    console.log()
    if(param['postCount'] !== undefined || param['page'] !== undefined){
      const start = Number(param.postCount) * Number(param.page)
      const arrTitles = Array.from(titles[0].data).slice(start,start + Number(param.postCount))
      return arrTitles
    }
    return titles
  }
}