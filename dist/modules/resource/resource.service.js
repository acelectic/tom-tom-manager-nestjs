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
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const Resource_1 = require("../../db/entities/Resource");
let ResourceService = class ResourceService {
    constructor() { }
    async getResources(params) {
        const { isActive } = params;
        const queryBuilder = Resource_1.Resource.createQueryBuilder('resources').orderBy({
            ref: 'ASC',
        });
        if (isActive === true || isActive === false) {
            queryBuilder.where({
                isActive,
            });
        }
        const resources = await queryBuilder.getMany();
        return {
            resources,
        };
    }
    async createResource(params, etm) {
        const { name, price } = params;
        const resource = await Resource_1.Resource.findOrInit({ name, price });
        return await etm.save(resource);
    }
    async updateTemplateActiveStatus(resourceId, params, etm) {
        const { isActive } = params;
        const resource = await Resource_1.Resource.findOneBy({
            id: resourceId,
        });
        resource.isActive = isActive;
        return await etm.save(resource);
    }
};
ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResourceService);
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map