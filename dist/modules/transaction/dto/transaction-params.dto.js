"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionHistoryParamsDto = exports.GetTransactionParamsDto = exports.CreateTransactionParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dayjs_1 = __importStar(require("dayjs"));
const base_dto_1 = require("../../dto/base.dto");
class CreateTransactionParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID('all', {
        each: true,
    }),
    class_validator_1.ArrayMaxSize(6),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreateTransactionParamsDto.prototype, "userIds", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CreateTransactionParamsDto.prototype, "templateId", void 0);
exports.CreateTransactionParamsDto = CreateTransactionParamsDto;
class GetTransactionParamsDto extends base_dto_1.BasePaginateParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID('all', {
        each: true,
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], GetTransactionParamsDto.prototype, "userId", void 0);
exports.GetTransactionParamsDto = GetTransactionParamsDto;
class GetTransactionHistoryParamsDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Type(() => dayjs_1.Dayjs),
    class_transformer_1.Transform(({ value }) => dayjs_1.default(value)),
    class_validator_1.IsOptional(),
    __metadata("design:type", dayjs_1.Dayjs)
], GetTransactionHistoryParamsDto.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Type(() => dayjs_1.Dayjs),
    class_transformer_1.Transform(({ value }) => dayjs_1.default(value)),
    class_validator_1.IsOptional(),
    __metadata("design:type", dayjs_1.Dayjs)
], GetTransactionHistoryParamsDto.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : undefined)),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], GetTransactionHistoryParamsDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUUID(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], GetTransactionHistoryParamsDto.prototype, "userId", void 0);
exports.GetTransactionHistoryParamsDto = GetTransactionHistoryParamsDto;
//# sourceMappingURL=transaction-params.dto.js.map