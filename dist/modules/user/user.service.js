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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const Transaction_1 = require("../../db/entities/Transaction");
const User_1 = require("../../db/entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../../utils/response-error");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserService = class UserService {
    constructor() { }
    async getUsers(params) {
        const { transactionId, page = 1, limit = 5 } = params;
        const queryBuilder = User_1.User.createQueryBuilder('user');
        if (transactionId) {
            const transaction = await Transaction_1.Transaction.createQueryBuilder('transaction')
                .leftJoinAndSelect('transaction.users', 'users')
                .where('transaction.id = :transactionId', { transactionId })
                .getOne();
            const userIds = transaction.users.map(({ id }) => id);
            queryBuilder.where('user.id in (:...userIds)', { userIds });
        }
        queryBuilder.orderBy('user.name', 'ASC').leftJoinAndSelect('user.payments', 'payments');
        const users = await (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
        return users;
    }
    async getUser(userId) {
        return await User_1.User.findOneBy({
            id: userId,
        });
    }
    async getUserWithId(userId) {
        return await User_1.User.findOneBy({
            id: userId,
        });
    }
    async createUserSignIn(params, etm) {
        const { email, role, password, name } = params;
        const user = await User_1.User.findOrInit({ email, role, password, name });
        return await etm.save(user);
    }
    async changeRole(userId, role, etm) {
        const user = await User_1.User.findOneBy({
            id: userId,
        });
        if (!user)
            return;
        user.role = role;
        return await etm.save(user);
    }
    async updateUser(userId, params, etm) {
        const { name, password, role } = params;
        const user = await User_1.User.findOneBy({
            id: userId,
        });
        if (name) {
            user.name = name;
        }
        if (password) {
            const encryptPassword = await bcrypt_1.default.hash(password, 10);
            user.password = encryptPassword;
        }
        if (role) {
            user.role = role;
        }
        return await etm.save(user);
    }
    async validateUpdateUser(userId, params) {
        const { name, password, role } = params;
        const user = await User_1.User.findOneBy({
            id: userId,
        });
        if (!user) {
            (0, response_error_1.validateError)('User not found');
        }
        if (!name || !password) {
            (0, response_error_1.validateError)('Invalid information');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map