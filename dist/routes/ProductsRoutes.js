"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../controllers/ProductsController");
const { create_product, get_all_products, get_product_by_id, remove_product, updateOne_product, updateMany_product } = ProductsController_1.productController;
class BookingRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route
            .route("/")
            .get(get_all_products)
            .post(create_product);
        this.route
            .route("/:product_id")
            .get(get_product_by_id)
            .put(updateMany_product)
            .patch(updateOne_product)
            .delete(remove_product);
    }
}
const productRouter = new BookingRouter().route;
exports.default = productRouter;
