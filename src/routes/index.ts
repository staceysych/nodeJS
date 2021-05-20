import { Request, Response } from 'express';

const express = require('express');
const products = require('./products');

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first server`)
});

app.use('/products', products);

module.exports = app;