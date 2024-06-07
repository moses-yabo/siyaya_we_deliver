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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const globalMiddleware_1 = require("./middlware/globalMiddleware");
const RouteHandler_1 = __importDefault(require("./routes/RouteHandler"));
class ServerEntryPoint {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8080;
        this.middleware = new globalMiddleware_1.QuanterMiddlewares(this.app, this.port);
        this.routes = (0, RouteHandler_1.default)(this.app);
        try {
            this.configureDbConnection();
        }
        catch (error) {
            console.log(error);
        }
    }
    configureDbConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "uri not working");
                console.log("Db is connected...");
            }
            catch (error) {
                throw new Error(error);
            }
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
