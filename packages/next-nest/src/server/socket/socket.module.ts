import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { jwtModule } from '../../modules.config';
import { ConfigModule } from "@nestjs/config";
import { SocketService } from "./socket.service";

@Module({
  imports: [ConfigModule,jwtModule],
  controllers: [],
  providers: [SocketService,SocketGateway],
  exports:[SocketService]
})
export class SocketModule {}