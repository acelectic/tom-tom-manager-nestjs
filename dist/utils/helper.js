"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldBahtToGoldWeight = exports.goldWeightToGoldBaht = exports.debugLog = exports.roundUpOnly = exports.roundDownOnly = exports.calculateFee = exports.makeDir = exports.GOLD_WEIGHT_PER_GOLD_BAHT = exports.appVersion = void 0;
const class_validator_1 = require("class-validator");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
var pjJson = require('../../package.json');
exports.appVersion = pjJson.version;
exports.GOLD_WEIGHT_PER_GOLD_BAHT = 15.244;
const makeDir = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdir(dir, { recursive: true }, err => {
            if (err)
                return Promise.reject(err);
        });
    }
    return Promise.resolve(true);
};
exports.makeDir = makeDir;
const calculateFee = (amount) => {
    return Math.max(10, (amount * 1) / 100);
};
exports.calculateFee = calculateFee;
const roundDownOnly = (value, digit = 0) => {
    return (0, class_validator_1.isNumber)(Number(value)) ? (0, lodash_1.floor)(Number(value), digit) : 0;
};
exports.roundDownOnly = roundDownOnly;
const roundUpOnly = (value, digit = 0) => {
    return (0, class_validator_1.isNumber)(Number(value)) ? (0, lodash_1.ceil)(Number(value), digit) : 0;
};
exports.roundUpOnly = roundUpOnly;
const debugLog = (v) => {
    const hignlightLog = '-'.repeat(20);
    console.log(` `.repeat(20));
    console.log(`${hignlightLog} DEBUG ${hignlightLog}`);
    console.log(v);
    console.log(`${hignlightLog} DEBUG ${hignlightLog}`);
    console.log(` `.repeat(20));
};
exports.debugLog = debugLog;
const goldWeightToGoldBaht = (goldWeight) => {
    return goldWeight / exports.GOLD_WEIGHT_PER_GOLD_BAHT;
};
exports.goldWeightToGoldBaht = goldWeightToGoldBaht;
const goldBahtToGoldWeight = (goldBaht) => {
    return goldBaht * exports.GOLD_WEIGHT_PER_GOLD_BAHT;
};
exports.goldBahtToGoldWeight = goldBahtToGoldWeight;
//# sourceMappingURL=helper.js.map