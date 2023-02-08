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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const Resource_1 = require("../../db/entities/Resource");
const Template_1 = require("../../db/entities/Template");
const helper_1 = require("../../utils/helper");
let TemplateService = class TemplateService {
    constructor() { }
    async getTemplates(queryParams) {
        const { isActive } = queryParams;
        const queryBuilder = Template_1.Template.createQueryBuilder('template')
            .leftJoinAndSelect('template.resources', 'resources')
            .orderBy('template.is_active', 'DESC')
            .addOrderBy('template.ref', 'ASC');
        if (isActive !== undefined) {
            queryBuilder.where('template.is_active = :isActive', {
                isActive,
            });
        }
        const templates = await queryBuilder.getMany();
        return {
            templates,
        };
    }
    async createTemplate(params, etm) {
        const { name, description, isActive = true, resourceIds } = params;
        const resources = await Resource_1.Resource.findByIds(resourceIds, {
            relations: ['templates'],
        });
        const template = await etm.create(Template_1.Template, { name, description, isActive });
        await etm.save(template);
        if ((resourceIds === null || resourceIds === void 0 ? void 0 : resourceIds.length) && resources.length) {
            template.resources = resources;
        }
        await etm.save(template);
        return template;
    }
    async updateTemplate(templateId, params, etm) {
        const { name, description, resourceIds, isActive } = params;
        const template = await Template_1.Template.findOne(templateId);
        const resources = await Resource_1.Resource.findByIds(resourceIds);
        if ((resourceIds === null || resourceIds === void 0 ? void 0 : resourceIds.length) && resourceIds.length) {
            template.resources = resources;
        }
        template.isActive = isActive;
        template.name = name;
        template.description = description;
        return await etm.save(template);
    }
    async updateTemplateActiveStatus(templateId, params, etm) {
        const { isActive } = params;
        const template = await Template_1.Template.findOne(templateId);
        template.isActive = isActive;
        helper_1.debugLog({ isActive, template });
        return await etm.save(template);
    }
    async addTemplateToresources(template, resources, etm) {
        const oldResources = await template.resources;
        const newResources = [...oldResources, ...resources];
        template.resources = newResources;
        await etm.save(template);
        return await Promise.all(newResources);
    }
};
TemplateService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], TemplateService);
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map