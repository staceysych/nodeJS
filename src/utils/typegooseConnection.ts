const mongoose = require('mongoose');

export const connectToMongo = async (app, port: number) => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`)
        });
    } catch(e) {
        console.log('ERROR: Database connection failed!!', e);
    }
}