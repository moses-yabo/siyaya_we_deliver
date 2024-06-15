"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = exports.Taxi_booking_routes = void 0;
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
exports.Taxi_booking_routes = {
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
};
bookRouter
    .get("/", bookingController_1.get_all_booking)
    .post("/", bookingController_1.create_booking)
    .get("/:booking_id", bookingController_1.get_booking_by_id)
    .put("/:booking_id", bookingController_1.updateMany_booking)
    .patch("/:booking_id", bookingController_1.updateOne_booking)
    .delete("/:booking_id", bookingController_1.remove_booking);
