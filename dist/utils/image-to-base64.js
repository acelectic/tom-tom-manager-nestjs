"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function validUrl(url) {
    return /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi.test(url);
}
function validTypeImage(image) {
    return /(?<=\S+)\.(jpg|png|jpeg)/gi.test(image);
}
function base64ToNode(buffer) {
    return buffer.toString('base64');
}
function readFileAndConvert(fileName) {
    if (fs_1.default.statSync(fileName).isFile()) {
        return base64ToNode(fs_1.default.readFileSync(path_1.default.resolve(fileName)).toString('base64'));
    }
    return null;
}
function isImage(urlOrImage) {
    if (validTypeImage(urlOrImage)) {
        return Promise.resolve(readFileAndConvert(urlOrImage));
    }
    else {
        return Promise.reject('[*] An error occured: Invalid image [validTypeImage === false]');
    }
}
function imageToBase64(urlOrImage) {
    if (validUrl(urlOrImage)) {
        return (0, node_fetch_1.default)(urlOrImage)
            .then(function (response) {
            return response.buffer();
        })
            .then(base64ToNode);
    }
    else {
        return isImage(urlOrImage);
    }
}
exports.default = imageToBase64;
//# sourceMappingURL=image-to-base64.js.map