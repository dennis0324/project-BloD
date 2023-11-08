import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
export declare class SocketIoAdapter extends IoAdapter {
    private app;
    private configService;
    private readonly logger;
    constructor(app: INestApplicationContext, configService: ConfigService);
    createIOServer(port: number, options?: any): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
