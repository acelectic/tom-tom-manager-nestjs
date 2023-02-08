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
exports.Resource = void 0;
const class_transformer_1 = require("class-transformer");
const entity_transform_1 = require("../../utils/entity-transform");
const typeorm_1 = require("typeorm");
const AppEntity_1 = require("./AppEntity");
const Payment_1 = require("./Payment");
const Template_1 = require("./Template");
let Resource = class Resource extends AppEntity_1.AppEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], Resource.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        name: 'price',
        type: 'numeric',
        default: 0,
        nullable: false,
        transformer: entity_transform_1.transformerDecimalToNumber,
    }),
    __metadata("design:type", Number)
], Resource.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_active', type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Generated('rowid'),
    typeorm_1.Column({
        name: 'ref',
        nullable: true,
    }),
    class_transformer_1.Transform(({ value }) => `${value}`.padStart(6, '0')),
    __metadata("design:type", String)
], Resource.prototype, "ref", void 0);
__decorate([
    typeorm_1.OneToMany(() => Payment_1.Payment, payments => payments.transaction),
    __metadata("design:type", Array)
], Resource.prototype, "payments", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Template_1.Template, templates => templates.resources, {
        lazy: true,
    }),
    __metadata("design:type", Array)
], Resource.prototype, "templates", void 0);
__decorate([
    typeorm_1.RelationId((resource) => resource.templates),
    __metadata("design:type", Array)
], Resource.prototype, "resourceIds", void 0);
Resource = __decorate([
    typeorm_1.Entity({ name: 'resources' })
], Resource);
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map