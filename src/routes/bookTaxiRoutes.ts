import express, { Router } from 'express';
import { 
    create_booking,
    get_all_booking,
    get_booking_by_id,
    remove_booking,
    updateOne_booking,
    updateMany_booking
} from "../controllers/bookingController";

const bookRouter: express.Router = Router();

export const Taxi_booking_routes = {
  "/api/books": {
    get: {
        summary: "Get all bookings",
        tags: ["Taxi Bookings"],
        description: "Get a list of all taxi bookings.",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/TaxiBooking"
                            }
                        }
                    }
                }
            }
        }
    },
    post: {
        summary: "Create a new booking",
        tags: ["Taxi Bookings"],
        description: "Create a new taxi booking.",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/TaxiBooking"
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TaxiBooking"
                        }
                    }
                }
            }
        }
    }
},
"/api/books/{bookingId}": {
    get: {
        summary: "Get a booking by ID",
        tags: ["Taxi Bookings"],
        description: "Get a single taxi booking by its ID.",
        parameters: [
            {
                name: "booking_id",
                in: "path",
                description: "ID of the booking to retrieve",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TaxiBooking"
                        }
                    }
                }
            }
        }
    },
    put: {
        summary: "Update a booking by ID",
        tags: ["Taxi Bookings"],
        description: "Update an existing taxi booking by its ID.",
        parameters: [
            {
                name: "booking_id",
                in: "path",
                description: "ID of the booking to update",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/TaxiBooking"
                    }
                }
            }
        },
        responses: {
            204: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TaxiBooking"
                        }
                    }
                }
            }
        }
    },
    patch: {
        summary: "Partially update a booking by ID",
        tags: ["Taxi Bookings"],
        description: "Partially update an existing taxi booking by its ID.",
        parameters: [
            {
                name: "booking_id",
                in: "path",
                description: "ID of the booking to update",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/TaxiBooking"
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TaxiBooking"
                        }
                    }
                }
            }
        }
    },
    delete: {
        summary: "Delete a booking by ID",
        tags: ["Taxi Bookings"],
        description: "Delete a taxi booking by its ID.",
        parameters: [
            {
                name: "booking_id",
                in: "path",
                description: "ID of the booking to delete",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        responses: {
            204: {
                description: "Successful response (no content)"
            }
        }
    }
}
}

bookRouter
  .get("/", get_all_booking)
  .post("/", create_booking)
  .get("/:booking_id", get_booking_by_id)
  .put("/:booking_id", updateMany_booking)
  .patch("/:booking_id", updateOne_booking)
  .delete("/:booking_id", remove_booking);

export { bookRouter };
