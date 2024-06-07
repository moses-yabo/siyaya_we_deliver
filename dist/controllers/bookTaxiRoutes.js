"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxiBookings = void 0;
class TaxiBookings {
    listBookings() {
        (req, res) => {
            res.send("List of products");
        };
    }
    getBookingById() {
        (req, res) => {
            const productId = req.params;
            res.send(` here is the single :- ${productId}`);
        };
    }
    ;
    createBooking() {
        (req, res) => {
            res.send("the book has been succsessfuly");
        };
    }
    ;
    updateBooking() {
        (req, res) => {
            res.send("Booking has been updated");
        };
    }
    ;
    deleteBooking() {
        (req, res) => {
            res.send("Booking has been removed");
        };
    }
    ;
}
exports.TaxiBookings = TaxiBookings;
