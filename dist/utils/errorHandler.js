"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger = require('../logger');
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    logger.error(`${error.code || 500} - ${error.msg} - ${req.originalUrl} - ${req.method}`);
    res.status(error.code || 500).send({
        error: {
            status: error.code || 500,
            message: error.msg || 'Internal Server Error',
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map