"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanterMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const swaggerDefinition_1 = __importDefault(require("../utils/swaggerDefinition"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class QuanterMiddlewares {
    constructor(_app, _port) {
        this.app = _app;
        this.port = _port;
        this.configureMiddleware();
    }
    configureMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(this.getRequestTime());
        // SWAGGER PAGE
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition_1.default));
        // DOCS IN JSON FORMAT
        this.app.get("/docs.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerDefinition_1.default);
        });
    }
    ;
    getRequestTime() {
        return (req, res, next) => {
            console.log(`the request was at ${Date()}`);
            next();
        };
    }
    ;
}
exports.QuanterMiddlewares = QuanterMiddlewares;
