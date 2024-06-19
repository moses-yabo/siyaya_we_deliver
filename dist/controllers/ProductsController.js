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
exports.productController = void 0;
const ProductsSchema_1 = __importDefault(require("../models/ProductsSchema"));
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class ProductController {
    constructor() {
        this.get_all_products = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductsSchema_1.default.find({});
                if (products.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Products Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", products);
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
        this.get_product_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield ProductsSchema_1.default.findById(product_id);
                if (!product)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", product);
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
        this.create_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductsSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a product", product);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    if (error.name === 'ValidationError') {
                        return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, "Validation error");
                    }
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a product");
                }
            }
        });
        this.updateOne_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const productUpdate = yield ProductsSchema_1.default.findOneAndUpdate({ _id: product_id }, { $set: req.body }, { new: true });
                if (!productUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found!");
                (0, responseMiddleware_1.sendResponse)(res, 204, "Success!", productUpdate);
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
        this.updateMany_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield ProductsSchema_1.default.updateOne({ _id: product_id }, { $set: req.body });
                if (product.modifiedCount === 0) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found or no changes made");
                }
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", product);
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
        this.remove_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield ProductsSchema_1.default.deleteOne({ _id: product_id });
                if (product.deletedCount === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found or already deleted");
                (0, responseMiddleware_1.sendResponse)(res, 204, "Success in deletion of the product!");
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
exports.productController = new ProductController();
