"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect('mongodb://localhost/nodeJs', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to DB');
        app.listen(PORT, () => {
            console.log(`Express is listening at http://localhost:${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
startServer();
//# sourceMappingURL=server.js.map