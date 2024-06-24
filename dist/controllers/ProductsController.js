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
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
const product_service_1 = require("../services/product.service");
const mongoose_1 = __importDefault(require("mongoose"));
class ProductController {
    constructor() {
        this.productServices = new product_service_1.ProductServices();
        this.get_all_products = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productServices.getAllProducts();
                if (products.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Products Not Found!");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", products);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.get_product_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield this.productServices.getProductById(product_id);
                if (!product)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", product);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.create_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productServices.createProduct(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a product", product);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof CustomErrorHandling_1.CustomError) {
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
                const productUpdate = yield this.productServices.updateOneProductById(product_id, req.body);
                if (!productUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found!");
                return (0, responseMiddleware_1.sendResponse)(res, 204, "Success!", productUpdate);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateMany_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield this.productServices.updateManyProductById(product_id, req.body);
                if (!product) {
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found or no changes made");
                }
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", product);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.remove_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                const product = yield this.productServices.deleteProductById(product_id);
                if (!product)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Product not found or already deleted");
                return (0, responseMiddleware_1.sendResponse)(res, 204, "Success in deletion of the product!");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
    }
}
exports.productController = new ProductController();
