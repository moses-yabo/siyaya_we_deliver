"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const { create_rental, get_all_rentals, get_rental_by_id, updateOne_rental, updateMany_rental, remove_rental } = rentalController_1.rentalController;
class RentalRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(get_all_rentals)
            .post(create_rental);
        this.router
            .route("/:rental_id")
            .get((0, validationMiddleware_1.validateObjectId)("rental_id"), get_rental_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("rental_id"), updateMany_rental)
            .patch((0, validationMiddleware_1.validateObjectId)("rental_id"), updateOne_rental)
            .delete((0, validationMiddleware_1.validateObjectId)("rental_id"), remove_rental);
    }
}
const rentalRouter = new RentalRouter().router;
exports.default = rentalRouter;
