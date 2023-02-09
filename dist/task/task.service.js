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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bullmq_2 = require("bullmq");
const dayjs_1 = __importDefault(require("dayjs"));
const first_processor_1 = require("./first.processor");
const lodash_1 = require("lodash");
let TaskService = class TaskService {
    constructor(firstQueue) {
        this.firstQueue = firstQueue;
    }
    async timeout() {
        const now = (0, dayjs_1.default)();
        for (const index of (0, lodash_1.range)(1)) {
            const firstProcess = await this.firstQueue.add(first_processor_1.FirstProcessorConstants.FIRST_PROCESS, {
                index,
            });
            const { id: parentId } = firstProcess;
            const secondProcess = await this.firstQueue.add(first_processor_1.FirstProcessorConstants.SECOND_PROCESS, { index, parentId }, {});
        }
        console.log('Job Worked', now.format());
    }
};
__decorate([
    (0, schedule_1.Timeout)('Test Job', 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "timeout", null);
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(first_processor_1.FirstProcessorConstants.PROCESS_NAME)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map