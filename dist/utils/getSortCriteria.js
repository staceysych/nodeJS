"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortCriteria = void 0;
const constants_1 = require("./constants");
const getSortCriteria = (req) => {
    const sortObj = req.query.sortBy;
    const sortCriteria = sortObj.split(':');
    const field = sortCriteria[0];
    const direction = sortCriteria[1] === constants_1.SORT_DIRECTION[0].toLocaleLowerCase() ? 1 : -1;
    return { field, direction };
};
exports.getSortCriteria = getSortCriteria;
//# sourceMappingURL=getSortCriteria.js.map