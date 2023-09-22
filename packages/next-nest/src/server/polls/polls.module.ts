import { Module } from "@nestjs/common";
import { PollsGateway } from "./polls.gateway";
import { jwtModule } from '../../modules.config';
import { ConfigModule } from "@nestjs/config";
import { PollsService } from "./polls.service";

@Module({
  imports: [ConfigModule,jwtModule],
  controllers: [],
  providers: [PollsService,PollsGateway],
  exports:[PollsService]
})
export class PollsModule {}