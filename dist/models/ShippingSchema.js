"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productsTypes_1 = require("../types/productsTypes");
const TrailerHiringSchema = new mongoose_1.default.Schema({
    trip_type: {
        type: String,
        enum: Object.values(productsTypes_1.Product_shipping),
        required: [true, "TripType is a required field"]
    },
    fleet: {
        type: String,
        minlength: 4,
        maxlength: 24,
        required: [true, "Fleet is a required field"]
    },
    taxi_driver: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Taxi driver is a required field"]
    },
    taxi_owner: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Taxi owner is a required field"]
    },
    departure: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Departure is a required field"]
    },
    destination: {
        type: String,
        minlength: 5,
        maxlength: 16,
        required: [true, "Destination is a required field"]
    },
    time_stamp: {
        type: mongoose_1.Schema.Types.Date,
        required: [true, "Time stamp is a required field"]
    }
});
const shippingModel = mongoose_1.default.model("Shipping", TrailerHiringSchema);
exports.default = (shippingModel);
