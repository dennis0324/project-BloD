import { Module } from '@nestjs/common'
import { DiscordAuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [],
  controllers: [DiscordAuthController]
})
export class DiscordAuthModule {}