"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShippingController_1 = require("../controllers/ShippingController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
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
            .get((0, validationMiddleware_1.validateObjectId)("shipping_id"), get_shipping_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("shipping_id"), updateMany_shipping)
            .patch((0, validationMiddleware_1.validateObjectId)("shipping_id"), updateOne_shipping)
            .delete((0, validationMiddleware_1.validateObjectId)("shipping_id"), remove_shipping);
    }
}
const shippingRouter = new ShippingRouter().router;
exports.default = shippingRouter;
