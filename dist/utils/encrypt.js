"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encrypt = (token, data) => {
    const key = toMD5(token);
    const painText = JSON.stringify(data);
    const iv = getRandomIV();
    const encryptedData = encryptAES(painText, key, iv);
    return encryptBase64(iv + encryptedData);
};
exports.encrypt = encrypt;
const decrypt = (token, cipherText) => {
    const key = toMD5(token);
    const { iv, data } = decryptBase64(cipherText);
    return decryptAES(data, key, iv);
};
exports.decrypt = decrypt;
const toMD5 = (data) => {
    return crypto_js_1.default.MD5(data).toString();
};
const getRandomIV = () => {
    return crypto_js_1.default.lib.WordArray.random(8).toString();
};
const encryptAES = (painText, key, iv) => {
    return crypto_js_1.default.AES.encrypt(painText, key, {
        iv: crypto_js_1.default.enc.Hex.parse(iv),
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    }).toString();
};
const decryptAES = (data, key, iv) => {
    return crypto_js_1.default.AES.decrypt(data, key, {
        iv: crypto_js_1.default.enc.Hex.parse(iv),
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    }).toString(crypto_js_1.default.enc.Utf8);
};
const encryptBase64 = (text) => {
    const wordArray = crypto_js_1.default.enc.Utf8.parse(text);
    return crypto_js_1.default.enc.Base64.stringify(wordArray).toString();
};
const decryptBase64 = (cipherText) => {
    const text = crypto_js_1.default.enc.Base64.parse(cipherText).toString(crypto_js_1.default.enc.Utf8);
    return {
        iv: text.slice(0, 16),
        data: text.slice(16),
    };
};
//# sourceMappingURL=encrypt.js.map