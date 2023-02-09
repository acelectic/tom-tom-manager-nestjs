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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const first_processor_1 = require("./first.processor");
let TaskController = class TaskController {
    constructor(firstQueue) {
        this.firstQueue = firstQueue;
    }
    async transcode() {
        await this.firstQueue.add(first_processor_1.FirstProcessorConstants.FIRST_PROCESS);
        await this.firstQueue.resume();
        return { message: 'success' };
    }
};
__decorate([
    (0, common_1.Post)('first-process'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "transcode", null);
TaskController = __decorate([
    (0, swagger_1.ApiTags)('task'),
    (0, common_1.Controller)('v1/tasks'),
    __param(0, (0, bullmq_1.InjectQueue)(first_processor_1.FirstProcessorConstants.PROCESS_NAME)),
    __metadata("design:paramtypes", [Object])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map