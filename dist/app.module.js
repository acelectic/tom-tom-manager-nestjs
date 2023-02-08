"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./modules/user/user.module");
const app_console_module_1 = require("./modules/app-console/app-console.module");
const nestjs_console_1 = require("nestjs-console");
const auth_modules_1 = require("./modules/auth/auth.modules");
const schedule_1 = require("@nestjs/schedule");
require("./initialize");
const bull_1 = require("@nestjs/bull");
const task_module_1 = require("./task/task.module");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const resouce_modules_1 = require("./modules/resource/resouce.modules");
const transaction_modules_1 = require("./modules/transaction/transaction.modules");
const payment_modules_1 = require("./modules/payment/payment.modules");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const template_modules_1 = require("./modules/template/template.modules");
const env_config_1 = require("./config/env-config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: env_config_1.validationEnvSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            bull_1.BullModule.forRoot({
                redis: {
                    host: env_config_1.appConfig.REDIS_HOST,
                    port: Number(env_config_1.appConfig.REDIS_PORT),
                    password: env_config_1.appConfig.REDIS_PASSWORD,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'frontend/build'),
            }),
            user_module_1.UserModule,
            nestjs_console_1.ConsoleModule,
            app_console_module_1.AppConsoleModule,
            auth_modules_1.AuthModule,
            task_module_1.TaskModule,
            resouce_modules_1.ResouceModule,
            transaction_modules_1.TransactionModule,
            payment_modules_1.PaymentModule,
            template_modules_1.TemplateModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: 'silent',
                    redact: {
                        paths: ['req.body.password', 'req.headers.authorization', 'req.headers.cookie'],
                        censor: '********',
                    },
                    serializers: {
                        req(req) {
                            req.body = req.raw.body;
                            return req;
                        },
                    },
                },
                exclude: [{ method: common_1.RequestMethod.GET, path: '/api/v1/health' }],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map