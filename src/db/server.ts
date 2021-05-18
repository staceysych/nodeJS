const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://localhost/nodeJs', {
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