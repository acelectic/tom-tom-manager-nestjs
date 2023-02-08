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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const response_error_1 = require("../../utils/response-error");
const user_service_1 = require("../user/user.service");
const app_config_1 = require("../../config/app-config");
const auth_constant_1 = require("./auth.constant");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                JwtStrategy_1.extractJWT,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: app_config_1.appConfig.JWT_SECRET_KEY,
        });
        this.userService = userService;
    }
    async validate(payload) {
        const user = await this.userService.getUserWithId(payload.id);
        if (!user) {
            (0, response_error_1.httpError)(common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    static extractJWT(req) {
        var _a, _b;
        if ((_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a[auth_constant_1.cookieKeys.accessToken]) === null || _b === void 0 ? void 0 : _b.length) {
            return req.cookies[auth_constant_1.cookieKeys.accessToken];
        }
        return null;
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map