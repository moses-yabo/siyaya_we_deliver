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
const hireTrailerTypes_1 = require("../types/hireTrailerTypes");
const TrailerHiringSchema = new mongoose_1.default.Schema({
    startDate: {
        type: mongoose_1.Schema.Types.Date,
        required: [true, "start date is a required field"]
    },
    endDate: {
        type: mongoose_1.Schema.Types.Date,
        required: [true, "End date is a required field"]
    },
    totalCost: {
        type: mongoose_1.Schema.Types.Number,
        required: [true, "totalCost is a required field"]
    },
    tripType: {
        type: String,
        enum: Object.values(hireTrailerTypes_1.Trailer_Hire),
        required: [true, "triptype is a requires field"]
    },
    destination: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, "destination is a requires field"]
    },
    time_stamp: {
        type: mongoose_1.Schema.Types.Date,
        required: [true, "time date is a requires field"]
    },
    duration: {
        type: Number,
        required: [true, "Duration date is a requires field"]
    }
});
const trailerModel = mongoose_1.default.model("TrailerHiring", TrailerHiringSchema);
exports.default = trailerModel;
