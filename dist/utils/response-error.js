"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBadRequest = exports.validateForbidden = exports.validateError = exports.notFound = exports.httpError = void 0;
const common_1 = require("@nestjs/common");
const httpError = (statusCode, errorCode, messages) => {
    console.log({ statusCode, errorCode });
    let message = undefined;
    let params = undefined;
    if (messages) {
        message = messages[0].constraints;
    }
    if (process.env.NODE_ENV !== 'production') {
        params = {
            statusCode,
            errorCode,
            message,
            error: common_1.HttpStatus[statusCode],
        };
    }
    else {
        params = {
            statusCode,
            errorCode,
            error: common_1.HttpStatus[statusCode],
        };
    }
    throw new common_1.HttpException(Object.assign({}, params), statusCode);
};
exports.httpError = httpError;
const notFound = (message) => {
    (0, exports.httpError)(common_1.HttpStatus.NOT_FOUND, message);
};
exports.notFound = notFound;
const validateError = (message) => {
    (0, exports.httpError)(common_1.HttpStatus.UNPROCESSABLE_ENTITY, message);
};
exports.validateError = validateError;
const validateForbidden = (message) => {
    (0, exports.httpError)(common_1.HttpStatus.FORBIDDEN, message);
};
exports.validateForbidden = validateForbidden;
const validateBadRequest = (message) => {
    (0, exports.httpError)(common_1.HttpStatus.BAD_REQUEST, '400-003', message);
};
exports.validateBadRequest = validateBadRequest;
//# sourceMappingURL=response-error.js.map