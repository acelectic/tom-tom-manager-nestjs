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
exports.UpdateResourceIsActiveParamsDto = exports.GetResourcesParamsDto = exports.CreateResourceParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateResourceParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.Length(1, 100),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateResourceParamsDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.Min(0),
    class_validator_1.Max(30000),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateResourceParamsDto.prototype, "price", void 0);
exports.CreateResourceParamsDto = CreateResourceParamsDto;
class GetResourcesParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Type(() => Boolean),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], GetResourcesParamsDto.prototype, "isActive", void 0);
exports.GetResourcesParamsDto = GetResourcesParamsDto;
class UpdateResourceIsActiveParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateResourceIsActiveParamsDto.prototype, "isActive", void 0);
exports.UpdateResourceIsActiveParamsDto = UpdateResourceIsActiveParamsDto;
//# sourceMappingURL=resource-params.dto.js.map