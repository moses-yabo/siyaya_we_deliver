"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userTypes_1 = require("../types/userTypes");
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 22
    },
    lastName: {
        type: String,
        required: [true, "Last name is Required "],
        minlength: 3,
        maxlength: 22
    },
    user_name: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required !"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: [8, "minimum is 8 characters"],
        maxlength: [250, "maximum is 250 characters"],
        required: [true, "password is a required field"]
    },
    role: {
        type: String,
        enum: Object.values(userTypes_1.User_roles),
        default: userTypes_1.User_roles.ADMIN
    }
});
const userModel = mongoose_1.default.model("Users", userSchema);
exports.default = userModel;
