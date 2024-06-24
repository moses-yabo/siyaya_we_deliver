"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    item_name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 250,
        required: [true, "Item name is a required field"],
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 250,
        trim: true,
        required: [true, "Description is a required field"],
    },
    price: {
        type: Number,
        required: [true, "Price is a required field"],
    },
    category: {
        type: String,
        required: [true, "Category is a required field"],
        trim: true,
    },
    inStock: {
        type: Number,
        required: [true, "InStock is a required field"],
    },
}, {
    timestamps: true
});
const ProductModel = mongoose_1.default.model("Products", ProductSchema);
exports.default = ProductModel;
