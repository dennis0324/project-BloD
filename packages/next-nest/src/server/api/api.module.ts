import { Module } from '@nestjs/common'
import { SocketModule } from '../socket/socket.module'
import { RouterModule } from '@nestjs/core'
import { V1Module } from './v1/v1.module'
import { DiscordAuthModule } from './discord-auth/auth.module'

@Module({
  imports: [
    SocketModule,
    V1Module,
    DiscordAuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: DiscordAuthModule,
        children:[
          {
            path: 'v1',
            module: V1Module
          }
        ]
      }
    ])
  ],
})
export class ApiModule {}