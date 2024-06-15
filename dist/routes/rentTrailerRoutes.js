"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRouter = exports.Rental_routes = void 0;
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
const rentalRouter = (0, express_1.Router)();
exports.rentalRouter = rentalRouter;
exports.Rental_routes = {
    "/api/rent": {
        get: {
            summary: "Get all rentals",
            tags: ["Trailer rentals"],
            description: "Get a list of all rentals.",
            responses: {
                200: {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Rentals"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: "Create a new rental",
            tags: ["Trailer rentals"],
            description: "Rent a trailer",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Rentals"
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
                                $ref: "#/components/schemas/Rentals"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/rent/{rental_id}": {
        get: {
            summary: "Get a rental by ID",
            tags: ["Trailer rentals"],
            description: "Get a single taxi rental by its ID.",
            parameters: [
                {
                    name: "rental_id",
                    in: "path",
                    description: "ID of the rental to retrieve",
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
                                $ref: "#/components/schemas/Rentals"
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Update a rental by ID",
            tags: ["Trailer rentals"],
            description: "Update an existing rental by its ID.",
            parameters: [
                {
                    name: "rental_id",
                    in: "path",
                    description: "ID of the rental to update",
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
                            $ref: "#/components/schemas/Rentals"
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
                                $ref: "#/components/schemas/Rentals"
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Partially update a rental by ID",
            tags: ["Trailer rentals"],
            description: "Partially update an existing taxi rental by its ID.",
            parameters: [
                {
                    name: "rental_id",
                    in: "path",
                    description: "ID of the rental to update",
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
                            $ref: "#/components/schemas/Rentals"
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
                                $ref: "#/components/schemas/Rentals1"
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a rental by ID",
            tags: ["Trailer rentals"],
            description: "Delete a rental by its ID.",
            parameters: [
                {
                    name: "rental_id",
                    in: "path",
                    description: "ID of the rental to delete",
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
rentalRouter.
    get("/", rentalController_1.get_all_rentals)
    .post("/", rentalController_1.create_rental)
    .get("/:rental_id", rentalController_1.get_rentals_by_id)
    .put("/:rental_id", rentalController_1.updateMany_rentals)
    .patch("/:rental_id", rentalController_1.updateOne_rental)
    .delete("/:rental_id", rentalController_1.remove_rentals);
