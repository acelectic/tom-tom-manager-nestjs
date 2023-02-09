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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sing_out_dto_1 = require("./dto/sing-out.dto");
const register_dto_1 = require("./dto/register.dto");
const typeorm_1 = require("typeorm");
const auth_constant_1 = require("./auth.constant");
const helper_1 = require("../../utils/helper");
const lodash_1 = require("lodash");
let AuthController = class AuthController {
    constructor(authService, dataSource) {
        this.authService = authService;
        this.dataSource = dataSource;
    }
    async signInEmail(res, body, etm = this.dataSource.createEntityManager()) {
        const response = await this.authService.signWithEmail(body, etm);
        const { accessToken, user } = response;
        res.cookie(auth_constant_1.cookieKeys.accessToken, accessToken, auth_constant_1.cookieOptions);
        res.cookie(auth_constant_1.cookieKeys.user, user, auth_constant_1.cookieOptions);
        res.send(response);
        res.end();
    }
    async signOut(body, res, etm = this.dataSource.createEntityManager()) {
        const response = await this.authService.signOut(body, etm);
        res.clearCookie(auth_constant_1.cookieKeys.accessToken, auth_constant_1.cookieOptions);
        res.clearCookie(auth_constant_1.cookieKeys.user, auth_constant_1.cookieOptions);
        res.send(response);
        res.end();
    }
    async registerEmail(body, res, etm = this.dataSource.createEntityManager()) {
        (0, helper_1.debugLog)(Object.assign({}, body));
        const response = await this.authService.registerWithEmail(body, auth_constant_1.Role.USER, etm);
        const { accessToken, user } = response;
        res.cookie(auth_constant_1.cookieKeys.accessToken, accessToken, auth_constant_1.cookieOptions);
        res.cookie(auth_constant_1.cookieKeys.user, (0, lodash_1.pick)(user, ['name', 'email', 'lastSignInAt', 'password', 'balance']), auth_constant_1.cookieOptions);
        res.send(response);
        res.end();
    }
    async updateForgotPassword(body, etm = this.dataSource.createEntityManager()) {
        return await this.authService.updateForgotPassword(body, etm);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.SignInEmailDto }),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sign_in_dto_1.SignInEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInEmail", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: sing_out_dto_1.SignOutDto }),
    (0, common_1.Post)('sign-out'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sing_out_dto_1.SignOutDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: register_dto_1.ParamsRegisterEmailDto }),
    (0, common_1.Post)('register'),
    (0, common_1.SerializeOptions)({
        strategy: 'exposeAll',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.ParamsRegisterEmailDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmail", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.UpdateForgotPasswordDto }),
    (0, common_1.Patch)('/update-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.UpdateForgotPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateForgotPassword", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, typeorm_1.DataSource])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map