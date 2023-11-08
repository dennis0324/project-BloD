import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
export declare class PollsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    io: Namespace;
    private readonly logger;
    private routeMap;
    private GuildID;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
