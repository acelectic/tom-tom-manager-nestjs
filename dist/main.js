"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsLoggerFilter = void 0;
require('dotenv').config();
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const db_exeption_filter_1 = require("./db-exeption.filter");
const bull_board_1 = require("bull-board");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
require("./initialize");
const env_config_1 = require("./config/env-config");
let ExceptionsLoggerFilter = class ExceptionsLoggerFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        super.catch(exception, host);
    }
};
ExceptionsLoggerFilter = __decorate([
    common_1.Catch()
], ExceptionsLoggerFilter);
exports.ExceptionsLoggerFilter = ExceptionsLoggerFilter;
console.log({ appConfig: env_config_1.appConfig });
const whitelistOrigin = [
    'https://tomtom-react.herokuapp.com',
    /\*.herokuapp.com$/,
    'http://localhost:3000',
    /\*.com$/,
];
bull_board_1.setQueues([]);
const loggerProduction = ['warn'];
const logger = env_config_1.appConfig.LOG_LEVEL === 'debug'
    ? { logger: ['debug'] }
    : env_config_1.appConfig.LOG_LEVEL === 'production'
        ? { logger: loggerProduction }
        : {};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'log', 'debug'],
    });
    app.enableCors({
        origin: true,
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.useGlobalFilters();
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new db_exeption_filter_1.DbExeptionFilter(), new ExceptionsLoggerFilter(httpAdapter));
    app.use(express_1.json({ limit: '50mb' }));
    app.use(express_1.urlencoded({ limit: '50mb', extended: true }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('TOMTOM API')
        .setDescription('The TOMTOM API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use('/bull-board', express_basic_auth_1.default({
        users: {
            admin: env_config_1.appConfig.BULL_BOARD_PASSWORD,
        },
        challenge: true,
    }), bull_board_1.router);
    const port = env_config_1.appConfig.PORT;
    await app.listen(port, () => {
        console.log('Nest server listening on port ' + port + '.');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map