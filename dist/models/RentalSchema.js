"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const trailerTypes_1 = require("../types/trailerTypes");
const RentalSchema = new mongoose_1.Schema({
    startDate: {
        type: Date,
        required: [true, "Start date is a required field"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is a required field"],
    },
    totalCost: {
        type: Number,
        required: [true, "Total cost is a required field"],
    },
    tripType: {
        type: String,
        enum: Object.values(trailerTypes_1.Trailer_Hire),
        required: [true, "Trip type is a required field"],
    },
    destination: {
        type: String,
        minlength: 4,
        maxlength: 100,
        required: [true, "Destination is a required field"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is a required field"],
        min: [1, "Duration must be at least 1 day"],
    },
}, {
    timestamps: true
});
const trailerModel = (0, mongoose_1.model)("TrailerHiring", RentalSchema);
exports.default = trailerModel;
