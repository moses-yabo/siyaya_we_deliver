"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trailer_routes = exports.trailerRouter = void 0;
const express_1 = require("express");
const TrailersController_1 = require("../controllers/TrailersController");
const trailerRouter = (0, express_1.Router)();
exports.trailerRouter = trailerRouter;
trailerRouter
    .get("/", TrailersController_1.get_all_available_trailers)
    .post("/", TrailersController_1.add_trailer)
    .get("/:trailer_id", TrailersController_1.get_trailer_by_id)
    .put("/:trailer_id", TrailersController_1.updateMany_trailer)
    .patch("/:trailer_id", TrailersController_1.updateOne_trailer)
    .delete("/:trailer_id", TrailersController_1.remove_trailer);
const Trailer_routes = {
    "/api/trailer": {
        get: {
            summary: "Get all Taxi Productd rentals",
            tags: ["Trailers"],
            description: "Get all Taxi Products rentals.",
            responses: {
                200: {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Taxi"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: "Create Trailer Id.",
            tags: ["Trailers"],
            description: "Create Trailer Id.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Taxi"
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
                                $ref: "#/components/schemas/Taxi"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/trailer/{trailer_id}": {
        get: {
            summary: "Get Product Trailer By Id",
            tags: ["Trailers"],
            description: "Add a Trailer.",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Trailer Id to retrieve"
                }
            ],
            responses: {
                200: {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Taxi"
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Update Taxi by ID",
            tags: ["Trailers"],
            description: "Update Product To Be Taxi By Id",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Trailer Id to update"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Taxi"
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
                                $ref: "#/components/schemas/Taxi"
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Update Taxi by ID",
            tags: ["Trailers"],
            description: "Partially update Product To Be Taxi By Id",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Trailer Id to update"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Taxi"
                        }
                    }
                }
            },
            responses: {
                204: {
                    description: "Successful response (no content)"
                }
            }
        },
        delete: {
            summary: "Delete a taxi by Id",
            tags: ["Trailers"],
            description: "Delete Product Trailer by its ID.",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Trailer Id to delete"
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
exports.Trailer_routes = Trailer_routes;
