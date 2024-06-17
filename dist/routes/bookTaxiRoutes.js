"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookingController_1 = require("./../controllers/bookingController");
const express_1 = require("express");
const { create_booking, get_all_bookings, get_booking_by_id, remove_booking, updateOne_booking, updateMany_booking } = bookingController_1.bookingController;
class BookingRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route
            .route("/")
            .get(get_all_bookings)
            .post(create_booking);
        this.route
            .route("/:booking_id")
            .get(get_booking_by_id)
            .put(updateMany_booking)
            .patch(updateOne_booking)
            .delete(remove_booking);
    }
}
const bookingRouter = new BookingRouter().route;
exports.default = bookingRouter;
