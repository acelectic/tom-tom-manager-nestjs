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
exports.UpdateUserDto = exports.ChangeRoleDto = exports.UpdateMobileNoDto = exports.UpdateAcceptTermDto = exports.UpdateEmailUserFacebookDto = exports.SearchUserDto = exports.GetUsersParamsDto = exports.UploadImageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const auth_constant_1 = require("../../auth/auth.constant");
const base_dto_1 = require("../../dto/base.dto");
class UploadImageDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "image", void 0);
exports.UploadImageDto = UploadImageDto;
class GetUsersParamsDto extends base_dto_1.BasePaginateParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], GetUsersParamsDto.prototype, "transactionId", void 0);
exports.GetUsersParamsDto = GetUsersParamsDto;
class SearchUserDto {
}
__decorate([
    swagger_1.ApiProperty({ required: false }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchUserDto.prototype, "limit", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchUserDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SearchUserDto.prototype, "q", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    class_validator_1.IsIn(['email', 'firstnameTh', 'lastnameTh', 'firstnameEn', 'lastnameEn', 'mobileNo', 'citizenId'], { each: true }),
    __metadata("design:type", Array)
], SearchUserDto.prototype, "filter", void 0);
exports.SearchUserDto = SearchUserDto;
class UpdateEmailUserFacebookDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], UpdateEmailUserFacebookDto.prototype, "email", void 0);
exports.UpdateEmailUserFacebookDto = UpdateEmailUserFacebookDto;
class UpdateAcceptTermDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateAcceptTermDto.prototype, "version", void 0);
exports.UpdateAcceptTermDto = UpdateAcceptTermDto;
class UpdateMobileNoDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateMobileNoDto.prototype, "mobileNo", void 0);
exports.UpdateMobileNoDto = UpdateMobileNoDto;
class ChangeRoleDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(auth_constant_1.Role),
    class_validator_1.IsIn(Object.values(auth_constant_1.Role)),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ChangeRoleDto.prototype, "role", void 0);
exports.ChangeRoleDto = ChangeRoleDto;
class UpdateUserDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(auth_constant_1.Role),
    class_validator_1.IsIn(Object.values(auth_constant_1.Role)),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user-params.dto.js.map