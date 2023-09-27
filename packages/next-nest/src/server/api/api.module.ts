import { Module } from '@nestjs/common'
import { SocketModule } from '../socket/socket.module'
import { RouterModule } from '@nestjs/core'
import { V1Module } from './v1/v1.module'

@Module({
  imports: [
    SocketModule,
    V1Module,
    RouterModule.register([
      {
        path: 'api',
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