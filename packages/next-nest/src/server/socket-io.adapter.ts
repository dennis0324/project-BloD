import { INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions, Socket } from "socket.io";

export class SocketIoAdapter extends IoAdapter{
  private readonly logger = new Logger(SocketIoAdapter.name);
  constructor(
    private app:INestApplicationContext,
    private configService: ConfigService
    ){
    super(app);
  }

  createIOServer(port: number, options?: any) {
      // const clientPort = parseInt(this.configService.get('CLIENT_PORT'));

    const cors = {
      origin: [
        '*'
        // `http://localhost:3000`,
        // new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):3000$/`).toString(),
      ],
    };

    this.logger.log('Configuring SocketIO server with custom CORS options', {
      cors,
    });
    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    };
    const jwtService = this.app.get(JwtService,{ strict: false });

    const server: Server = super.createIOServer(port, optionsWithCORS);
    server.use(createTokenMiddleware(jwtService,this.logger,this.configService))
    return server;
  }
}

const createTokenMiddleware = 
  (jwtService: JwtService, logger: Logger,configService:ConfigService) => 
  (socket: Socket, next) => {
    const token = socket.handshake.query.token;

    logger.debug(`Validating auth token before connection: ${token}`);

    try{
      // const payload = jwtService.verify(token as string,{secret:configService.get<string>('BlOD_JWT_SECRET')});
      next();
    }
    catch{
      next(new Error('Forbidden'))
    }
  }