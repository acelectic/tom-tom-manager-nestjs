"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldBahtToGoldWeight = exports.goldWeightToGoldBaht = exports.debugLog = exports.roundUpOnly = exports.roundDownOnly = exports.calculateFee = exports.makeDir = exports.GOLD_WEIGHT_PER_GOLD_BAHT = void 0;
const class_validator_1 = require("class-validator");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
exports.GOLD_WEIGHT_PER_GOLD_BAHT = 15.244;
exports.makeDir = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdir(dir, { recursive: true }, err => {
            if (err)
                return Promise.reject(err);
        });
    }
    return Promise.resolve(true);
};
exports.calculateFee = (amount) => {
    return Math.max(10, (amount * 1) / 100);
};
exports.roundDownOnly = (value, digit = 0) => {
    return class_validator_1.isNumber(Number(value)) ? lodash_1.floor(Number(value), digit) : 0;
};
exports.roundUpOnly = (value, digit = 0) => {
    return class_validator_1.isNumber(Number(value)) ? lodash_1.ceil(Number(value), digit) : 0;
};
exports.debugLog = (v) => {
    const hignlightLog = '-'.repeat(20);
    console.log(` `.repeat(20));
    console.log(`${hignlightLog} DEBUG ${hignlightLog}`);
    console.log(v);
    console.log(`${hignlightLog} DEBUG ${hignlightLog}`);
    console.log(` `.repeat(20));
};
exports.goldWeightToGoldBaht = (goldWeight) => {
    return goldWeight / exports.GOLD_WEIGHT_PER_GOLD_BAHT;
};
exports.goldBahtToGoldWeight = (goldBaht) => {
    return goldBaht * exports.GOLD_WEIGHT_PER_GOLD_BAHT;
};
//# sourceMappingURL=helper.js.map