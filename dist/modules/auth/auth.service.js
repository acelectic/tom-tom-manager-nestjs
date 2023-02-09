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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const User_1 = require("../../db/entities/User");
const response_error_1 = require("../../utils/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_constant_1 = require("./auth.constant");
const chance_1 = require("chance");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async registerWithEmail(data, role, etm) {
        await this.verifyEmail(data);
        await this.validateSignInWithEmail(data);
        const { email, password, name = (0, chance_1.Chance)().name({ middle: false, full: true }) } = data;
        console.log({ email, password, name });
        const encryptPassword = await bcrypt_1.default.hash(password, 10);
        const paramsSignInBase = {
            email,
            name,
            password: encryptPassword,
            role,
        };
        return await this.signIn(paramsSignInBase, etm);
    }
    async signWithEmail(data, etm) {
        const { email, password } = data;
        await this.validateSignInWithEmail(data);
        const user = await User_1.User.findOneBy({ email });
        const paramsSignInBase = {
            email,
            password,
            role: auth_constant_1.Role.USER,
        };
        return await this.signIn(paramsSignInBase, etm);
    }
    async generateAccountId() {
        return Math.random()
            .toString(36)
            .substring(2);
    }
    async signIn(data, etm) {
        const { email, password, name, role } = data;
        let user = await User_1.User.findOneBy({ email });
        if (!user) {
            const params = {
                email,
                password,
                role,
                name,
            };
            user = await this.userService.createUserSignIn(params, etm);
        }
        user.lastSignInAt = new Date();
        if (!(user === null || user === void 0 ? void 0 : user.password))
            user.password = password;
        await etm.save(user);
        const newUser = await etm.findOneBy(User_1.User, {
            id: user.id,
        });
        return {
            accessToken: this.getToken(newUser),
            user: newUser,
        };
    }
    async signOut(data, etm) {
        return { message: 'success' };
    }
    getToken(user) {
        const payload = {
            id: user.id,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
    async verifyEmail(params) {
        const { email } = params;
        const user = await User_1.User.findOneBy({ email });
        return { isEmailExist: user ? true : false };
    }
    async updateForgotPassword(data, etm) {
        const { email, password } = data;
        await this.validateUserWithEmail(email);
        const encryptPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.User.findOneBy({ email });
        user.password = encryptPassword;
        await etm.save(user);
        return user;
    }
    async validateUserWithEmail(email) {
        const user = await User_1.User.findOneBy({ email });
        if (!user) {
            (0, response_error_1.validateError)('User not found');
        }
    }
    async validateSignInWithEmail(data) {
        const { email, password } = data;
        const user = await User_1.User.createQueryBuilder('user')
            .where({
            email,
        })
            .addSelect('password')
            .getOne();
        const isPasswordMatching = await bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || '');
        if (user && password && (user === null || user === void 0 ? void 0 : user.password) && !isPasswordMatching) {
            (0, response_error_1.validateError)('Password not match');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map