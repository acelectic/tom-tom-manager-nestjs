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
exports.SignInAppleDto = exports.UpdateForgotPasswordDto = exports.SignInEmailInternalDto = exports.SignInEmailDto = exports.SignInFacebookDto = exports.SignInGoogleDto = exports.SignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SignInDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInDto.prototype, "mobileNo", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInDto.prototype, "token", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInDto.prototype, "pin", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInDto.prototype, "deviceToken", void 0);
exports.SignInDto = SignInDto;
class SignInGoogleDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInGoogleDto.prototype, "deviceToken", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInGoogleDto.prototype, "authToken", void 0);
exports.SignInGoogleDto = SignInGoogleDto;
class SignInFacebookDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInFacebookDto.prototype, "deviceToken", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInFacebookDto.prototype, "authToken", void 0);
exports.SignInFacebookDto = SignInFacebookDto;
class SignInEmailDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], SignInEmailDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInEmailDto.prototype, "password", void 0);
exports.SignInEmailDto = SignInEmailDto;
class SignInEmailInternalDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], SignInEmailInternalDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInEmailInternalDto.prototype, "password", void 0);
exports.SignInEmailInternalDto = SignInEmailInternalDto;
class UpdateForgotPasswordDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], UpdateForgotPasswordDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateForgotPasswordDto.prototype, "password", void 0);
exports.UpdateForgotPasswordDto = UpdateForgotPasswordDto;
class SignInAppleDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInAppleDto.prototype, "deviceToken", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], SignInAppleDto.prototype, "authToken", void 0);
exports.SignInAppleDto = SignInAppleDto;
//# sourceMappingURL=sign-in.dto.js.map