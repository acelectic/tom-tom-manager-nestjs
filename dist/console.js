"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const nestjs_console_1 = require("nestjs-console");
const app_module_1 = require("./app.module");
const env_config_1 = require("./config/env-config");
console.log({ appConfig: env_config_1.appConfig });
const bootstrap = new nestjs_console_1.BootstrapConsole({
    module: app_module_1.AppModule,
    useDecorators: true,
});
bootstrap.init().then(async (app) => {
    try {
        await app.init();
        await bootstrap.boot();
        process.exit(0);
    }
    catch (e) {
        process.exit(1);
    }
});
//# sourceMappingURL=console.js.map