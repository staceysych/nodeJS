const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
process.env.DB = 'mongodb://localhost/nodeJs';

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to DB');
        app.listen(PORT, () => {
            console.log(`Express is listening at http://localhost:${PORT}`)
        });
    } catch(e) {
        console.log(e);
    }
}

startServer();