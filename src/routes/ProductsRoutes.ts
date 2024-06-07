import express,{ Router } from 'express';
import { 
    create_product,
    get_all_products,
    get_product_by_id,
    remove_product,
    updateOne_product,
   updateMany_product

 } from "../controllers/ProductsController";



const productRouter:express.Router = Router();

productRouter
.get("/", get_all_products)
.post("/",create_product)
.get("/:bookingId",get_product_by_id)
.put("/:bookingId",updateMany_product)
.patch("/:bookingId",updateOne_product)
.delete("/:bookingId",remove_product);



/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         passengerId:
 *           type: string
 *           description: Reference to the booking passenger's _id
 *         driverId:
 *           type: string
 *           description: Reference to the booking driver's _id
 *         pickupLocation:
 *           type: string
 *           description: The pickup location for the booking
 *         dropoffLocation:
 *           type: string
 *           description: The dropoff location for the booking
 *         pickupTime:
 *           type: string
 *           format: date-time
 *           description: The pickup time for the booking
 *         fare:
 *           type: number
 *           description: The fare amount for the booking
 *         tripType:
 *           type: string
 *           enum: [LOCAL_TRIP, NATIONAL_TRIP]
 *           description: The type of trip for the booking (local or national)

 */


/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all bookings
 *     tags: [TaxiBookings]
 *     description: Get a list of all taxi bookings.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaxiBooking'
 */


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new booking
 *     tags: [TaxiBookings]
 *     description: Create a new taxi booking.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiBooking'
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxiBooking'
 */

/**
 * @swagger
 * /api/books/{bookingId}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [TaxiBookings]
 *     description: Get a single taxi booking by its ID.
 *     parameters:
 *       - name: bookingId
 *         in: path
 *         description: ID of the booking to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxiBooking'
 */



/**
 * @swagger
 * /api/books/{bookingId}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [TaxiBookings]
 *     description: Update an existing taxi booking by its ID.
 *     parameters:
 *       - name: bookingId
 *         in: path
 *         description: ID of the booking to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiBooking'
 *     responses:
 *       204:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxiBooking'
 */


/**
 * @swagger
 * /api/books/{bookingId}:
 *   patch:
 *     summary: Update Partialy  by using booking by ID
 *     tags: [TaxiBookings]
 *     description: Update an existing taxi booking by its ID.
 *     parameters:
 *       - name: bookingId
 *         in: path
 *         description: ID of the booking to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaxiBooking'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaxiBooking'
 */

/**
 * @swagger
 * /api/books/{bookingId}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [TaxiBookings]
 *     description: Delete a taxi booking by its ID.
 *     parameters:
 *       - name: bookingId
 *         in: path
 *         description: ID of the booking to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successful response (no content)
 */

export  {productRouter};
