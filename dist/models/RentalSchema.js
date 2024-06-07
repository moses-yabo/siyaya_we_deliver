"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const trailerTypes_1 = require("../types/trailerTypes");
const { Date, String, Number } = mongoose_1.Schema.Types;
const RentalSchema = new mongoose_1.Schema({
    startDate: {
        type: Date,
        required: [true, "start date is a required field"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is a required field"]
    },
    totalCost: {
        type: Number,
        required: [true, "totalCost is a required field"]
    },
    tripType: {
        type: String,
        enum: Object.values(trailerTypes_1.Trailer_Hire),
        required: [true, "triptype is a requires field"]
    },
    destination: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, "destination is a requires field"]
    },
    time_stamp: {
        type: Date,
        required: [true, "time date is a requires field"]
    },
    duration: {
        type: Number,
        required: [true, "Duration date is a requires field"]
    }
});
const trailerModel = (0, mongoose_1.model)("TrailerHiring", RentalSchema);
exports.default = trailerModel;
