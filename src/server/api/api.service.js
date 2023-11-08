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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const socket_io_client_1 = require("socket.io-client");
const polls_service_1 = require("../polls/polls.service");
let ApiService = class ApiService {
    constructor(pollService) {
        this.pollService = pollService;
        const token = this.pollService.createToken();
        this.socket = (0, socket_io_client_1.io)('http://localhost:3000/polls', {
            query: { token: token },
        });
    }
    getHello() {
        return 'Hello World!';
    }
    getTitle(query) {
        return new Promise((resolve) => {
            const querys = {
                routePath: 'blog',
                postCount: query.postCount,
                page: query.page,
            };
            this.socket.timeout(5000).emit('blog:nxns:title', querys, (err) => {
                if (err)
                    return resolve({ data: err, err: 1 });
            });
            this.socket.on('blog:nsnx:title', (data) => {
                return resolve({ err: 0, ...data });
            });
        });
    }
    getThumbnail(messageID) {
        return new Promise((resolve) => {
            this.socket
                .timeout(5000)
                .emit('blog:nxns:thumbnail', { routePath: 'blog', messageID }, (err) => {
                if (err)
                    return resolve({ data: err, err: 1 });
            });
            this.socket.on('blog:nsnx:thumbnail', (data) => {
                if (data.id === messageID)
                    return resolve({ err: 0, data: data, length: data.length });
            });
        });
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [polls_service_1.PollsService])
], ApiService);
//# sourceMappingURL=api.service.js.map