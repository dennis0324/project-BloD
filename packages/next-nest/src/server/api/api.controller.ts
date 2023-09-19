import { Controller, Get, Logger, Query } from '@nestjs/common'
import { ApiService } from './api.service'

@Controller('/api')
export class ApiController {
  private logger = new Logger(ApiController.name)
  constructor(private readonly viewService: ApiService) {}

  //api request foramt
  /**
   * @needed postCount 
   * @optional page
   * @optional format
   * 
   * @returns res: {err:0|1,data : {},length:number}
   */
  @Get('/blogposts')
  async blogPost(@Query() query){
    if(!query['postCount']) return {err:1,data:{},message:'postCount is required'}
    if(!query['page']) query.page = 0
    if(query['format'] === 'length') //if format has length query page will be set to -1 for additional process
      return await this.viewService.getTitle({postCount:query.postCount,page:-1})
    return await this.viewService.getTitle(query as {postCount:number,page:number})
  }
  
  //getting imgae for blogPost from thread channel thumbnail or image itself
  @Get('/thumbnail')
  async thumbnail(@Query() query){
    if(!query['messageID']) return {err:1,data:{}}
    return this.viewService.getThumbnail(query.messageID)
  }

}