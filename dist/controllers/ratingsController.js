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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get10LastRatings = void 0;
const services_1 = require("../services");
const get10LastRatings = (ws, socket, message) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.parse(message);
    if (body.type === 'lastRatings') {
        const ratings = yield services_1.RatingsService.getLastRatings();
        return socket.send(JSON.stringify(ratings));
    }
});
exports.get10LastRatings = get10LastRatings;
//# sourceMappingURL=ratingsController.js.map