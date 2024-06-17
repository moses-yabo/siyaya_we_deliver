"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const mongoose_1 = require("mongoose");
class UserController {
    constructor() {
        this.get_all_available_users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserSchema_1.default.find({});
                if (users.length === 0)
                    return res.status(404).json({ status: "Users Not Found!", code: 404 });
                res.status(200).json({ status: "success !!", data: users });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
        this.get_user_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                if (!(0, mongoose_1.isValidObjectId)(user_id))
                    return res.status(400).json({ status: "failed", message: "Invalid user ID" });
                const user = yield UserSchema_1.default.findById(user_id);
                if (!user)
                    return res.status(404).json({ status: "user not found", data: user });
                res.status(200).json({ status: "success", data: user });
            }
            catch (error) {
                res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
            }
        });
        this.add_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user_email = yield UserSchema_1.default.find({ email: email });
                if (user_email.length > 0)
                    return res.json({ msg: "user email has already been registered as a user" });
                const user = yield UserSchema_1.default.create(req.body);
                return res.status(201).json({ message: "Created a user", status: 201, user });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                    }
                    return res.status(500).json({ message: error.message, status: 500 });
                }
                return res.status(500).json({ message: "Failed to create a user", status: 500 });
            }
        });
        this.updateOne_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                if (!(0, mongoose_1.isValidObjectId)(user_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid user ID" });
                    return;
                }
                ;
                const user = yield UserSchema_1.default.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
                if (!user) {
                    res.status(404).json({ status: "failed", msg: "user not found!" });
                    return;
                }
                res.status(200).json({ status: "success!", data: user });
            }
            catch (error) {
                res.status(500).json({ status: "Internal server error", msg: error });
            }
        });
        this.updateMany_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                if (!(0, mongoose_1.isValidObjectId)(user_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid user ID" });
                    return;
                }
                const user = yield UserSchema_1.default.updateOne({ _id: user_id }, { $set: req.body });
                if (user.modifiedCount === 0) {
                    res.status(500).json({ status: "failed updating a document", msg: "updated booking failed ..." });
                    return;
                }
                res.status(200).json({ status: "success!" });
            }
            catch (error) {
                res.status(500).json({ status: "failed", msg: error });
            }
        });
        this.remove_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                if (!(0, mongoose_1.isValidObjectId)(user_id)) {
                    return res.status(400).json({ status: "failed", message: "Invalid user ID" });
                }
                const user = yield UserSchema_1.default.deleteOne({ _id: user_id });
                if (user.deletedCount === 0) {
                    res.status(404).json({ status: "Failed", message: "User not found" });
                    return;
                }
                res.status(204).json({ status: "success in deletion of a doc!" });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
    }
}
;
exports.userController = new UserController();
