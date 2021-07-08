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
exports.getCategoryIdByName = void 0;
const services_1 = require("../services");
const constants_1 = require("./constants");
const getCategoryIdByName = (arrayOfNames) => __awaiter(void 0, void 0, void 0, function* () {
    const newArray = yield Promise.all(arrayOfNames.map((name) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield services_1.CategoryService.getCategoryByName(name);
        return process.env.DB === constants_1.POSTGRES_DB ? category[0].id : category._id;
    })));
    return newArray;
});
exports.getCategoryIdByName = getCategoryIdByName;
//# sourceMappingURL=getCategoryIdByName.js.map