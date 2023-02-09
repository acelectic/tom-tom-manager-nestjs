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
const bullmq_1 = require("@nestjs/bullmq");
const task_module_1 = require("./task/task.module");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const resource_modules_1 = require("./modules/resource/resource.modules");
const transaction_modules_1 = require("./modules/transaction/transaction.modules");
const payment_modules_1 = require("./modules/payment/payment.modules");
const template_modules_1 = require("./modules/template/template.modules");
const app_config_1 = require("./config/app-config");
const db_config_1 = require("./config/db-config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: app_config_1.validationEnvSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, db_config_1.dbConfig.default), { autoLoadEntities: true })),
            schedule_1.ScheduleModule.forRoot(),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: app_config_1.appConfig.REDIS_HOST,
                    port: Number(app_config_1.appConfig.REDIS_PORT),
                },
                defaultJobOptions: {
                    removeOnComplete: 1000,
                },
            }),
            user_module_1.UserModule,
            nestjs_console_1.ConsoleModule,
            app_console_module_1.AppConsoleModule,
            auth_modules_1.AuthModule,
            task_module_1.TaskModule,
            resource_modules_1.ResourceModule,
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