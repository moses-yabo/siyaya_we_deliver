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
const TrailerSchema = new mongoose_1.default.Schema({
    imgUrl: {
        type: Object.values([mongoose_1.Schema.Types.Buffer, String]),
        minlength: 3,
        maxlength: 250,
        required: [false, "image of the taxi"]
    },
    description: {
        type: String,
        minlength: 8,
        maxlength: 250,
        required: [false, "trailer description"]
    },
    capacity: {
        type: mongoose_1.Schema.Types.String,
        required: [true, "how big or small the traiiler ex: Xsmall , Medium , Large"]
    },
    fleet_no: {
        type: String,
        minlength: 10,
        max: 35,
        required: [true, "fleet_no is required"]
    },
    isAvailable: {
        type: Boolean,
        required: [true, "Is the trailer available"]
    },
    isRented: {
        type: Boolean,
        required: [true, "is the trailer rented ?"]
    }
});
const trailerModel = mongoose_1.default.model("Trailers", TrailerSchema);
exports.default = trailerModel;
