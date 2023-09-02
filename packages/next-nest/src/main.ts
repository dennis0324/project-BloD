import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './server/socket-io.adapter';
import { winstonLogger } from './utils/winston.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(winstonLogger);
  app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.listen(3000);
}
bootstrap();
