"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTotalRating = void 0;
const countTotalRating = (ratingArray) => (ratingArray.reduce((acc, cur) => acc + +cur.rating, 0) / ratingArray.length).toFixed(1);
exports.countTotalRating = countTotalRating;
//# sourceMappingURL=countTotalRating.js.map