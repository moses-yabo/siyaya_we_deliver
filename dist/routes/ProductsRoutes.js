"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../controllers/ProductsController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
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
            .get((0, validationMiddleware_1.validateObjectId)("product_id"), get_product_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("product_id"), updateMany_product)
            .patch((0, validationMiddleware_1.validateObjectId)("product_id"), updateOne_product)
            .delete((0, validationMiddleware_1.validateObjectId)("product_id"), remove_product);
    }
}
const productRouter = new BookingRouter().route;
exports.default = productRouter;
