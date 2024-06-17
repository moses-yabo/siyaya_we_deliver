"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanterMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const openApi_json_1 = __importDefault(require("../openApi.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bookTaxiRoutes_1 = __importDefault(require("../routes/bookTaxiRoutes"));
const ShippingRoutes_1 = __importDefault(require("../routes/ShippingRoutes"));
const rentTrailerRoutes_1 = __importDefault(require("../routes/rentTrailerRoutes"));
const rentTrailerRoutes_2 = __importDefault(require("../routes/rentTrailerRoutes"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const ProductsRoutes_1 = __importDefault(require("../routes/ProductsRoutes"));
const TrailersRoutes_1 = __importDefault(require("../routes/TrailersRoutes"));
class QuanterMiddlewares {
    constructor(_app, _port) {
        this.app = _app;
        this.port = _port;
        this.configureMiddleware();
    }
    configureMiddleware() {
        const options = {
            explorer: true
        };
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(this.getRequestTime());
        this.app.use("/api/books", bookTaxiRoutes_1.default);
        this.app.use("/api/shipp", ShippingRoutes_1.default);
        this.app.use("/api/rent", rentTrailerRoutes_1.default);
        this.app.use("/api/taxi", rentTrailerRoutes_2.default);
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use("/api/trailer", TrailersRoutes_1.default);
        this.app.use("/api/product", ProductsRoutes_1.default);
        // SWAGGER PAGE
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApi_json_1.default, options));
        // DOCS IN JSON FORMAT
        this.app.get("/docs.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(openApi_json_1.default);
        });
    }
    ;
    getRequestTime() {
        return (req, res, next) => {
            console.log(`Received a ${req.method} Http method at ${Date()}`);
            next();
        };
    }
    ;
}
exports.QuanterMiddlewares = QuanterMiddlewares;
