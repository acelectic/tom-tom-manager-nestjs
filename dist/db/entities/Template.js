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
exports.Template = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const AppEntity_1 = require("./AppEntity");
const Resource_1 = require("./Resource");
const Transaction_1 = require("./Transaction");
let Template = class Template extends AppEntity_1.AppEntity {
};
__decorate([
    typeorm_1.Generated('rowid'),
    typeorm_1.Column({
        name: 'ref',
        nullable: true,
    }),
    class_transformer_1.Transform(({ value }) => `${value}`.padStart(6)),
    __metadata("design:type", String)
], Template.prototype, "ref", void 0);
__decorate([
    typeorm_1.Column({ name: 'name', type: 'text', nullable: false, default: '' }),
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'description', type: 'text', nullable: true, default: '' }),
    __metadata("design:type", String)
], Template.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_active', type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Template.prototype, "isActive", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transaction_1.Transaction, transaction => transaction.template, {
        lazy: true,
        nullable: true,
    }),
    __metadata("design:type", Array)
], Template.prototype, "transactions", void 0);
__decorate([
    typeorm_1.RelationId((template) => template.transactions),
    __metadata("design:type", Array)
], Template.prototype, "transactionIds", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Resource_1.Resource, resources => resources.templates, {
        lazy: true,
    }),
    typeorm_1.JoinTable({
        name: 'templates_resources',
        joinColumn: {
            name: 'templateId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'resourceId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Template.prototype, "resources", void 0);
__decorate([
    typeorm_1.RelationId((template) => template.resources),
    __metadata("design:type", Array)
], Template.prototype, "resourceIds", void 0);
Template = __decorate([
    typeorm_1.Entity({ name: 'templates' })
], Template);
exports.Template = Template;
//# sourceMappingURL=Template.js.map