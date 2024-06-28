"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanterMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openApi_json_1 = __importDefault(require("../openApi.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = require("../utils/logger");
const bookTaxiRoutes_1 = __importDefault(require("../routes/bookTaxiRoutes"));
const ShippingRoutes_1 = __importDefault(require("../routes/ShippingRoutes"));
const rentTrailerRoutes_1 = __importDefault(require("../routes/rentTrailerRoutes"));
const TaxiRoutes_1 = __importDefault(require("../routes/TaxiRoutes"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const ProductsRoutes_1 = __importDefault(require("../routes/ProductsRoutes"));
const TrailersRoutes_1 = __importDefault(require("../routes/TrailersRoutes"));
const errorHandler_1 = require("./errorHandler");
const notFoundHandler_1 = require("./notFoundHandler");
class QuanterMiddlewares {
    constructor(_app, _port) {
        this.getRequestTime = (req, res, next) => {
            logger_1.logger.info(`Received a ${req.method} Http method from ${req.url} at ${new Date().toISOString()}`);
            next();
        };
        this.app = _app;
        this.port = _port;
        this.configureMiddleware();
    }
    configureMiddleware() {
        const options = { explorer: true };
        if (process.env.NODE_ENV === "development") {
            this.app.use(this.getRequestTime);
            this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApi_json_1.default, options));
            this.app.get("/docs.json", (req, res) => {
                res.setHeader("Content-Type", "application/json");
                res.send(openApi_json_1.default);
            });
        }
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: "*" }));
        this.app.use("/api/books", bookTaxiRoutes_1.default);
        this.app.use("/api/shipp", ShippingRoutes_1.default);
        this.app.use("/api/rent", rentTrailerRoutes_1.default);
        this.app.use("/api/taxi", TaxiRoutes_1.default);
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use("/api/trailer", TrailersRoutes_1.default);
        this.app.use("/api/product", ProductsRoutes_1.default);
        this.app.use(notFoundHandler_1.NotFoundErrorHandler);
        this.app.use(errorHandler_1.errorHandler);
    }
    ;
}
exports.QuanterMiddlewares = QuanterMiddlewares;
