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
exports.remove_rentals = exports.updateMany_rentals = exports.updateOne_rental = exports.create_rental = exports.get_rentals_by_id = exports.get_all_rentals = void 0;
const RentalSchema_1 = __importDefault(require("../models/RentalSchema"));
const get_all_rentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentals = yield RentalSchema_1.default.find({});
        if (!rentals)
            return;
        res.status(200).json({
            status: "success",
            data: rentals
        });
    }
    catch (error) {
        if (error) {
            res.status(401).json({
                status: "failed",
                msg: error
            });
        }
    }
});
exports.get_all_rentals = get_all_rentals;
const get_rentals_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalId = req.params["rentalId"];
    try {
        const rental = yield RentalSchema_1.default.findById(rentalId);
        if (!rental)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: { rental }
        });
    }
    catch (error) {
        res
            .status(404)
            .json({
            status: "Failed",
            msg: { error }
        });
    }
});
exports.get_rentals_by_id = get_rentals_by_id;
const create_rental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRental = yield RentalSchema_1.default.create(req.body);
        if (!newRental)
            return;
        res.status(201).json({
            status: "success!",
            data: {
                newRental
            }
        });
    }
    catch (error) {
        res.status(401).json({
            status: "failed",
            msg: { error }
        });
    }
});
exports.create_rental = create_rental;
const updateOne_rental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalId = req.params["rentalId"];
    try {
        const rental = yield RentalSchema_1.default.updateOne({ _id: rentalId }, { $set: req.body });
        if (rental.upsertedCount === 0 && !rental) {
            res.status(404).json({
                status: "could'nt update the rental or rental id is not found",
            });
        }
        res.status(201).json({
            status: "success !",
            data: {
                msg: "updated shippment ...",
                rental
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateOne_rental = updateOne_rental;
const updateMany_rentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalId = req.params["rentalId"];
    try {
        const rental = yield RentalSchema_1.default.findByIdAndUpdate({ _id: rentalId }, { $set: req.body });
        if (!rental)
            return;
        res.status(201).json({
            status: "success !",
            data: {
                msg: "updated shippment ...",
                rental
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.updateMany_rentals = updateMany_rentals;
const remove_rentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalId = req.params["rentalId"];
    try {
        const rental = yield RentalSchema_1.default.findOneAndDelete({ _id: rentalId }, { $set: req.body });
        if (!rental)
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
            .status(400)
            .json({
            status: "failed 😭",
            msg: { error }
        });
    }
});
exports.remove_rentals = remove_rentals;
