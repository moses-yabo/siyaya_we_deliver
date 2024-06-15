"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taxi_routes = exports.taxiRouter = void 0;
const express_1 = require("express");
const taxiController_1 = require("../controllers/taxiController");
const taxiRouter = (0, express_1.Router)();
exports.taxiRouter = taxiRouter;
taxiRouter
    .get("/", taxiController_1.get_all_available_taxi)
    .post("/", taxiController_1.add_taxi)
    .get("/:taxi_id", taxiController_1.get_taxi_by_id)
    .put("/:taxi_id", taxiController_1.updateMany_taxi)
    .patch("/:taxi_id", taxiController_1.updateOne_taxi)
    .delete("/:taxi_id", taxiController_1.remove_taxi);
const Taxi_routes = {
    "/api/taxi": {
        get: {
            summary: "Get all Taxi Productd rentals",
            tags: ["Taxi"],
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
            summary: "Create Taxi ID.",
            tags: ["Taxi"],
            description: "Create Taxi ID.",
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
    "/api/taxi/{taxi_id}": {
        get: {
            summary: "Get Product taxiing By Id",
            tags: ["Taxi"],
            description: "Create Product taxiing.",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Taxi ID to retrieve"
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
            tags: ["Taxi"],
            description: "Update Product To Be Taxi By Id",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Taxi ID to update"
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
            tags: ["Taxi"],
            description: "Partially update Product To Be Taxi By Id",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Taxi ID to update"
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
            tags: ["Taxi"],
            description: "Delete Product taxiing by its ID.",
            parameters: [
                {
                    name: "taxi_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the Taxi ID to delete"
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
exports.Taxi_routes = Taxi_routes;
