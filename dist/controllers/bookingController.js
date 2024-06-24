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
exports.bookingController = exports.BookingController = void 0;
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
const booking_service_1 = require("../services/booking.service");
const mongoose_1 = __importDefault(require("mongoose"));
class BookingController {
    constructor() {
        this.bookingService = new booking_service_1.BookingService();
        this.get_all_bookings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.bookingService.getAllBookings();
                (0, responseMiddleware_1.sendResponse)(res, 200, "success !!", bookings);
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
                const booking = yield this.bookingService.getBookingById(booking_id);
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
                const booking = yield this.bookingService.createBooking(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a Booking", booking);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateOne_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const bookingUpdate = this.bookingService.updateOneBookingById(booking_id, req.body);
                if (!bookingUpdate) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found !");
                }
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success ! updated booking", bookingUpdate);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.updateMany_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = this.bookingService.updateManyBookingById(booking_id, req.body);
                if (!booking) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking has no changes made");
                }
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success updated a booking", booking);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.remove_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield this.bookingService.deleteBookingById(booking_id);
                if (!booking) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found or already deleted");
                }
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success in deletion of booking", booking);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
    }
}
exports.BookingController = BookingController;
exports.bookingController = new BookingController();
