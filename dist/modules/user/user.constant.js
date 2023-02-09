"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleTh = exports.titleEn = void 0;
exports.titleEn = {
    "['Mr','Mr.','mr','mr.']": 'Mr',
    "['Ms','Ms.','ms','ms.']": 'Ms',
    "['Mrs','Mrs.,'mrs','mrs.']": 'Mrs',
    getKey: function (key) {
        return Object.keys(this).find(val => {
            return val
                .replace(/(\[|\]|'|")/g, '')
                .split(',')
                .includes(key);
        });
    },
    get: function (key) {
        return this[this.getKey(key)];
    },
};
exports.titleTh = {
    "['นาย']": 'นาย',
    "['นาง']": 'นาง',
    "['นางสาว','น.ส.']": 'นางสาว',
    getKey: function (key) {
        return Object.keys(this).find(val => {
            return val
                .replace(/(\[|\]|'|")/g, '')
                .split(',')
                .includes(key);
        });
    },
    get: function (key) {
        return this[this.getKey(key)];
    },
};
//# sourceMappingURL=user.constant.js.map