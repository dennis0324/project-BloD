import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './server/socket-io.adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useWebSocketAdapter(new SocketIoAdapter(app,configService))
  await app.listen(3000);
}
bootstrap();
