import { Router } from "express";
import { 
          create_shipping,
          get_all_shippings,
          get_shippings_by_id,
          updateOne_shipping,
          updateMany_shipping,
          remove_shipping
} from "../controllers/ShippingController";

const shippRouter = Router();
shippRouter
.get("/",get_all_shippings)
.post("/",create_shipping)
.get("/:shippingId",get_shippings_by_id)
.put("/:shippingId",updateMany_shipping)
.patch("/:shippingId",updateOne_shipping)
.delete("/:shippingId",remove_shipping);

 
/**
 * @swagger
 * components:
 *   schemas:
 *     Shipping:
 *       type: object
 *       properties:
 *         trip_type:
 *           type: string
 *           enum: [LOCAL_TRIP, NATIONAL_TRIP]
 *           description: Reference to the tript types
 *         fleet:
 *           type: number
 *           description: Reference to the Fleet number
 *         taxi_owner:
 *           type: string
 *           description: The taxi driver name
 *         taxi_driver:
 *           type: string
 *           description: The Name of the driver 
 *         departure:
 *           type: string
 *           description: The pickup time for the booking
 *         destination:
 *           type: number
 *           description: The fare amount for the booking
 *         time_stamp:
 *           type: string
 *           format: date-time
 *           description: The type of trip for the booking (local or national)

 */

/**
 * @swagger
 * /api/shipp:
 *   get:
 *     summary: Get all shipped Productd rentals
 *     tags: [ProductShipping]
 *     description: Get all shipped Products rentals..
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shipping'
 */
  
  /**
 * @swagger
 * /api/shipp:
 *   post:
 *     summary: Create ProductShipping.
 *     tags: [ProductShipping]
 *     description: Create ProductShipping..
 *     parameters:
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 * 
 */

  /**
 * @swagger
 * /api/shipp/{shippingId}:
 *   get:
 *     summary: Get Product Shipping By Id
 *     tags: [ProductShipping]
 *     description: Create Product Shipping.
 *     parameters:
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 */

/**
 * @swagger
 * /api/shipp/{shippingId}:
 *   put:
 *     summary: update [ProductShipping] by ID
 *     tags: [ProductShipping]
 *     description: Update Product To Be Shipped By Id
 *     parameters:
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 * 
 */ 

/**
 * @swagger
 * /api/shipp/{shippingId}:
 *   patch:
 *     summary: update [ProductShipping] by ID
 *     tags: [ProductShipping]
 *     description: Update Product To Be Shipped By Id
 *     parameters:
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       204:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 * 
 */ 

/**
 * @swagger
 * /api/shipp/{shippingId}:
 *   delete:
 *     summary: delete Product Shipping by Id
 *     tags: [ProductShipping]
 *     description: Retrieve all trailer rentals.
 *     parameters:
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       204:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 * 
 */





  export  {shippRouter};
