import { Request, Response, Application } from 'express';
import { errorHandler } from '../utils/error-handler';

const express = require('express');
const products = require('./products');
const categories = require('./categories');

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first ${process.env.DB} server`)
});

app.use('/products', products);
app.use('/categories', categories);

app.use((req: Request, res: Response, next) => {
    res.status(404).send({
        error: {
            status: 404,
            message: 'Nothing was found',
        },
    });
  });

app.use(errorHandler);

module.exports = app;