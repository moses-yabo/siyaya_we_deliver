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
const mongoose_1 = __importDefault(require("mongoose"));
const resourceNotFound_1 = require("../utils/resourceNotFound");
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
const logger_1 = require("../utils/logger");
const booking_service_1 = require("../services/booking.service");
class BookingController {
    constructor() {
        this.bookingService = new booking_service_1.BookingService();
        this.get_all_bookings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.bookingService.getAllBookings();
                logger_1.logger.info("Fetched the bookings ");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success !!", bookings);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error ok !");
                    next(error);
                }
            }
        });
        // Finish the logger
        this.get_booking_by_id = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield this.bookingService.getBookingById(booking_id);
                if (!booking) {
                    (0, resourceNotFound_1.resourceNotFound)(`Booking`);
                    return;
                }
                ;
                logger_1.logger.info("Fetched a booking");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "success", booking);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    // next(new AppError(error.message,error.statusCode));
                    logger_1.logger.info(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                    next(error);
                }
            }
        });
        this.create_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield this.bookingService.createBooking(req.body);
                logger_1.logger.info("Booking Created");
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a Booking", booking);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateOne_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const bookingUpdate = this.bookingService.updateOneBookingById(booking_id, req.body);
                if (!bookingUpdate) {
                    (0, resourceNotFound_1.resourceNotFound)("Booking");
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "booking not found !");
                }
                logger_1.logger.info("updated booking");
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success ! updated booking", bookingUpdate);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal server error");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.updateMany_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = this.bookingService.updateManyBookingById(booking_id, req.body);
                if (!booking) {
                    logger_1.logger.warn("booking has no changes made");
                    return (0, resourceNotFound_1.resourceNotFound)("Booking");
                }
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success updated a booking", booking);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal server error");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
        this.remove_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                const booking = yield this.bookingService.deleteBookingById(booking_id);
                if (!booking) {
                    logger_1.logger.warn("booking not found or already deleted");
                    return (0, resourceNotFound_1.resourceNotFound)("Booking");
                }
                logger_1.logger.info("success in deletion of booking");
                return (0, responseMiddleware_1.sendResponse)(res, 204, "success in deletion of booking", booking);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal server error");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal server error");
                }
            }
        });
    }
}
exports.BookingController = BookingController;
exports.bookingController = new BookingController();
