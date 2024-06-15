"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookTaxiRoutes_1 = require("./../routes/bookTaxiRoutes");
const ProductsRoutes_1 = require("../routes/ProductsRoutes");
const ShippingRoutes_1 = require("../routes/ShippingRoutes");
const rentTrailerRoutes_1 = require("../routes/rentTrailerRoutes");
const TaxiRoutes_1 = require("../routes/TaxiRoutes");
const TrailersRoutes_1 = require("../routes/TrailersRoutes");
const { version } = require("../package.json");
const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Quanter Deliver API",
        version
    },
    components: {
        schemas: {
            TaxiBooking: {
                type: "object",
                properties: {
                    passengerId: {
                        type: "string",
                        description: "Reference to the booking passenger's _id"
                    },
                    driverId: {
                        type: "string",
                        description: "Reference to the booking driver's _id"
                    },
                    pickupLocation: {
                        type: "string",
                        description: "The pickup location for the booking"
                    },
                    dropoffLocation: {
                        type: "string",
                        description: "The dropoff location for the booking"
                    },
                    pickupTime: {
                        type: "string",
                        format: "date-time",
                        description: "The pickup time for the booking"
                    },
                    fare: {
                        type: "number",
                        description: "The fare amount for the booking"
                    },
                    tripType: {
                        type: "string",
                        enum: ["LOCAL_TRIP", "NATIONAL_TRIP"],
                        description: "The type of trip for the booking (local or national)"
                    }
                }
            },
            Products: {
                type: "object",
                properties: {
                    productId: {
                        type: "string",
                        description: "Reference to the product's _id"
                    },
                    name: {
                        type: "string",
                        description: "Name of the product"
                    },
                    description: {
                        type: "string",
                        description: "Description of the product"
                    },
                    price: {
                        type: "number",
                        description: "Price of the product"
                    },
                    category: {
                        type: "string",
                        description: "Category of the product"
                    }
                }
            },
            Rentals: {
                type: "object",
                properties: {
                    productId: {
                        type: "string",
                        description: "Reference to the product's _id"
                    },
                    name: {
                        type: "string",
                        description: "Name of the product"
                    },
                    description: {
                        type: "string",
                        description: "Description of the product"
                    },
                    price: {
                        type: "number",
                        description: "Price of the product"
                    },
                    category: {
                        type: "string",
                        description: "Category of the product"
                    }
                }
            },
            Shipping: {
                type: "object",
                properties: {
                    trip_type: {
                        type: "string",
                        enum: ["LOCAL_TRIP", "NATIONAL_TRIP"],
                        description: "Reference to the product's _id"
                    },
                    name: {
                        type: "string",
                        description: "Name of the product"
                    },
                    description: {
                        type: "string",
                        description: "Description of the product"
                    },
                    price: {
                        type: "number",
                        description: "Price of the product"
                    },
                    category: {
                        type: "string",
                        description: "Category of the product"
                    }
                }
            },
            Taxi: {
                type: "object",
                properties: {
                    imgUrl: {
                        type: "string",
                        oneOf: [
                            { type: "string" },
                            { type: "string", format: "binary" }
                        ],
                        minlength: 3,
                        maxlength: 250,
                        description: "Image of the taxi",
                        required: [false, "image of the taxi"]
                    },
                    description: {
                        type: "string",
                        minlength: 8,
                        maxlength: 250,
                        description: "Drop off location date is a required field",
                        required: [true, "Drop off location date is a required field"]
                    },
                    capacity: {
                        type: "string",
                        description: "Pick up time is a required field",
                        required: [true, "Pick up time is a required field"]
                    },
                    fleet_no: {
                        type: "string",
                        minlength: 10,
                        maxlength: 35,
                        description: "fare is a required field",
                        required: [true, "fare is a required field"]
                    },
                    isAvailable: {
                        type: "boolean",
                        description: "TripType is a required field",
                        required: [true, "TripType is a required field"]
                    },
                    isBooked: {
                        type: "boolean",
                        description: "TripType is a required field",
                        required: [true, "TripType is a required field"]
                    }
                }
            },
            Trailer: {
                type: "object",
                properties: {
                    imgUrl: {
                        type: "string",
                        oneOf: [
                            { type: "string" },
                            { type: "string", format: "binary" }
                        ],
                        minlength: 3,
                        maxlength: 250,
                        description: "Image of the taxi",
                        required: [false, "image of the taxi"]
                    },
                    description: {
                        type: "string",
                        minlength: 8,
                        maxlength: 250,
                        description: "Drop off location date is a required field",
                        required: [true, "Drop off location date is a required field"]
                    },
                    capacity: {
                        type: "string",
                        description: "Pick up time is a required field",
                        required: [true, "Pick up time is a required field"]
                    },
                    fleet_no: {
                        type: "string",
                        minlength: 10,
                        maxlength: 35,
                        description: "fare is a required field",
                        required: [true, "fare is a required field"]
                    },
                    isAvailable: {
                        type: "boolean",
                        description: "TripType is a required field",
                        required: [true, "TripType is a required field"]
                    },
                    isBooked: {
                        type: "boolean",
                        description: "TripType is a required field",
                        required: [true, "TripType is a required field"]
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ],
    paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, bookTaxiRoutes_1.Taxi_booking_routes), ProductsRoutes_1.Products_routes), rentTrailerRoutes_1.Rental_routes), ShippingRoutes_1.shipping_routes), TaxiRoutes_1.Taxi_routes), TrailersRoutes_1.Trailer_routes)
};
exports.default = swaggerDocumentation;
