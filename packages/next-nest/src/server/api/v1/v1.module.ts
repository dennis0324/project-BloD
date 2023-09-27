import { Module } from "@nestjs/common";
import { SocketModule } from "@src/server/socket/socket.module";
import { V1Service } from "./v1.service";
import { V1Controller } from "./v1.controller";

@Module({
  imports: [SocketModule],
  controllers: [V1Controller],
  providers: [V1Service]
})
export class V1Module{}