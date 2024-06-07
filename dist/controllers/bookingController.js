"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_booking = exports.updateMany_booking = exports.updateOne_booking = exports.create_booking = exports.get_booking_by_id = exports.get_all_booking = void 0;
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
const get_all_booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield BookingSchema_1.default.find({});
        if (!bookings)
            return;
        res
            .status(200)
            .json({
            status: "success !!",
            data: bookings
        });
    }
    catch (error) {
        res
            .statusCode >= 400 ? res
            .json({
            status: "failed",
            msg: error
        })
            : Error(error);
    }
});
exports.get_all_booking = get_all_booking;
const get_booking_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params["bookingId"];
        const booking = yield BookingSchema_1.default.findById(bookingId);
        if (!booking)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: booking
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "Failed",
            msg: "404 resources not found",
            error
        });
    }
});
exports.get_booking_by_id = get_booking_by_id;
const create_booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = yield BookingSchema_1.default.create(req.body);
        if (!newBooking)
            return;
        res
            .status(201)
            .json({
            status: 'success',
            data: newBooking
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed",
            err: { error }
        });
        throw Error(error);
    }
});
exports.create_booking = create_booking;
const updateOne_booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params["bookingId"];
        console.log(bookingId);
        const booking = yield BookingSchema_1.default.updateOne({ _id: bookingId }, { $set: req.body });
        if (booking.modifiedCount === 0) {
            console.log(booking.acknowledged);
            res
                .status(500)
                .json({
                status: "failed updating a document",
                err: {
                    msg: "updated booking failed ...",
                }
            });
            return;
        }
        res
            .status(201)
            .json({
            status: "success !",
            data: {
                msg: "updated booking ...",
                data: {
                    booking
                }
            }
        });
    }
    catch (error) {
        res
            .status(500)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateOne_booking = updateOne_booking;
const updateMany_booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params["bookingId"];
        const booking = yield BookingSchema_1.default.findByIdAndUpdate(bookingId, { $set: req.body });
        if (!booking)
            return;
        res
            .status(201)
            .json({
            status: "success !",
            data: {
                msg: "updated booking ...",
                booking
            }
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateMany_booking = updateMany_booking;
const remove_booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params["bookingId"];
        const booking = yield BookingSchema_1.default.deleteOne({ bookingId }, req.body);
        if (!booking)
            return;
        res
            .status(204)
            .json({
            status: "success in deletion of a doc !"
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.remove_booking = remove_booking;
