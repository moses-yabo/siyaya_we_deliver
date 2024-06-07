"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const HireTrailerRoutes_1 = require("./HireTrailerRoutes");
const ShippingRoutes_1 = require("./ShippingRoutes");
const bookTaxiRoutes_1 = require("./bookTaxiRoutes");
class RoutesHandler {
    constructor(_app) {
        this.app = _app;
        this.app.use("/api/book", bookTaxiRoutes_1.bookRouter);
        this.app.use("/api/shipp", ShippingRoutes_1.shippRouter);
        this.app.use("/api/hire", HireTrailerRoutes_1.trailerRouter);
    }
}
exports.RoutesHandler = RoutesHandler;
