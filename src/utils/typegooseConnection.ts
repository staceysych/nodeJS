require('dotenv').config();
const mongoose = require('mongoose');

import { dbString } from '../config/config';

export const connectToMongo = async (app, port: number) => {
    try {
        await mongoose.connect(dbString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`)
        });
    } catch(e) {
        console.log(e);
    }
}