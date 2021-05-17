import { IncomingMessage, RequestListener, ServerResponse } from "http";

const http = require('http');

const port = 3000;
const host = 'localhost';
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

const requestHandler: RequestListener = (req: IncomingMessage, res: ServerResponse) => {

    if(req.method === 'GET') {
        switch(req.url) {
            case '/products':
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(mockedData));
            break;
            default: 
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h1>My first server</h1>');
        };
        res.end();
    }

    if(req.method === 'POST') {
        let data = '';
        if(req.url === '/products') {
            req.on('data', (chunk) => {
                data += chunk;
            });
    
            req.on('end', () => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                mockedData.push(JSON.parse(data));
                res.write(JSON.stringify(mockedData));
                res.end();
            });
        } else {
            res.end();
        }
    }
    
}
const server = http.createServer(requestHandler);

server.listen(port, host, (err) => {
    if (err) {
        return console.log('Something went wrong', err)
    }

    console.log(`Server is listening on ${port}`)
});