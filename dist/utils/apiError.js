"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(code, msg) {
        super();
        this.code = code;
        this.msg = msg;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static notFound(msg) {
        return new ApiError(404, msg);
    }
    static serverError(msg) {
        return new ApiError(500, msg);
    }
    static conflict(msg) {
        return new ApiError(409, msg);
    }
    static forbidden(msg) {
        return new ApiError(403, msg);
    }
    static unauthorized(msg) {
        return new ApiError(401, msg);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.js.map