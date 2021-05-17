import { Request, Response } from 'express'
const express = require('express');
const app = express();
const userName = process.env.USERNAME;

const port = 3000;
const mockedData = [
    {
        "displayName": "Cyberpank 2077",
        "price": "60$",
        "rating": 2.7
    },
    {
        "displayName": "SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated",
        "price": "40$",
        "rating": 9.8
    },
    {
        "displayName": "God Of War",
        "price": "50$",
        "rating": 8.6
    }
];

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello, ${userName}! My name is Anastasiya Sych. It's my first server`)
});
app.get('/products', (req: Request, res: Response) => {
    res.json(mockedData);
})


app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`)
})