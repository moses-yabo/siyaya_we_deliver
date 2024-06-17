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
const mongoose_1 = require("mongoose");
class BookingController {
    constructor() {
        this.get_all_bookings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_booking = yield BookingSchema_1.default.find({});
                if (taxi_booking.length === 0)
                    return res.status(404).json({ status: "booking Not Found !", code: 404 });
                res.status(200).json({ status: "success !!", data: taxi_booking });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
        this.get_booking_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                if (!(0, mongoose_1.isValidObjectId)(booking_id))
                    return res.status(400).json({ status: "failed", message: "Invalid booking ID" });
                const booking = yield BookingSchema_1.default.findById(booking_id);
                if (!booking)
                    return res.status(404).json({ status: "booking not found" });
                res.status(200).json({ status: "success", data: booking });
            }
            catch (error) {
                res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
            }
        });
        this.create_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield BookingSchema_1.default.create(req.body);
                return res.status(201).json({ message: "Created a bookingr", status: 201, data: booking });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                    }
                    return res.status(500).json({ message: error.message, status: 500 });
                }
                return res.status(500).json({ message: "Failed to create a booking", status: 500 });
            }
        });
        this.updateOne_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                if (!(0, mongoose_1.isValidObjectId)(booking_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid booking ID" });
                    return;
                }
                ;
                const bookingUpdate = yield BookingSchema_1.default.findOneAndUpdate({ _id: booking_id }, { $set: req.body }, { new: true });
                if (!bookingUpdate) {
                    res.status(404).json({ status: "failed", msg: "booking not found !" });
                }
                const isUpdated = bookingUpdate !== null;
                if (isUpdated) {
                    res.status(204).json({ status: "success !", data: bookingUpdate });
                    return;
                }
                else {
                    res.status(500).json({ message: "Failed to update booking" });
                }
            }
            catch (error) {
                res.status(500).json({ status: "Internal server error", msg: error });
            }
        });
        this.updateMany_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                if (!(0, mongoose_1.isValidObjectId)(booking_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid booking ID" });
                }
                ;
                const booking = yield BookingSchema_1.default.updateOne({ _id: booking_id }, { $set: req.body });
                if (booking.modifiedCount === 0) {
                    res.status(500).json({ status: "failed updating a document", msg: "updated booking failed ..." });
                }
                res.status(204).json({ status: "success !" });
            }
            catch (error) {
                res.status(500).json({ status: "failed ", msg: error });
            }
        });
        this.remove_booking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking_id = req.params["booking_id"];
                if (!(0, mongoose_1.isValidObjectId)(booking_id)) {
                    return res.status(400).json({ status: "failed", message: "Invalid booking ID" });
                }
                const booking = yield BookingSchema_1.default.deleteOne({ _id: booking_id });
                if (booking.deletedCount === 0) {
                    res.status(404).json({ status: "Failed ", message: "booking not found" });
                }
                ;
                res.status(204).json({ status: "success in deletion of traxi a doc !" });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
    }
}
exports.bookingController = new BookingController();
