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
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
const mongoose_1 = __importDefault(require("mongoose"));
class UserController {
    constructor() {
        this.get_all_available_users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserSchema_1.default.find({});
                if (users.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Users Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success !!", users);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.get_user_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.findById(user_id);
                if (!user)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "user not found", user);
                (0, responseMiddleware_1.sendResponse)(res, 200, "success", user);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.add_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user_email = yield UserSchema_1.default.find({ email: email });
                if (user_email.length > 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 409, "user email has already been registered as a user");
                const user = yield UserSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Created a user", user);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                ;
                return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a user");
            }
        });
        this.updateOne_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
                if (!user) {
                    (0, responseMiddleware_1.sendResponse)(res, 404, "user not found!");
                    return;
                }
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", user);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.updateMany_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.updateOne({ _id: user_id }, { $set: req.body });
                if (user.modifiedCount === 0) {
                    (0, responseMiddleware_1.sendResponse)(res, 404, "User not found. Updating users failed.");
                    return;
                }
                (0, responseMiddleware_1.sendResponse)(res, 200, "success! user is updated", user);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.remove_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.deleteOne({ _id: user_id });
                if (user.deletedCount === 0) {
                    (0, responseMiddleware_1.sendResponse)(res, 404, "User not found");
                    return;
                }
                (0, responseMiddleware_1.sendResponse)(res, 204, "success in deletion of a doc!", user);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
    }
}
;
exports.userController = new UserController();
