import { Request, Response, Application } from 'express';
import { errorHandler } from '../utils/error-handler';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const products = require('./products');
const categories = require('./categories');
const users = require('./users');
const logger = require('../../logger');
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
  res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first ${process.env.DB} server`);
});

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

module.exports = app;
