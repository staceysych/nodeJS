import { Request, Response } from 'express';

const logger = require('../../logger');

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  logger.error(`${error.code || 500} - ${error.msg} - ${req.originalUrl} - ${req.method}`);

  res.status(error.code || 500).send({
    error: {
      status: error.code || 500,
      message: error.msg || 'Internal Server Error',
    },
  });
};
