"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookTaxiController_1 = require("../controllers/bookTaxiController");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
const taxiBookings = new bookTaxiController_1.TaxiBookings();
/**
 * @openapi
 * /bookings:
 *  get:
 *    tag:
 *        - Bookings
 *      description: responds if the app is running
 *      responses:
 *          200:
 *            description: App is up running
 */
bookRouter
    .get("/bookings", taxiBookings.listBookings)
    .get("/:bookingId", taxiBookings.getBookingById)
    .post("/booking", taxiBookings.createBooking)
    .put("/:bookingId", taxiBookings.updateBooking)
    .delete("/:bookingId", taxiBookings.deleteBooking);
