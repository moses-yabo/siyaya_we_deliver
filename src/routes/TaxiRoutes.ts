import { Router } from "express";
import { 
          get_all_available_taxi,
          get_taxi_by_id,
          add_taxi,
          updateOne_taxi,
          updateMany_taxi,
          remove_taxi
} from "../controllers/taxiController";

const taxiRouter = Router();
taxiRouter
.get("/",get_all_available_taxi)
.post("/",add_taxi)
.get("/:taxi_id",get_taxi_by_id)
.put("/:taxi_id",updateMany_taxi)
.patch("/:taxi_id",updateOne_taxi)
.delete("/:taxi_id",remove_taxi);

 
const  Taxi_routes = {
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
}






  export  {taxiRouter,Taxi_routes};
