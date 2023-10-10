import { Controller, Get, Logger, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import url from 'url'

@Controller('auth')
export class DiscordAuthController {
  private logger = new Logger(DiscordAuthController.name)

  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get('discord/redirect')
  async authLogin(@Query() query:{code:string}){
    if(query['code']){

      const formData = new url.URLSearchParams({
        client_id: this.configService.get('CLIENT_ID'),
        client_secret: this.configService.get('CLIENT_SECRET'),
        grant_type: 'authorization_code',
        code: query.code.toString(),
        redirect_uri: "http://localhost:3000/api/auth/discord/redirect"
      })

      const res = await fetch('https://discord.com/api/v10/oauth2/token',{
        method:'POST',
        body:formData,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const resData = await res.json()
      console.log(resData)
    }


    return 'test'
  }
}