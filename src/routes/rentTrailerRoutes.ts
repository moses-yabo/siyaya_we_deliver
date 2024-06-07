import { Router } from 'express';
import { 
    create_rental,
    get_all_rentals,
    get_rentals_by_id,
    updateOne_rental,
    updateMany_rentals,
    remove_rentals
} from "../controllers/rentalController";

const rentalRouter:Router = Router();

rentalRouter.
get("/",get_all_rentals)
.post("/",create_rental)
.get("/:rentalId",get_rentals_by_id)
.put("/:rentalId",updateMany_rentals)
.patch("/:trentalId",updateOne_rental)
.delete("/:trentalId",remove_rentals)



/**
 * @swagger
 * components:
 *   schemas:
 *     TrailerRental:
 *       type: object
 *       properties:
 *         trailerId:
 *           type: string
 *           description: Reference to the Trailer's _id
 *         customerId:
 *           type: string
 *           description: Reference to the Customer's _id
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date for hiring the trailer
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of a trailer usage
 *         totalCost:
 *           type: number
 *           description: The total cost of the trailer hired
 *         tripType:
 *           type: string
 *           enum: [LOCAL_TRIP, NATIONAL_TRIP]
 *           description: The type of trip for the booking (local or national)
 *         destination:
 *           type: string
 *           description: The destination of the driver 
 *         isAvailable:
 *           type: boolean
 *         capacity:
 *           type: string
 *           description: ["Xsmall","Small","Medium","Large","Xlarge"]
 */

/**
 * @swagger
 * /api/rent:
 *   get:
 *     summary: Get all trailer rentals
 *     tags: [TrailerRentals]
 *     description: Retrieve all trailer rentals.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrailerRental'
 */


/**
 * @swagger
 * /api/rent:
 *   post:
 *     summary: Create a new trailer rental
 *     tags: [TrailerRentals]
 *     description: Create a new trailer rental.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrailerRental' 
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrailerRental'
 */


/**
 * @swagger
 * /api/rent/{rentalId}:
 *   get:
 *     summary: Get a trailer rental by ID
 *     tags: [TrailerRentals]
 *     description: Get a single trailer rental by its ID.
 *     parameters:
 *       - name: rentalId
 *         in: path
 *         description: ID of the rental to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrailerRental' 
 */


/**
 * @swagger
 * /api/rent/{rentalId}:
 *   put:
 *     summary: Update a trailer rental by ID
 *     tags: [TrailerRentals]
 *     description: Update an existing trailer rental by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrailerRental'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrailerRental'
 */

/**
 * @swagger
 * /api/rent/{rentalId}:
 *   patch:
 *     summary: Update One by using a trailer rental by ID
 *     tags: [TrailerRentals]
 *     description: Update an existing trailer rental by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrailerRental'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrailerRental'
 */


/**
 * @swagger
 * /api/rent/{rentalId}:
 *   delete:
 *     summary: Delete a trailer rental by ID
 *     tags: [TrailerRentals]
 *     description: Delete a trailer rental by its ID.
 *     parameters:
 *       - name: rentalId
 *         in: path
 *         description: ID of the rental to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successful response (no content)
 */

export  {rentalRouter};
