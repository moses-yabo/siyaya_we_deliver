"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanterMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const swaggerDefinition_1 = __importDefault(require("../utils/swaggerDefinition"));
class QuanterMiddlewares {
    constructor(_app, _port) {
        this.app = _app;
        this.port = _port;
        this.configureMiddleware();
    }
    getRequestTime() {
        return (req, res, next) => {
            console.log(`the request was at ${Date()}`);
            next();
        };
    }
    configureMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/views")));
        this.app.use(this.getRequestTime());
        (0, swaggerDefinition_1.default)(this.app, this.port);
    }
}
exports.QuanterMiddlewares = QuanterMiddlewares;
