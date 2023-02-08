"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = exports.Admin = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("./auth.constant");
exports.ROLES_KEY = 'roles';
exports.Roles = (...roles) => common_1.SetMetadata(exports.ROLES_KEY, roles);
exports.Admin = exports.Roles(auth_constant_1.Role.ADMIN);
exports.Manager = exports.Roles(auth_constant_1.Role.ADMIN, auth_constant_1.Role.MANAGER);
//# sourceMappingURL=roles.decorator.js.map