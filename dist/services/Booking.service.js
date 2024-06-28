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
exports.BookingService = void 0;
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
class BookingService {
    /**
        * Retrieves all taxi bookings from the database.
        *
        * @async
        * @function getAllBookings
        * @returns {Promise<TaxiBooking[]>} A promise that resolves to an array of taxi booking objects.
        * @throws {AppError} If no bookings are found.
        */
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const taxiBookings = yield BookingSchema_1.default.find({});
            if (taxiBookings.length === 0)
                throw new AppErrorHandling_1.AppError("No Bookings Found", 404);
            return taxiBookings;
        });
    }
    /**
     * Retrieves a specific taxi booking by its ID.
     *
     * @async
     * @function getBookingById
     * @param {string} bookingId - The ID of the booking to retrieve.
     * @returns {Promise<TaxiBooking>} A promise that resolves to the taxi booking object.
     * @throws {AppError} If the booking is not found.
     * @throws {Error} If any error occurs during the retrieval process.
     */
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield BookingSchema_1.default.findById(bookingId);
            if (!booking)
                throw new AppErrorHandling_1.AppError("Booking not Found !", 404);
            return booking;
        });
    }
    /**
     * Creates a new taxi booking in the database.
     *
     * @async
     * @function createBooking
     * @param {TaxiBooking} bookingData - The data of the booking to create.
     * @returns {Promise<TaxiBooking>} A promise that resolves to the created taxi booking object.
     * @throws {Error} If any error occurs during the creation process.
     */
    createBooking(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield BookingSchema_1.default.create(bookingData);
                return booking;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === "ValidationError")
                        throw new AppErrorHandling_1.AppError(`Validation error ${error.message}`, 400);
                }
                throw new AppErrorHandling_1.AppError("Couldn't Create a Booking try again later", 500);
            }
        });
    }
    /**
     * Updates a specific taxi booking by its ID.
     *
     * @async
     * @function updateOneBookingById
     * @param {string} bookingId - The ID of the booking to update.
     * @param {any} updateData - The data to update the booking with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the booking is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    updateOneBookingById(bookingId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingUpdate = yield BookingSchema_1.default.findByIdAndUpdate(bookingId, updateData, { new: true });
            if (!bookingUpdate)
                throw new AppErrorHandling_1.AppError("Booking not found", 404);
            return true;
        });
    }
    /**
     * Updates multiple taxi bookings by their ID.
     *
     * @async
     * @function updateManyBookingById
     * @param {string} bookingId - The ID of the bookings to update.
     * @param {any} updateData - The data to update the bookings with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If no bookings are found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    updateManyBookingById(bookingId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield BookingSchema_1.default.updateOne({ _id: bookingId }, { $set: updateData });
            if (booking.modifiedCount === 0)
                throw new AppErrorHandling_1.AppError("Booking has no changes made | Booking is not found", 404);
            return true;
        });
    }
    /**
     * Deletes a specific taxi booking by its ID.
     *
     * @async
     * @function deleteBookingById
     * @param {string} bookingId - The ID of the booking to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {AppError} If the booking is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    deleteBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingDelete = yield BookingSchema_1.default.findByIdAndDelete(bookingId);
            if (!bookingDelete)
                throw new AppErrorHandling_1.AppError('Booking not found', 404);
            return true;
        });
    }
}
exports.BookingService = BookingService;
