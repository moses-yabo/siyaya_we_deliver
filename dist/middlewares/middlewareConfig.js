"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanterMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const node_notifier_1 = __importDefault(require("node-notifier"));
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
        this.getRequestTime = (req, res, next) => {
            console.log(`Received a ${req.method} Http method at ${new Date().toISOString()}`);
            next();
        };
        this.errorNotification = () => {
            return (err, str, req) => {
                const title = `Error in ${req.method} ${req.url}`;
                node_notifier_1.default.notify({
                    title,
                    message: str
                });
                // if (res.headersSent) { return next(err); }
                // let statusCode = 500;
                // if(err instanceof CustomError){statusCode = err.statusCode};
                // res.status(statusCode).json({error:err.message});
            };
        };
        this.app = _app;
        this.port = _port;
        this.configureMiddleware();
    }
    configureMiddleware() {
        const options = { explorer: true };
        if (process.env.NODE_ENV === "development") {
            this.app.use((0, errorhandler_1.default)({ log: this.errorNotification }));
            this.app.use(this.getRequestTime);
            // SERVE SWAGGER DOCUMENT
            this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApi_json_1.default, options));
            // DOCS IN JSON FORMAT
            this.app.get("/docs.json", (req, res) => {
                res.setHeader("Content-Type", "application/json");
                res.send(openApi_json_1.default);
            });
        }
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use("/api/books", bookTaxiRoutes_1.default);
        this.app.use("/api/shipp", ShippingRoutes_1.default);
        this.app.use("/api/rent", rentTrailerRoutes_1.default);
        this.app.use("/api/taxi", rentTrailerRoutes_2.default);
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use("/api/trailer", TrailersRoutes_1.default);
        this.app.use("/api/product", ProductsRoutes_1.default);
    }
    ;
}
exports.QuanterMiddlewares = QuanterMiddlewares;
