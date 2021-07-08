import { Request, Response, Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { get10LastRatings } from '../controllers/productController';
import { errorHandler } from '../utils/errorHandler';
import { updateRatings } from '../jobs/updateRatings';
import { EVERY_MONDAY_CRON } from '../utils/constants';
import * as swaggerDocument from '../swagger/swagger.json';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cron = require('node-cron');
const products = require('./products');
const categories = require('./categories');
const users = require('./users');
const logger = require('../logger');
const initializePassport = require('../passport/passport');

const app: Application = express();
initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, done) => {
  logger.info(`Request: ${req.originalUrl} - ${req.method}. Response: status code - ${res.statusCode}`);
  done();
});

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first server`);
});

app.get('/lastRatings', get10LastRatings);

app.use('/products', products);
app.use('/categories', categories);
app.use('/users', users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response) => {
  logger.error(`status: 404, message: Nothing was found for this request ${req.originalUrl}`);

  res.status(404).send({
    error: {
      status: 404,
      message: 'Nothing was found',
    },
  });
});

app.use(errorHandler);

cron.schedule(EVERY_MONDAY_CRON, async () => {
  updateRatings();
});

module.exports = app;
