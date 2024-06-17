"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
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
            .get(get_rental_by_id)
            .put(updateMany_rental)
            .patch(updateOne_rental)
            .delete(remove_rental);
    }
}
const rentalRouter = new RentalRouter().router;
exports.default = rentalRouter;
