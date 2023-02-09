"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConsoleModule = void 0;
const common_1 = require("@nestjs/common");
const auth_modules_1 = require("../auth/auth.modules");
const app_console_service_1 = require("./app-console.service");
const user_module_1 = require("../user/user.module");
const transaction_modules_1 = require("../transaction/transaction.modules");
const payment_modules_1 = require("../payment/payment.modules");
let AppConsoleModule = class AppConsoleModule {
};
AppConsoleModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_modules_1.AuthModule, user_module_1.UserModule, transaction_modules_1.TransactionModule, payment_modules_1.PaymentModule],
        providers: [app_console_service_1.AppConsoleService],
    })
], AppConsoleModule);
exports.AppConsoleModule = AppConsoleModule;
//# sourceMappingURL=app-console.module.js.map