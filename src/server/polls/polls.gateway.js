"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PollsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let PollsGateway = PollsGateway_1 = class PollsGateway {
    constructor() {
        this.logger = new common_1.Logger(PollsGateway_1.name);
        this.routeMap = new Map();
    }
    afterInit() {
        this.logger.log('Websocket Initialized!');
    }
    handleConnection(client) {
        const socket = this.io.sockets;
        client.on('blog:nxns:title', (data) => {
            const guildID = this.routeMap.get(data.routePath);
            const query = {
                serverID: this.GuildID,
                guildID: guildID,
                postCount: data.postCount,
                page: data.page,
            };
            this.io.emit('blog:nd:title', query);
        });
        client.on('blog:dn:title', (data) => {
            this.io.emit('blog:nsnx:title', data);
        });
        const responseSocket = client.on('blog:nxns:thumbnail', (data) => {
            const guildID = this.routeMap.get(data.routePath);
            this.io.emit('blog:nd:thumbnail', {
                serverID: this.GuildID,
                guildID: guildID,
                messageID: data.messageID,
            });
        });
        responseSocket.on('blog:dn:thumbnail', (data) => {
            this.io.emit('blog:nsnx:thumbnail', data);
        });
        client.on('discord:ready', (data) => {
            this.routeMap.clear();
            this.GuildID = data['id'];
            Object.entries(data['routes']).forEach(([key, value]) => {
                this.routeMap.set(key, value);
            });
            console.log(this.routeMap, this.GuildID);
        });
        this.logger.log(`Client connected: ${client.id}`);
        this.logger.log(`total clients: ${socket.size}`);
    }
    handleDisconnect(client) {
        const socket = this.io.sockets;
        this.logger.log(`Client disconnected: ${client.id}`);
        this.logger.log(`total clients: ${socket.size}`);
    }
};
exports.PollsGateway = PollsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], PollsGateway.prototype, "io", void 0);
exports.PollsGateway = PollsGateway = PollsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'polls',
    }),
    __metadata("design:paramtypes", [])
], PollsGateway);
//# sourceMappingURL=polls.gateway.js.map