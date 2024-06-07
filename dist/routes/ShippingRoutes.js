"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippRouter = void 0;
const express_1 = require("express");
const ShippingController_1 = require("../controllers/ShippingController");
const shippRouter = (0, express_1.Router)();
exports.shippRouter = shippRouter;
shippRouter
    .get("/", ShippingController_1.get_all_shippings)
    .post("/", ShippingController_1.create_shipping)
    .get("/:shippingId", ShippingController_1.get_shippings_by_id)
    .put("/:shippingId", ShippingController_1.updateMany_shipping)
    .patch("/:shippingId", ShippingController_1.updateOne_shipping)
    .delete("/:shippingId", ShippingController_1.remove_shipping);
