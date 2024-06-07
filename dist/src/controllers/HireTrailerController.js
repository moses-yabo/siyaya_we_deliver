"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrailerHire = void 0;
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
class TrailerHire {
    listHirings(req, res) {
        res.send("Trailer hiring 😊");
    }
    ;
    getHiringsById(req, res) {
        res.send("Trailer hiring 😊");
    }
    createHiring(req, res) {
        res.send("Trailer hiring 😊");
    }
    ;
    updateHiring(req, res) {
        res.send("Trailer hiring 😊");
    }
    ;
    deleteHiring(req, res) {
        res.send("Trailer hiring 😊");
    }
    ;
}
exports.TrailerHire = TrailerHire;
