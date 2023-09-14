import { Module } from '@nestjs/common'

import { ApiController } from './api.controller'
import { ApiService } from './api.service'
import { PollsGateway } from '../polls/polls.gateway'
// import { ViewService } from './view.service'

@Module({
  imports: [],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}