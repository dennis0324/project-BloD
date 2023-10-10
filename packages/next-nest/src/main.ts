import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './server/socket-io.adapter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app,configService))
  await app.listen(3000);
}
bootstrap();
