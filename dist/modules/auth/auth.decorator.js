"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqUser = exports.Viewver = exports.Manager = exports.Admin = exports.Auth = exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const role_guard_1 = require("./role.guard");
const auth_constant_1 = require("./auth.constant");
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);
exports.Auth = (...roles) => {
    return common_1.applyDecorators(exports.Roles(...roles), common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard), swagger_1.ApiBearerAuth());
};
exports.Admin = () => {
    return exports.Auth(auth_constant_1.Role.ADMIN);
};
exports.Manager = () => {
    return exports.Auth(auth_constant_1.Role.ADMIN, auth_constant_1.Role.MANAGER);
};
exports.Viewver = () => {
    return exports.Auth(auth_constant_1.Role.ADMIN, auth_constant_1.Role.MANAGER, auth_constant_1.Role.VIEVWER);
};
exports.ReqUser = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=auth.decorator.js.map