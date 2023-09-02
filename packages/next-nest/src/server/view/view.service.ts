import { Injectable, OnModuleInit } from '@nestjs/common'
import next from 'next'

@Injectable()
export class ViewService implements OnModuleInit {
  private server: ReturnType<typeof next>

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({ dev: true })
      await this.server.prepare()
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): ReturnType<typeof next> {
    return this.server
  }
}