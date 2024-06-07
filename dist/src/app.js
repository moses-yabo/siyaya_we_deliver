"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const HireTrailerRoutes_1 = require("./routes/HireTrailerRoutes");
const bookTaxiRoutes_1 = require("./routes/bookTaxiRoutes");
const ShippingRoutes_1 = require("./routes/ShippingRoutes");
const swaggerDefinition_1 = __importDefault(require("./utils/swaggerDefinition"));
const dotenv_1 = __importDefault(require("dotenv"));
class MyApp {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8080;
        this.configureMiddleware();
        this.app.use(this.configureDbConnection());
        this.app.use(this.getRequestTime());
        this.indexRoute();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/views")));
    }
    configureRoutes() {
        this.app.use("/shipp", (0, ShippingRoutes_1.Shippingroutes)());
        this.app.use(bookTaxiRoutes_1.bookRouter);
        this.app.use("/hire", (0, HireTrailerRoutes_1.trailerHiringRoutes)());
        this.app.get("/login", (req, res) => {
            res.send({
                name: "loger",
                value: "inja ayolulwa klk",
            });
        });
    }
    configureDbConnection() {
        return (req, res, next) => {
            console.log(`${req.method} ${req.headers.origin}`);
            next();
        };
    }
    getRequestTime() {
        return (req, res, next) => {
            console.log(`the request was at ${Date()}`);
            next();
        };
    }
    indexRoute() {
        return this.app.get("/landing", (req, res) => {
            console.log("hey");
            if (res.statusCode > 200) {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: {
                        name: "landing page",
                    },
                });
            }
            else {
                res.json({});
            }
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`welcome you are all listening on ${this.port}`);
        });
        (0, swaggerDefinition_1.default)(this.app, this.port);
    }
}
const myApp = new MyApp();
myApp.start();
