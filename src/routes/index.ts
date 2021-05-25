import { Request, Response, Application } from 'express';

const express = require('express');
const products = require('./products');
const categories = require('./categories');

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first server`)
});

app.use('/products', products);
app.use('/categories', categories);

module.exports = app;