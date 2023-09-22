import { Module } from '@nestjs/common';
import { ViewModule } from './server/view/view.module';
import { ApiModule } from './server/api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '../envConfig'
import { PollsModule } from './server/polls/polls.module';

@Module({
  imports: [ConfigModule.forRoot({load:[config]}),ApiModule,ViewModule,PollsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
