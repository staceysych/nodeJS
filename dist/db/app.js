"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const products = require('./routes/products');
const app = express();
const userName = process.env.USERNAME;
app.get('/', (req, res) => {
    res.send(`Hello, ${userName}! My name is Anastasiya Sych. It's my first server`);
});
app.use('/products', products);
module.exports = app;
//# sourceMappingURL=app.js.map