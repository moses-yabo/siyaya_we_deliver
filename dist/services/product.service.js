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
exports.ProductServices = void 0;
const ProductsSchema_1 = __importDefault(require("../models/ProductsSchema"));
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
class ProductServices {
    /**
     * Retrieves all products from the database.
     *
     * @async
     * @function getAllProducts
     * @returns {Promise<Products[]>} A promise that resolves to an array of product objects.
     * @throws {AppError} If no products are found.
     */
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductsSchema_1.default.find({});
                return products;
            }
            catch (error) {
                throw new AppErrorHandling_1.AppError("product not found", 404);
            }
        });
    }
    /**
     * Retrieves a specific product by its ID.
     *
     * @async
     * @function getProductById
     * @param {string} productId - The ID of the product to retrieve.
     * @returns {Promise<Products>} A promise that resolves to the product object.
     * @throws {AppError} If the product is not found.
     */
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductsSchema_1.default.findById(productId);
                if (!product) {
                    throw new AppErrorHandling_1.AppError("product not Found", 404);
                }
                return product;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Creates a new product in the database.
     *
     * @async
     * @function createProduct
     * @param {Products} productData - The data of the product to create.
     * @returns {Promise<Products>} A promise that resolves to the created product object.
     * @throws {Error} If any error occurs during the creation process.
     */
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductsSchema_1.default.create(productData);
                return product;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates a specific product by its ID.
     *
     * @async
     * @function updateOneProductById
     * @param {string} productId - The ID of the product to update.
     * @param {Products} updateData - The data to update the product with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the product is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    updateOneProductById(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductsSchema_1.default.findByIdAndUpdate(productId, updateData, { new: true });
                if (!product) {
                    throw new AppErrorHandling_1.AppError("product not Found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates multiple products by their ID.
     *
     * @async
     * @function updateManyProductById
     * @param {string} productId - The ID of the products to update.
     * @param {Products} updateData - The data to update the products with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the product is not found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    updateManyProductById(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productUpdate = yield ProductsSchema_1.default.updateOne({ _id: productId }, { $set: updateData });
                if (productUpdate.modifiedCount === 0) {
                    throw new AppErrorHandling_1.AppError("Product has no changes made | Product not found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Deletes a specific product by its ID.
     *
     * @async
     * @function deleteProductById
     * @param {string} productId - The ID of the product to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {AppError} If the product is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDelete = yield ProductsSchema_1.default.findByIdAndDelete(productId);
                if (!productDelete) {
                    throw new AppErrorHandling_1.AppError('product not found', 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProductServices = ProductServices;
