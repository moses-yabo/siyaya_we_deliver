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
exports.remove_product = exports.updateMany_product = exports.updateOne_product = exports.create_product = exports.get_product_by_id = exports.get_all_products = void 0;
const ProductsSchema_1 = __importDefault(require("../models/ProductsSchema"));
const get_all_products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductsSchema_1.default.find({});
        if (!products)
            return;
        res
            .status(200)
            .json({
            status: "success !!",
            data: products
        });
    }
    catch (error) {
        res
            .statusCode >= 400 ? res
            .json({
            status: "failed",
            msg: error
        })
            : Error(error);
    }
});
exports.get_all_products = get_all_products;
const get_product_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params["productId"];
        const product = yield ProductsSchema_1.default.findById(productId);
        if (!product)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: product
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "Failed",
            msg: "404 resources not found",
            error
        });
    }
});
exports.get_product_by_id = get_product_by_id;
const create_product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newproduct = yield ProductsSchema_1.default.create(req.body);
        if (!newproduct)
            return;
        res
            .status(201)
            .json({
            status: 'success',
            data: newproduct
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed",
            err: { error }
        });
        throw Error(error);
    }
});
exports.create_product = create_product;
const updateOne_product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params["productId"];
        console.log(productId);
        const product = yield ProductsSchema_1.default.updateOne({ _id: productId }, { $set: req.body });
        if (product.modifiedCount === 0) {
            console.log(product.acknowledged);
            res
                .status(500)
                .json({
                status: "failed updating a document",
                err: {
                    msg: "updated booking failed ...",
                }
            });
            return;
        }
        res
            .status(201)
            .json({
            status: "success !",
            data: {
                msg: "updated booking ...",
                data: {
                    product
                }
            }
        });
    }
    catch (error) {
        res
            .status(500)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateOne_product = updateOne_product;
const updateMany_product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params["productId"];
        const product = yield ProductsSchema_1.default.findByIdAndUpdate(productId, { $set: req.body });
        if (!product)
            return;
        res
            .status(201)
            .json({
            status: "success !",
            data: {
                msg: "updated product ...",
                product
            }
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateMany_product = updateMany_product;
const remove_product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params["productId"];
        const product = yield ProductsSchema_1.default.deleteOne({ productId }, req.body);
        if (!product)
            return;
        res
            .status(204)
            .json({
            status: "success in deletion of a doc !"
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.remove_product = remove_product;
