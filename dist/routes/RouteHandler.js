"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rentTrailerRoutes_1 = require("./rentTrailerRoutes");
const ShippingRoutes_1 = require("./ShippingRoutes");
const bookTaxiRoutes_1 = require("./bookTaxiRoutes");
function RoutesMountPoint(app) {
    app.use("/api/books", bookTaxiRoutes_1.bookRouter);
    app.use("/api/shipp", ShippingRoutes_1.shippRouter);
    app.use("/api/rent", rentTrailerRoutes_1.rentalRouter);
}
exports.default = RoutesMountPoint;
