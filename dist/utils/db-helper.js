"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMap = void 0;
exports.toMap = (list) => list.reduce((result, item) => {
    result[item.id] = item;
    return result;
}, {});
//# sourceMappingURL=db-helper.js.map