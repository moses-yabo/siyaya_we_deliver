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
const bookTaxiTypes_1 = require("../types/bookTaxiTypes");
const TaxiBookingSchema = new mongoose_1.default.Schema({
    passengerId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    driverId: mongoose_1.Schema.ObjectId,
    pickupLocation: {
        type: String,
        minlength: 3,
        maxlength: 250,
        required: true
    },
    dropoffLocation: {
        type: String,
        minlength: 3,
        maxlength: 250,
        required: true
    },
    pickupTime: {
        type: mongoose_1.Schema.Types.Date,
        required: true
    },
    fare: {
        type: Number,
        min: 10,
        max: 8000
    },
    tripType: {
        type: String,
        enum: Object.values(bookTaxiTypes_1.Book_Taxi)
    }
});
exports.default = mongoose_1.default.model("Bookings", TaxiBookingSchema);
