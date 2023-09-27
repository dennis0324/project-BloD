import { Module } from '@nestjs/common';
import { ViewModule } from './server/view/view.module';
import { ApiModule } from './server/api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '../envConfig'
import { SocketModule } from './server/socket/socket.module';
import { CacheModule } from '@nestjs/cache-manager'; 
import { MemoryCache } from 'cache-manager';

//ViewModule
@Module({
  imports: [ConfigModule.forRoot({load:[config]}),ApiModule,SocketModule,CacheModule.register({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
