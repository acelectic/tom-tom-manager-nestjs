"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqUser = exports.Viewver = exports.Manager = exports.Admin = exports.Auth = exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const role_guard_1 = require("./role.guard");
const auth_constant_1 = require("./auth.constant");
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
const Auth = (...roles) => {
    return (0, common_1.applyDecorators)((0, exports.Roles)(...roles), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)());
};
exports.Auth = Auth;
const Admin = () => {
    return (0, exports.Auth)(auth_constant_1.Role.ADMIN);
};
exports.Admin = Admin;
const Manager = () => {
    return (0, exports.Auth)(auth_constant_1.Role.ADMIN, auth_constant_1.Role.MANAGER);
};
exports.Manager = Manager;
const Viewver = () => {
    return (0, exports.Auth)(auth_constant_1.Role.ADMIN, auth_constant_1.Role.MANAGER, auth_constant_1.Role.VIEWER);
};
exports.Viewver = Viewver;
exports.ReqUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=auth.decorator.js.map