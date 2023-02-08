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
exports.UpdateTemplateIsActiveParamsDto = exports.UpdateTemplateParamsDto = exports.CreateTemplateParamsDto = exports.GetTemplatesParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetTemplatesParamsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === 'true' ? true : false)),
    (0, class_validator_1.IsIn)(['true', 'false', true, false]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetTemplatesParamsDto.prototype, "isActive", void 0);
exports.GetTemplatesParamsDto = GetTemplatesParamsDto;
class CreateTemplateParamsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateParamsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTemplateParamsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)('all', {
        each: true,
    }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(6),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateTemplateParamsDto.prototype, "resourceIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTemplateParamsDto.prototype, "isActive", void 0);
exports.CreateTemplateParamsDto = CreateTemplateParamsDto;
class UpdateTemplateParamsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTemplateParamsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTemplateParamsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)('all', {
        each: true,
    }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(6),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateTemplateParamsDto.prototype, "resourceIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTemplateParamsDto.prototype, "isActive", void 0);
exports.UpdateTemplateParamsDto = UpdateTemplateParamsDto;
class UpdateTemplateIsActiveParamsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTemplateIsActiveParamsDto.prototype, "isActive", void 0);
exports.UpdateTemplateIsActiveParamsDto = UpdateTemplateIsActiveParamsDto;
//# sourceMappingURL=template-params.dto.js.map