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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ApiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
let ApiController = ApiController_1 = class ApiController {
    constructor(viewService) {
        this.viewService = viewService;
        this.logger = new common_1.Logger(ApiController_1.name);
    }
    async blogPost(query) {
        if (!query['postCount'])
            return { err: 1, data: {}, message: 'postCount is required' };
        if (!query['page'])
            query.page = 0;
        if (query['format'] === 'length')
            return await this.viewService.getTitle({
                postCount: query.postCount,
                page: -1,
            });
        return await this.viewService.getTitle(query);
    }
    async thumbnail(query) {
        if (!query['messageID'])
            return { err: 1, data: {} };
        return this.viewService.getThumbnail(query.messageID);
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)('/blogposts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "blogPost", null);
__decorate([
    (0, common_1.Get)('/thumbnail'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "thumbnail", null);
exports.ApiController = ApiController = ApiController_1 = __decorate([
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
//# sourceMappingURL=api.controller.js.map