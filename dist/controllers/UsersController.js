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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const user_service_1 = require("../services/user.service");
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
const resourceNotFound_1 = require("../utils/resourceNotFound");
class UserController {
    constructor() {
        this._userServices = new user_service_1.UserServices();
        this.USERS = "Users";
        this.get_all_available_users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._userServices.getAllUsers();
                if (users.length === 0) {
                    logger_1.logger.error("Users Not Found!");
                    return (0, resourceNotFound_1.resourceNotFound)(this.USERS);
                }
                ;
                logger_1.logger.info("Fetched users");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success !!", users);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.get_user_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.findById(user_id);
                if (!user) {
                    logger_1.logger.error("user not found");
                    return (0, resourceNotFound_1.resourceNotFound)(this.USERS);
                }
                ;
                logger_1.logger.info("Fetched a user");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success", user);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.add_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user_email = yield UserSchema_1.default.find({ email: email });
                if (user_email.length > 0) {
                    logger_1.logger.error("user email has already been registered as a user");
                    return (0, responseMiddleware_1.sendResponse)(res, 409, "user email has already been registered as a user");
                }
                ;
                const user = yield UserSchema_1.default.create(req.body);
                logger_1.logger.info("Created a user");
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a user", user);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                ;
                logger_1.logger.error("Failed to create a user");
                return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a user");
            }
        });
        this.updateOne_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
                if (!user) {
                    logger_1.logger.error("user not found!");
                    (0, resourceNotFound_1.resourceNotFound)(this.USERS);
                    return;
                }
                logger_1.logger.info("Update a user");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", user);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.updateMany_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.updateOne({ _id: user_id }, { $set: req.body });
                if (user.modifiedCount === 0) {
                    logger_1.logger.error("User not found. Updating users failed.");
                    (0, resourceNotFound_1.resourceNotFound)(this.USERS);
                    return;
                }
                logger_1.logger.info("Updated a user");
                (0, responseMiddleware_1.sendResponse)(res, 200, "success! user is updated", user);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
        this.remove_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params["user_id"];
                const user = yield UserSchema_1.default.deleteOne({ _id: user_id });
                if (user.deletedCount === 0) {
                    logger_1.logger.error("User not found");
                    (0, resourceNotFound_1.resourceNotFound)(this.USERS);
                    return;
                }
                logger_1.logger.info("success in deletion of a user doc!");
                (0, responseMiddleware_1.sendResponse)(res, 204, "success in deletion of a user doc!", user);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
            }
        });
    }
}
;
exports.userController = new UserController();
