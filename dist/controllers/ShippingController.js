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
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
const shipping_service_1 = require("../services/shipping.service");
const mongoose_1 = __importDefault(require("mongoose"));
class ShippingController {
    constructor() {
        this._shippingService = new shipping_service_1.ShippingServices();
        this.get_all_shippings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shippings = yield this._shippingService.getAllShippings();
                if (shippings.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shippings Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", shippings);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.get_shipping_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shipping = yield this._shippingService.getShippingById(shipping_id);
                if (!shipping)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shipping not found");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", shipping);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.create_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping = yield this._shippingService.createShipping(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a shipping", shipping);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a shipping");
                }
            }
        });
        this.updateOne_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shippingUpdate = yield this._shippingService.updateOneShippingById(shipping_id, req.body);
                if (!shippingUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shipping not found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Shipping updated", shippingUpdate);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateMany_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const shipping = yield this._shippingService.updateManyShippingById(shipping_id, req.body);
                if (!shipping)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shipping not found or no changes made");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Shipping updated");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.remove_shipping = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping_id = req.params["shipping_id"];
                const user = yield this._shippingService.deleteShippingById(shipping_id);
                if (user)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Shipping not found or already deleted");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Shipping deleted");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
    }
}
exports.shippingController = new ShippingController();
