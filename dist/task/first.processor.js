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
var FirstProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstProcessor = exports.FirstProcessorConstants = void 0;
const bull_1 = require("@nestjs/bull");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const lodash_1 = require("lodash");
var FirstProcessorConstants;
(function (FirstProcessorConstants) {
    FirstProcessorConstants["PROCESS_NAME"] = "first";
    FirstProcessorConstants["FIRST_PROCESS"] = "firstProcess";
    FirstProcessorConstants["SECOND_PROCESS"] = "secondProcess";
})(FirstProcessorConstants = exports.FirstProcessorConstants || (exports.FirstProcessorConstants = {}));
let FirstProcessor = FirstProcessor_1 = class FirstProcessor extends bullmq_1.WorkerHost {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(FirstProcessor_1.name);
    }
    async process(job, token) {
        switch (job.name) {
            case FirstProcessorConstants.FIRST_PROCESS:
                return this.firstProcess(job, token);
            case FirstProcessorConstants.SECOND_PROCESS:
                return this.secondProcess(job, token);
            default:
                return;
        }
    }
    async firstProcess(job, token) {
        console.log('firstProcess', job.id, ' START');
        await (0, bullmq_2.delay)(5000);
        console.log('firstProcess', job.id, ' END');
        return 'completed';
    }
    async secondProcess(job, token) {
        console.log('secondProcess', job.id, ' START');
        await (0, bullmq_2.delay)(10000);
        if ((0, lodash_1.random)(1, 10) > 5) {
        }
        console.log('secondProcess', job.id, ' END');
        return 'completed';
    }
    onQueueError(error) {
        console.log('onQueueError', error);
    }
    onQuereWaiting(jobId) {
        console.log('onQuereWaiting', jobId);
    }
    onQuereActive(job) {
        console.log('onQuereActive', job.data);
    }
    onQuereStalled(job) {
        console.log('onQuereStalled', job.data);
    }
    onQuereProgress(job, progress) {
        console.log('onQueueProgress', progress);
    }
    onQueueCompleted(job, result) {
        console.log('onQueueCompleted', job.name, result);
    }
};
__decorate([
    (0, bull_1.OnQueueError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQueueError", null);
__decorate([
    (0, bull_1.OnQueueWaiting)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereWaiting", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereActive", null);
__decorate([
    (0, bull_1.OnQueueStalled)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereStalled", null);
__decorate([
    (0, bull_1.OnQueueProgress)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Number]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereProgress", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Object]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQueueCompleted", null);
FirstProcessor = FirstProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(FirstProcessorConstants.PROCESS_NAME, {
        concurrency: 20,
    })
], FirstProcessor);
exports.FirstProcessor = FirstProcessor;
//# sourceMappingURL=first.processor.js.map