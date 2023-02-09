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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("./resource.service");
const auth_decorator_1 = require("../auth/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
const resource_params_dto_1 = require("./dto/resource-params.dto");
const typeorm_1 = require("typeorm");
let ResourceController = class ResourceController {
    constructor(resourceService, dataSource) {
        this.resourceService = resourceService;
        this.dataSource = dataSource;
    }
    async getResources(params) {
        return this.resourceService.getResources(params);
    }
    async createResources(body, etm = this.dataSource.createEntityManager()) {
        return this.resourceService.createResource(body, etm);
    }
    async updateTemplateActiveStatus(resourceId, bodyParams, etm = this.dataSource.createEntityManager()) {
        return this.resourceService.updateTemplateActiveStatus(resourceId, bodyParams, etm);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resource_params_dto_1.GetResourcesParamsDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getResources", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resource_params_dto_1.CreateResourceParamsDto, Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "createResources", null);
__decorate([
    (0, common_1.Patch)(':resourceId/set-active'),
    __param(0, (0, common_1.Param)('resourceId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resource_params_dto_1.UpdateResourceIsActiveParamsDto, Object]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "updateTemplateActiveStatus", null);
ResourceController = __decorate([
    (0, swagger_1.ApiTags)('resources'),
    (0, common_1.Controller)('resources'),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:paramtypes", [resource_service_1.ResourceService,
        typeorm_1.DataSource])
], ResourceController);
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map