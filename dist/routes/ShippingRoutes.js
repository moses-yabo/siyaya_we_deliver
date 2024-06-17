"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShippingController_1 = require("../controllers/ShippingController");
const { create_shipping, get_all_shippings, get_shipping_by_id, updateOne_shipping, updateMany_shipping, remove_shipping } = ShippingController_1.shippingController;
class ShippingRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(get_all_shippings)
            .post(create_shipping);
        this.router
            .route("/:shipping_id")
            .get(get_shipping_by_id)
            .put(updateMany_shipping)
            .patch(updateOne_shipping)
            .delete(remove_shipping);
    }
}
const shippingRouter = new ShippingRouter().router;
exports.default = shippingRouter;
