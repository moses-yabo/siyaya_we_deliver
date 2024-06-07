"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingController = void 0;
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
class ShippingController {
    getShippingItems(req, res) {
        res.send("Lio");
    }
    ;
    getShippingItemById(req, res) {
        const bookingId = req.params;
        res.send(`Booking ID: ${bookingId} has been `);
    }
    ;
    createShippingItem(req, res) {
    }
    ;
    updateShippingItem(req, res) {
    }
    ;
    deleteShipping(req, res) {
        const bookingId = req.params;
        res.send(`Booking ID: ${bookingId} has been updated`);
    }
}
exports.ShippingController = ShippingController;
