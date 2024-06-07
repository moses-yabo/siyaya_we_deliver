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
const userTypes_1 = require("../types/userTypes");
const userSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId
    },
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
