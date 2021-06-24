import { Request, Response, Application } from 'express';
import { get10LastRatings } from '../controllers/productController';
import { errorHandler } from '../utils/errorHandler';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Bree = require('bree');
const products = require('./products');
const categories = require('./categories');
const users = require('./users');
const logger = require('../../logger');
const initializePassport = require('../passport/passport');

const bree = new Bree({
  jobs: [{ name: 'updateRatings' }],
});

const app: Application = express();
initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, done) => {
  logger.info(`Request: ${req.originalUrl} - ${req.method}. Response: status code - ${res.statusCode}`);
  done();
});

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first ${process.env.DB} server`);
});

app.get('/lastRatings', get10LastRatings);

app.use('/products', products);
app.use('/categories', categories);
app.use('/users', users);

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

bree.start();

module.exports = app;
