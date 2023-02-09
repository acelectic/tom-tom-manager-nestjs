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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_decorator_1 = require("../auth/auth.decorator");
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../db/entities/User");
const typeorm_1 = require("typeorm");
const user_params_dto_1 = require("./dto/user-params.dto");
let UserController = class UserController {
    constructor(userService, dataSource) {
        this.userService = userService;
        this.dataSource = dataSource;
    }
    async getUsers(queryParams) {
        return this.userService.getUsers(queryParams);
    }
    async getCurrentUser(user) {
        return this.userService.getUser(user.id);
    }
    async getUser(userId) {
        return this.userService.getUser(userId);
    }
    async changeRole(userId, param, etm) {
        return await this.userService.changeRole(userId, param.role, etm);
    }
    async updateUser(userId, param, etm = this.dataSource.createEntityManager()) {
        return await this.userService.updateUser(userId, param, etm);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_params_dto_1.GetUsersParamsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/current-user'),
    __param(0, (0, auth_decorator_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)('/:userId/change-role'),
    __param(0, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_params_dto_1.ChangeRoleDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeRole", null);
__decorate([
    (0, common_1.Patch)('/:userId/update'),
    __param(0, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_params_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:paramtypes", [user_service_1.UserService, typeorm_1.DataSource])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map