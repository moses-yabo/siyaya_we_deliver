"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shippingroutes = void 0;
const express_1 = require("express");
const ShippingController_1 = require("../controllers/ShippingController");
const shippRouter = (0, express_1.Router)();
const shipping = new ShippingController_1.ShippingController();
function Shippingroutes() {
    shippRouter
        .get("/", shipping.getShippingItems)
        .post("/", shipping.createShippingItem)
        .get("/:bookingId", shipping.getShippingItemById)
        .put("/:bookingId", shipping.updateShippingItem)
        .delete("/:bookingId", shipping.deleteShipping);
    return shippRouter;
}
exports.Shippingroutes = Shippingroutes;
