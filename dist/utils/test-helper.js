"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.createTestingModule = exports.createTestingApp = exports.truncates = void 0;
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const express_1 = require("express");
const user_service_1 = require("../modules/user/user.service");
const User_1 = require("../db/entities/User");
const auth_constant_1 = require("../modules/auth/auth.constant");
const app_config_1 = require("../config/app-config");
const truncates = (...tableNames) => {
    const query = tableNames.map(name => `TRUNCATE ${name} CASCADE;`).join('');
    return (0, typeorm_2.getConnection)().query(query);
};
exports.truncates = truncates;
const createTestingApp = (moduleRef) => {
    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    return app;
};
exports.createTestingApp = createTestingApp;
const createTestingModule = async (...modules) => {
    console.log(app_config_1.appConfig.DB_HOST, Number(app_config_1.appConfig.DB_PORT), app_config_1.appConfig.DB_USERNAME, app_config_1.appConfig.DB_PASSWORD, app_config_1.appConfig.DB_TEST_NAME);
    return await testing_1.Test.createTestingModule({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: app_config_1.appConfig.DB_HOST,
                port: Number(app_config_1.appConfig.DB_PORT),
                username: app_config_1.appConfig.DB_USERNAME,
                password: app_config_1.appConfig.DB_PASSWORD,
                database: app_config_1.appConfig.DB_TEST_NAME,
                synchronize: false,
                entities: ['src/db/entities/*{.js,.ts}'],
                autoLoadEntities: true,
                logging: true,
            }),
            ...modules,
        ],
    }).compile();
};
exports.createTestingModule = createTestingModule;
const getToken = (authService) => {
    const email = 'mock@test.com';
    const role = auth_constant_1.Role.ADMIN;
    const user = User_1.User.create({ role, email });
    const userId = user.id;
    const token = `Bearer ${authService.getToken(user)}`;
    jest
        .spyOn(user_service_1.UserService.prototype, 'getUserWithId')
        .mockImplementationOnce(jest.fn().mockReturnValue(user));
    return { user, userId, token };
};
exports.getToken = getToken;
//# sourceMappingURL=test-helper.js.map