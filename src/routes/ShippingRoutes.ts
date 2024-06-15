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
.get("/:shipping_id",get_shippings_by_id)
.put("/:shipping_id",updateMany_shipping)
.patch("/:shipping_id",updateOne_shipping)
.delete("/:shipping_id",remove_shipping);


 const shipping_routes = {
    "/api/shipp": {
        get: {
            summary: "Get all shippings",
            tags: ["Product shipping"],
            description: "Get a list of all shippings.",
            responses: {
                200: {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Shipping"
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: "Create a new shipping",
            tags: ["Product shipping"],
            description: "Rent a trailer",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Shipping"
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
                                $ref: "#/components/schemas/Shipping"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/shipp/{shipping_id}": {
        get: {
            summary: "Get a shipping by ID",
            tags: ["Product shipping"],
            description: "Get a single taxi shipping by its ID.",
            parameters: [
                {
                    name: "shipping_id",
                    in: "path",
                    description: "ID of the shipping to retrieve",
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
                                $ref: "#/components/schemas/Shipping"
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Update a shipping by ID",
            tags: ["Product shipping"],
            description: "Update an existing shipping by its ID.",
            parameters: [
                {
                    name: "shipping_id",
                    in: "path",
                    description: "ID of the shipping to update",
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
                            $ref: "#/components/schemas/Shipping"
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
                                $ref: "#/components/schemas/Shipping"
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Partially update a shipping by ID",
            tags: ["Product shipping"],
            description: "Partially update an existing taxi shipping by its ID.",
            parameters: [
                {
                    name: "shipping_id",
                    in: "path",
                    description: "ID of the shipping to update",
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
                            $ref: "#/components/schemas/Shipping"
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
                                $ref: "#/components/schemas/Shipping"
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a shipping by ID",
            tags: ["Product shipping"],
            description: "Delete a shipping by its ID.",
            parameters: [
                {
                    name: "shipping_id",
                    in: "path",
                    description: "ID of the shipping to delete",
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
    }};


  export  {shippRouter,shipping_routes};
