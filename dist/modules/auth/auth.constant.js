"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.cookieKeys = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["MANAGER"] = "manager";
    Role["USER"] = "user";
    Role["VIEWER"] = "viewer";
})(Role = exports.Role || (exports.Role = {}));
exports.cookieKeys = {
    accessToken: 'AccessToken',
    user: 'User',
};
exports.cookieOptions = {
    sameSite: 'none',
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 1000,
    secure: true,
};
//# sourceMappingURL=auth.constant.js.map