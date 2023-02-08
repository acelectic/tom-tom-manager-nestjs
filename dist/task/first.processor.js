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
exports.FirstProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let FirstProcessor = FirstProcessor_1 = class FirstProcessor {
    constructor() {
        this.logger = new common_1.Logger(FirstProcessor_1.name);
    }
    handleProcess(job) {
        console.log('process', job.data);
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
    bull_1.Process('firstProcess'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "handleProcess", null);
__decorate([
    bull_1.OnQueueError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQueueError", null);
__decorate([
    bull_1.OnQueueWaiting(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereWaiting", null);
__decorate([
    bull_1.OnQueueActive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereActive", null);
__decorate([
    bull_1.OnQueueStalled(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereStalled", null);
__decorate([
    bull_1.OnQueueProgress(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQuereProgress", null);
__decorate([
    bull_1.OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FirstProcessor.prototype, "onQueueCompleted", null);
FirstProcessor = FirstProcessor_1 = __decorate([
    bull_1.Processor('first')
], FirstProcessor);
exports.FirstProcessor = FirstProcessor;
//# sourceMappingURL=first.processor.js.map