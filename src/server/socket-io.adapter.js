"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoAdapter = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
        this.logger = new common_1.Logger(SocketIoAdapter.name);
    }
    createIOServer(port, options) {
        const cors = {
            origin: [
                `http://localhost:3000`,
                new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):3000$/`).toString(),
            ],
        };
        this.logger.log('Configuring SocketIO server with custom CORS options', {
            cors,
        });
        const optionsWithCORS = {
            ...options,
            cors,
        };
        const jwtService = this.app.get(jwt_1.JwtService, { strict: false });
        const server = super.createIOServer(port, optionsWithCORS);
        server
            .of('polls')
            .use(createTokenMiddleware(jwtService, this.logger, this.configService));
        return server;
    }
}
exports.SocketIoAdapter = SocketIoAdapter;
const createTokenMiddleware = (jwtService, logger, configService) => {
    return (socket, next) => {
        const token = socket.handshake.query.token;
        logger.debug(`Validating auth token before connection: ${token}`);
        try {
            jwtService.verify(token, {
                secret: configService.get('BlOD_JWT_SECRET'),
            });
            next();
        }
        catch {
            next(new Error('Forbidden'));
        }
    };
};
//# sourceMappingURL=socket-io.adapter.js.map