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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const Db_URL = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DB_URL;
    const DB_PASSWORD = (_b = process.env) === null || _b === void 0 ? void 0 : _b.DB_PASSWORD;
    try {
        mongoose_1.default.set('strictQuery', false);
        yield mongoose_1.default.connect(Db_URL.replace("<password>", DB_PASSWORD));
        logger_1.logger.info("DB Connected");
        mongoose_1.default.connection.on("error", (error) => {
            logger_1.logger.error(`${error.message}`);
        });
        mongoose_1.default.connection.on("disconnect", () => {
            logger_1.logger.info("DB is disconnected ");
        });
    }
    catch (error) {
        logger_1.logger.error(` {
    message:${error === null || error === void 0 ? void 0 : error.message},
    name: ${error === null || error === void 0 ? void 0 : error.name}
    }`);
    }
});
