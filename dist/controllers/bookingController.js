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
exports.bookingController = void 0;
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class BookingController {
    constructor() {
        this.get_all_bookings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_booking = yield BookingSchema_1.default.find({});
                if (taxi_booking.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking Not Found !");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success !!", taxi_booking);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.get_booking_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield BookingSchema_1.default.findById(booking_id);
                if (!booking)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found", booking);
                (0, responseMiddleware_1.sendResponse)(res, 200, "success", booking);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.create_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield BookingSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a Booking", booking);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    if (error.name === 'ValidationError') {
                        return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, "Validation error");
                    }
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateOne_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const bookingUpdate = yield BookingSchema_1.default.findOneAndUpdate({ _id: booking_id }, { $set: req.body }, { new: true });
                if (!bookingUpdate) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found !");
                }
                (0, responseMiddleware_1.sendResponse)(res, 204, "success ! updated booking");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.updateMany_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield BookingSchema_1.default.updateOne({ _id: booking_id }, { $set: req.body });
                if (booking.modifiedCount === 0) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found or no changes made");
                }
                (0, responseMiddleware_1.sendResponse)(res, 200, "success updated a booking");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.remove_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield BookingSchema_1.default.deleteOne({ _id: booking_id });
                if (booking.deletedCount === 0) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found or already deleted");
                }
                (0, responseMiddleware_1.sendResponse)(res, 204, "success in deletion of booking");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
    }
}
exports.bookingController = new BookingController();
