"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMap = void 0;
const toMap = (list) => list.reduce((result, item) => {
    result[item.id] = item;
    return result;
}, {});
exports.toMap = toMap;
//# sourceMappingURL=db-helper.js.map