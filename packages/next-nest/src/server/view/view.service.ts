import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import next from 'next'

@Injectable()
export class ViewService implements OnModuleInit {
  private server: ReturnType<typeof next>
  constructor(private readonly configService: ConfigService) {

  }

  async onModuleInit(): Promise<void> {
    console.log(this.configService)
    try {
      this.server = next({ dev: this.configService.get('NODE_ENV') === 'development' ,conf:{  generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        console.log('test')
        return 'constant-build-id'
      }}})
      await this.server.prepare()
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): ReturnType<typeof next> {
    return this.server
  }
}