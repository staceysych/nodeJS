"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devLogger_1 = require("./devLogger");
const prodLogger_1 = require("./prodLogger");
let logger = null;
if (process.env.NODE_ENV === 'development') {
    logger = devLogger_1.devLogger();
}
else {
    logger = prodLogger_1.prodLogger();
}
module.exports = logger;
//# sourceMappingURL=index.js.map