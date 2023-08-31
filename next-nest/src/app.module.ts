import { Module } from '@nestjs/common';
import { ViewModule } from './server/view/view.module';
import { PollsGateway } from './server/polls/polls.gateway';
import { ApiModule } from './server/api/api.module';

@Module({
  imports: [ApiModule,ViewModule,PollsGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
