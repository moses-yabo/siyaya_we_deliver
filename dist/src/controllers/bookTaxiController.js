"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxiBookings = void 0;
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
class TaxiBookings {
    listBookings(req, res) {
        res.send("List of bookings");
    }
    getBookingById(req, res) {
        const { bookingId } = req.params;
        res.send(`Booking ID: ${bookingId}`);
    }
    createBooking(req, res) {
        res.send("Booking has been successfully created");
    }
    updateBooking(req, res) {
        const { bookingId } = req.params;
        res.send(`Booking ID: ${bookingId} has been updated`);
    }
    deleteBooking(req, res) {
        const { bookingId } = req.params;
        res.send(`Booking ID: ${bookingId} watagwa en removed`);
    }
}
exports.TaxiBookings = TaxiBookings;
