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
exports.AppEntity = void 0;
const typeorm_1 = require("typeorm");
class AppEntity extends typeorm_1.BaseEntity {
    static async findOrInit(data) {
        let record = await this.findOneBy(data);
        if (!record) {
            record = this.create(data);
        }
        return record;
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AppEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
    }),
    __metadata("design:type", Date)
], AppEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: false,
    }),
    __metadata("design:type", Date)
], AppEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AppEntity.prototype, "deletedAt", void 0);
exports.AppEntity = AppEntity;
//# sourceMappingURL=AppEntity.js.map