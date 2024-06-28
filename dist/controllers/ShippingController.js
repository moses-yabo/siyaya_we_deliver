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
exports.shippingController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
const shipping_service_1 = require("../services/shipping.service");
const resourceNotFound_1 = require("../utils/resourceNotFound");
class ShippingController {
    constructor() {
        this.SHIPPING = "Shipping";
        this._shippingService = new shipping_service_1.ShippingServices();
        this.get_all_shippings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shippings = yield this._shippingService.getAllShippings();
                if (shippings.length === 0) {
                    logger_1.logger.error("Shippings Not Found!");
                    return (0, resourceNotFound_1.resourceNotFound)(this.SHIPPING);
                }
                ;
                logger_1.logger.info("Fetched Shippings");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", shippings);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.get_shipping_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shipping = yield this._shippingService.getShippingById(shipping_id);
                if (!shipping) {
                    logger_1.logger.error("Shipping not found");
                    return (0, resourceNotFound_1.resourceNotFound)(this.SHIPPING);
                }
                ;
                logger_1.logger.info("Fetched a Shipping");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", shipping);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.create_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping = yield this._shippingService.createShipping(req.body);
                logger_1.logger.error("Created a shipping");
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a shipping", shipping);
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
                else {
                    logger_1.logger.error("Failed to create a shipping");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a shipping");
                }
            }
        });
        this.updateOne_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shippingUpdate = yield this._shippingService.updateOneShippingById(shipping_id, req.body);
                if (!shippingUpdate) {
                    logger_1.logger.error("Shipping not found!");
                    (0, resourceNotFound_1.resourceNotFound)(this.SHIPPING);
                }
                ;
                logger_1.logger.info("Success! Shipping updated");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Shipping updated", shippingUpdate);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateMany_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shipping = yield this._shippingService.updateManyShippingById(shipping_id, req.body);
                if (!shipping) {
                    logger_1.logger.error("Shipping not found or no changes made");
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shipping not found or no changes made");
                }
                ;
                logger_1.logger.error("Shipping updated");
                (0, responseMiddleware_1.sendResponse)(res, 204, "Success! Shipping updated");
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.remove_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const user = yield this._shippingService.deleteShippingById(shipping_id);
                if (user) {
                    logger_1.logger.error("Shipping not found or already deleted");
                    return (0, resourceNotFound_1.resourceNotFound)(this.SHIPPING);
                }
                ;
                logger_1.logger.info("Shipping deleted");
                (0, responseMiddleware_1.sendResponse)(res, 204, "Success! Shipping deleted");
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
    }
}
exports.shippingController = new ShippingController();
