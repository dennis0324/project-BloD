import { Module } from "@nestjs/common";
import { PollsGateway } from "./polls.gateway";

@Module({
  imports: [],
  controllers: [],
  providers: [PollsGateway],
})
export class PollsModule {}