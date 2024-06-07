"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
bookRouter
    .get("/", bookingController_1.get_all_booking)
    .post("/", bookingController_1.create_booking)
    .get("/:bookingId", bookingController_1.get_booking_by_id)
    .put("/:bookingId", bookingController_1.updateMany_booking)
    .patch("/:bookingId", bookingController_1.updateOne_booking)
    .delete("/:bookingId", bookingController_1.remove_booking);
