import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiService } from './api.service'
import { PollsModule } from '../polls/polls.module'

@Module({
  imports: [PollsModule],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}