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
const ShippingSchema_1 = __importDefault(require("../models/ShippingSchema"));
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class ShippingController {
    constructor() {
        this.get_all_shippings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shippings = yield ShippingSchema_1.default.find({});
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
                const shipping = yield ShippingSchema_1.default.findById(shipping_id);
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
                const shipping = yield ShippingSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a shipping", shipping);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    if (error.name === 'ValidationError') {
                        return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, "Validation error");
                    }
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
                const shippingUpdate = yield ShippingSchema_1.default.findOneAndUpdate({ _id: shipping_id }, { $set: req.body }, { new: true });
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
                const shipping = yield ShippingSchema_1.default.updateOne({ _id: shipping_id }, { $set: req.body });
                if (shipping.modifiedCount === 0)
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
                const user = yield ShippingSchema_1.default.deleteOne({ _id: shipping_id });
                if (user.deletedCount === 0)
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
