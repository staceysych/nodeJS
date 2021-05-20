require('dotenv').config();

import { db, port } from './config/config';

const mongoose = require('mongoose');
const app = require('./routes');

const startServer = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to DB');
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`)
        });
    } catch(e) {
        console.log(e);
    }
}

startServer();