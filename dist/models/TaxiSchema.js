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
const TaxiSchema = new mongoose_1.Schema({
    imgUrl: {
        type: mongoose_1.default.Schema.Types.Buffer,
        minlength: 3,
        maxlength: 250,
        required: [false, "Image of the taxi"]
    },
    description: {
        type: String,
        minlength: 8,
        maxlength: 250,
        required: [true, "Description is a required field"]
    },
    capacity: {
        type: String,
        required: [true, "Capacity is a required field"]
    },
    fleet_no: {
        type: String,
        minlength: 10,
        maxlength: 35,
        required: [true, "Fleet number is a required field"]
    },
    isAvailable: {
        type: Boolean,
        required: [true, "Availability status is a required field"]
    },
    isBooked: {
        type: Boolean,
        required: [true, "Booking status is a required field"]
    }
});
const taxiModel = mongoose_1.default.model("Taxi", TaxiSchema);
exports.default = taxiModel;
