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
const mongoose_1 = require("mongoose");
class ProductController {
    constructor() {
        this.get_all_products = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductsSchema_1.default.find({});
                if (products.length === 0)
                    return res.status(404).json({ status: "product Not Found !", code: 404 });
                res.status(200).json({ status: "success !!", data: products });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
        this.get_product_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                if (!(0, mongoose_1.isValidObjectId)(product_id))
                    return res.status(400).json({ status: "failed", message: "Invalid product ID" });
                const product = yield ProductsSchema_1.default.findById(product_id);
                if (!product)
                    return res.status(404).json({ status: "product not found" });
                res.status(200).json({ status: "success", data: product });
            }
            catch (error) {
                res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
            }
        });
        this.create_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductsSchema_1.default.create(req.body);
                return res.status(201).json({ message: "Created a productr", status: 201, data: product });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                    }
                    return res.status(500).json({ message: error.message, status: 500 });
                }
                return res.status(500).json({ message: "Failed to create a product", status: 500 });
            }
        });
        this.updateOne_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                if (!(0, mongoose_1.isValidObjectId)(product_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid product ID" });
                    return;
                }
                ;
                const productUpdate = yield ProductsSchema_1.default.findOneAndUpdate({ _id: product_id }, { $set: req.body }, { new: true });
                if (!productUpdate) {
                    res.status(404).json({ status: "failed", msg: "product not found !" });
                }
                const isUpdated = productUpdate !== null;
                if (isUpdated) {
                    res.status(204).json({ status: "success !", data: productUpdate });
                    return;
                }
                else {
                    res.status(500).json({ message: "Failed to update product" });
                }
            }
            catch (error) {
                res.status(500).json({ status: "Internal server error", msg: error });
            }
        });
        this.updateMany_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                if (!(0, mongoose_1.isValidObjectId)(product_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid product ID" });
                }
                ;
                const product = yield ProductsSchema_1.default.updateOne({ _id: product_id }, { $set: req.body });
                if (product.modifiedCount === 0) {
                    res.status(500).json({ status: "failed updating a document", msg: "updated product failed ..." });
                }
                res.status(204).json({ status: "success !" });
            }
            catch (error) {
                res.status(500).json({ status: "failed ", msg: error });
            }
        });
        this.remove_product = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.params["product_id"];
                if (!(0, mongoose_1.isValidObjectId)(product_id)) {
                    return res.status(400).json({ status: "failed", message: "Invalid product ID" });
                }
                const product = yield ProductsSchema_1.default.deleteOne({ _id: product_id });
                if (product.deletedCount === 0) {
                    res.status(404).json({ status: "Failed ", message: "product not found" });
                }
                ;
                res.status(204).json({ status: "success in deletion of traxi a doc !" });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
    }
}
exports.productController = new ProductController();
