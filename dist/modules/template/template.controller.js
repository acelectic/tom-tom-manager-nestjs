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
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const template_service_1 = require("./template.service");
const auth_decorator_1 = require("../auth/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
const template_params_dto_1 = require("./dto/template-params.dto");
const typeorm_1 = require("typeorm");
let TemplateController = class TemplateController {
    constructor(templateService, dataSource) {
        this.templateService = templateService;
        this.dataSource = dataSource;
    }
    async getTemplates(queryParams) {
        return this.templateService.getTemplates(queryParams);
    }
    async createTemplate(bodyParams, etm = this.dataSource.createEntityManager()) {
        return this.templateService.createTemplate(bodyParams, etm);
    }
    async updateTemplate(templateId, bodyParams, etm = this.dataSource.createEntityManager()) {
        return this.templateService.updateTemplate(templateId, bodyParams, etm);
    }
    async updateTemplateActiveStatus(templateId, bodyParams, etm = this.dataSource.createEntityManager()) {
        return this.templateService.updateTemplateActiveStatus(templateId, bodyParams, etm);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_params_dto_1.GetTemplatesParamsDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_params_dto_1.CreateTemplateParamsDto, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Patch)(':templateId'),
    __param(0, (0, common_1.Param)('templateId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, template_params_dto_1.UpdateTemplateParamsDto, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Patch)(':templateId/set-active'),
    __param(0, (0, common_1.Param)('templateId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, template_params_dto_1.UpdateTemplateIsActiveParamsDto, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "updateTemplateActiveStatus", null);
TemplateController = __decorate([
    (0, swagger_1.ApiTags)('templates'),
    (0, common_1.Controller)('templates'),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:paramtypes", [template_service_1.TemplateService,
        typeorm_1.DataSource])
], TemplateController);
exports.TemplateController = TemplateController;
//# sourceMappingURL=template.controller.js.map