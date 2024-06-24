"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const middlewareConfig_1 = require("./middlewares/middlewareConfig");
const DbContext_1 = __importDefault(require("./Db/DbContext"));
class ServerEntryPoint {
    constructor() {
        (0, dotenv_1.config)();
        (0, DbContext_1.default)();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.configureMiddlewares();
    }
    configureMiddlewares() {
        new middlewareConfig_1.QuanterMiddlewares(this.app, this.port);
    }
    start() {
        this.app.listen(this.port, () => console.log(`Welcome Server is Listening on ${this.port}`));
    }
}
const server = new ServerEntryPoint();
server.start();
