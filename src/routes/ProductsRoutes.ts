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

const Products_routes = {
  "/api/product": {
    get: {
        summary: "Get all products",
        tags: ["Products"],
        description: "Get a list of all products.",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Products"
                            }
                        }
                    }
                }
            }
        }
    },
    post: {
        summary: "Create a new product",
        tags: ["Products"],
        description: "Create a Product.",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Products"
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
                            $ref: "#/components/schemas/Products"
                        }
                    }
                }
            }
        }
    }
},
"/api/product/{product_id}": {
    get: {
        summary: "Get a Product by ID",
        tags: ["Products"],
        description: "Get a single product by its ID.",
        parameters: [
            {
                name: "product_id",
                in: "path",
                description: "ID of the product to retrieve",
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
                            $ref: "#/components/schemas/Products"
                        }
                    }
                }
            }
        }
    },
    put: {
        summary: "Update a product by ID",
        tags: ["Products"],
        description: "Update an existing taxi product by its ID.",
        parameters: [
            {
                name: "product_id",
                in: "path",
                description: "ID of the product to update",
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
                        $ref: "#/components/schemas/Products"
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
                            $ref: "#/components/schemas/Products"
                        }
                    }
                }
            }
        }
    },
    patch: {
        summary: "Partially update a product by ID",
        tags: ["Products"],
        description: "Partially update an existing taxi product by its ID.",
        parameters: [
            {
                name: "product_id",
                in: "path",
                description: "ID of the product to update",
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
                        $ref: "#/components/schemas/Products"
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
                            $ref: "#/components/schemas/Products"
                        }
                    }
                }
            }
        }
    },
    delete: {
        summary: "Delete a product by ID",
        tags: ["Products"],
        description: "Delete a  product by its ID.",
        parameters: [
            {
                name: "product_id",
                in: "path",
                description: "ID of the product to delete",
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
},
}
productRouter
.get("/", get_all_products)
.post("/",create_product)
.get("/:product_id",get_product_by_id)
.put("/:product_id",updateMany_product)
.patch("/:product_d",updateOne_product)
.delete("/:product_id",remove_product);





export  {productRouter,Products_routes};
