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
exports.BookTaxiController = void 0;
const TaxiBookingSchema_1 = __importDefault(require("../models/TaxiBookingSchema"));
class BookTaxiController {
    constructor() {
    }
    get_all_booking() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield TaxiBookingSchema_1.default.find({});
                if (!bookings)
                    return;
                res
                    .status(200)
                    .json({
                    status: "success !!",
                    data: bookings
                });
                console.log(bookings);
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
    }
    get_booking_by_id() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rentalId = req.params["rentalId"];
                const rental = yield TaxiBookingSchema_1.default.findById(rentalId);
                if (!rental)
                    return;
                res
                    .status(200)
                    .json({
                    status: "success",
                    data: rental
                });
            }
            catch (error) {
                res
                    .json({
                    status: "Failed",
                    msg: error
                });
            }
        });
    }
    create_booking() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBooking = yield TaxiBookingSchema_1.default.create(req.body);
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
                    .status(400)
                    .json({
                    status: "failed",
                    err: { error }
                });
                console.log(error);
            }
        });
    }
    updateOne_booking() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params["bookingId"];
                const booking = yield TaxiBookingSchema_1.default.updateOne({ _id: bookingId }, { $set: req.body });
                if (!booking)
                    return;
                res
                    .status(204)
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
                    .status(400)
                    .json({
                    status: "failed 😭",
                    msg: { error }
                });
            }
        });
    }
    updateMany_booking() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params["bookingId"];
                const booking = yield TaxiBookingSchema_1.default.findByIdAndUpdate(bookingId, { $set: req.body });
                if (!booking)
                    return;
                res
                    .status(204)
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
                    .status(400)
                    .json({
                    status: "failed 😭",
                    msg: { error }
                });
            }
        });
    }
    remove_booking() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params["bookingId"];
                const booking = yield TaxiBookingSchema_1.default.deleteOne({ bookingId }, req.body);
                if (!booking)
                    return;
                res
                    .status(204)
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
                    .status(400)
                    .json({
                    status: "failed 😭",
                    msg: { error }
                });
            }
        });
    }
}
exports.BookTaxiController = BookTaxiController;
