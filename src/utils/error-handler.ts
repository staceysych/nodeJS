const logger = require('../../logger');

export const errorHandler = (error: any, req, res, next) => {

    logger.error(`${error.code || 500} - ${error.msg} - ${req.originalUrl} - ${req.method}`);

    res.status(error.code || 500).send({
        error: {
            status: error.code || 500,
            message: error.msg || 'Internal Server Error',
        },
    });
}