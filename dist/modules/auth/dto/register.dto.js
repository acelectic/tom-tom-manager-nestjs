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
exports.ParamsRegisterEmailDto = exports.VerifyMobilelDto = exports.VerifyEmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class VerifyEmailDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "email", void 0);
exports.VerifyEmailDto = VerifyEmailDto;
class VerifyMobilelDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], VerifyMobilelDto.prototype, "mobileNo", void 0);
exports.VerifyMobilelDto = VerifyMobilelDto;
class ParamsRegisterEmailDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], ParamsRegisterEmailDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ParamsRegisterEmailDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ParamsRegisterEmailDto.prototype, "name", void 0);
exports.ParamsRegisterEmailDto = ParamsRegisterEmailDto;
//# sourceMappingURL=register.dto.js.map