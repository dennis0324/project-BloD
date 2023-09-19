import { Module } from '@nestjs/common';
import { ViewModule } from './server/view/view.module';
import { PollsGateway } from './server/polls/polls.gateway';
import { ApiModule } from './server/api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '../envConfig'

@Module({
  imports: [ConfigModule.forRoot({load:[config]}),ApiModule,ViewModule,PollsGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
