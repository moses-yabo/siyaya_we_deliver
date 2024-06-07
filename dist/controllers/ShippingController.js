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
exports.remove_shipping = exports.updateMany_shipping = exports.updateOne_shipping = exports.create_shipping = exports.get_shippings_by_id = exports.get_all_shippings = void 0;
const ShippingSchema_1 = __importDefault(require("../models/ShippingSchema"));
const get_all_shippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ShippingSchema_1.default.find({});
        if (!products)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: products
        });
    }
    catch (error) {
        if (error || res.statusCode >= 400) {
            res
                .status(401)
                .json({
                status: "failed",
                msg: { error }
            });
        }
    }
});
exports.get_all_shippings = get_all_shippings;
const get_shippings_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippingId = req.params["shippingId"];
    try {
        const shipping = yield ShippingSchema_1.default.findById(shippingId);
        console.log(shipping);
        if (!shipping)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: shipping
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "Failed",
            msg: error
        });
    }
});
exports.get_shippings_by_id = get_shippings_by_id;
const create_shipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newShipping = yield ShippingSchema_1.default.create(req.body);
        if (!newShipping)
            return;
        res
            .status(201)
            .json({
            status: "success!",
            data: newShipping
        });
    }
    catch (error) {
        res
            .status(401)
            .json({
            status: "failed",
            msg: { error }
        });
    }
});
exports.create_shipping = create_shipping;
const updateOne_shipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shippingId = req.params["shippingId"];
        const updatedProduct = yield ShippingSchema_1.default.updateOne({ _id: shippingId }, { $set: req.body });
        if (updatedProduct.modifiedCount === 0) {
            res.status(404).json({
                status: "failed",
                msg: "Shipping not found or not updated"
            });
            return;
        }
        res
            .status(200)
            .json({
            status: "success !",
            data: updatedProduct
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "failed 😭",
            msg: "An Error Occured during an update",
            err: { error }
        });
    }
});
exports.updateOne_shipping = updateOne_shipping;
const updateMany_shipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippingId = req.params["shippingId"];
    try {
        const updatedShipp = yield ShippingSchema_1.default.findByIdAndUpdate(shippingId, req.body, {
            new: true,
            runValidators: true
        });
        if (!(updatedShipp === null || updatedShipp === void 0 ? void 0 : updatedShipp.isModified)) {
            res.status(404).json({
                status: "failed 😭",
                msg: "Shipping not found"
            });
            return;
        }
        ;
        res
            .status(200)
            .json({
            status: "success !",
            data: {
                msg: "updated shippment ...",
                updatedShipp
            }
        });
    }
    catch (error) {
        res
            .status(500)
            .json({
            status: "failed 😭",
            msg: "An Error Occured during update ",
            err: error
        });
    }
});
exports.updateMany_shipping = updateMany_shipping;
const remove_shipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippingId = req.params["shippingId"];
    try {
        const removedShipp = yield ShippingSchema_1.default.findByIdAndDelete({ _id: shippingId }, { $set: req.body });
        if (!removedShipp)
            return;
        res
            .status(204)
            .json({
            status: "success !",
            data: {
                msg: "removed shippment ...",
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
    ;
});
exports.remove_shipping = remove_shipping;
