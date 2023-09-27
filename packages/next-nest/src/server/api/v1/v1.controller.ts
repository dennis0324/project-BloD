import { Controller, Get, Logger, Param, Query, UseInterceptors, Version } from '@nestjs/common'
import { V1Service } from './v1.service'
import { SocketService } from '@src/server/socket/socket.service'
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'

@Controller()
@UseInterceptors(CacheInterceptor)
export class V1Controller {
  private logger = new Logger(V1Controller.name)

  constructor(
    private readonly v1Service:V1Service,
    private readonly socketService:SocketService,
  ) {}

  @Get('/:serverID/:guildID/titles')
  @CacheTTL(0)
  async titles(
    @Param('serverID') serverID:string,
    @Param('guildID') guildID:string,
    @Query() query:{postCount?:string,page?:string}
  ){
    return await this.v1Service.getTitles({serverID,guildID,...query})
  }

  @Get('/:serverID/:guildID/thumbnail')
  @CacheTTL(120)
  async thumbnail(
    @Param('serverID') serverID:string,
    @Param('guildID') guildID:string,
    @Query() query:{messageID:string}
  ){
    if(query['messageID'] === undefined)
      return {err:1,data: 'messageID is undefined'}
    return await this.socketService.getThumbnail({serverID,guildID,messageID:query.messageID})
  }

  @Get('/:serverID/:guildID/blogPostContent')
  @CacheTTL(120)
  async blogPostContent(
    @Param('serverID') serverID:string,
    @Param('guildID') guildID:string,
    @Query() query:{messageID:string}
  ){
    if(query['messageID'] === undefined)
      return {err:1,data: 'messageID is undefined'}
    return await this.socketService.getBlogPostContent({serverID,guildID,messageID:query.messageID})
  }
}