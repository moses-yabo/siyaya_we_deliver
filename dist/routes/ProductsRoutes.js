"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductsController_1 = require("../controllers/ProductsController");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter
    .get("/", ProductsController_1.get_all_products)
    .post("/", ProductsController_1.create_product)
    .get("/:bookingId", ProductsController_1.get_product_by_id)
    .put("/:bookingId", ProductsController_1.updateMany_product)
    .patch("/:bookingId", ProductsController_1.updateOne_product)
    .delete("/:bookingId", ProductsController_1.remove_product);
