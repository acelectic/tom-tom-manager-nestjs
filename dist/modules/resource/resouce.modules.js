"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResouceModule = void 0;
const common_1 = require("@nestjs/common");
const resource_controller_1 = require("./resource.controller");
const resource_service_1 = require("./resource.service");
let ResouceModule = class ResouceModule {
};
ResouceModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [resource_controller_1.ResourceController],
        providers: [resource_service_1.ResourceService],
        exports: [resource_service_1.ResourceService],
    })
], ResouceModule);
exports.ResouceModule = ResouceModule;
//# sourceMappingURL=resouce.modules.js.map