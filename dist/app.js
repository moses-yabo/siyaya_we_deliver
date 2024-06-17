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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const globalMiddleware_1 = require("./middlware/globalMiddleware");
class ServerEntryPoint {
    constructor() {
        (0, dotenv_1.config)();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.middleware = new globalMiddleware_1.QuanterMiddlewares(this.app, this.port);
        try {
            this.configureDbConnection();
        }
        catch (error) {
            console.log(error);
        }
    }
    configureDbConnection() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const Db_URL = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DB_URL;
            const DB_PASSWORD = (_b = process.env) === null || _b === void 0 ? void 0 : _b.DB_PASSWORD;
            mongoose_1.default.set('strictQuery', false);
            yield mongoose_1.default.connect(Db_URL.replace("<password>", DB_PASSWORD))
                .then(() => {
                console.log("DB Connected");
            })
                .catch((err) => {
                console.log(err === null || err === void 0 ? void 0 : err.message);
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.app.listen(this.port, () => {
                    console.log(`welcome you are all listening on ${this.port}`);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const server = new ServerEntryPoint();
server.start();
