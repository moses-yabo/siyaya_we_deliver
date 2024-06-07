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
exports.HireTrailersControllers = void 0;
const RentalSchema_1 = __importDefault(require("../models/RentalSchema"));
class HireTrailersControllers {
    get_all_rentals() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                if (error || res.statusCode >= 400) {
                    res.status(401).json({
                        status: "failed",
                        msg: error
                    });
                }
            }
        });
    }
    get_rentals_by_id() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { rentalId } = req.params;
                const rental = yield RentalSchema_1.default.findById(rentalId);
                if (!rental)
                    return;
                res.status(200).json({
                    status: "success",
                    data: {
                        rental
                    }
                });
            }
            catch (error) {
                res.json({
                    status: "Failed",
                    msg: error
                });
            }
        });
    }
    create_rental() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newShipping = yield RentalSchema_1.default.create(req.body);
                if (!newShipping)
                    return;
                res.status(201).json({
                    status: "success!",
                    data: {
                        newShipping
                    }
                });
            }
            catch (error) {
                res.status(401).json({
                    status: "failed",
                    msg: error
                });
            }
        });
    }
    updateOne_rental() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { rentalId } = req.params;
            try {
                const removedShipp = yield RentalSchema_1.default.findOneAndUpdate({ _id: rentalId }, { $set: req.body });
                if (!removedShipp)
                    return;
                res.status(204).json({
                    status: "success !",
                    data: {
                        msg: "removed shippment ...",
                        removedShipp
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
    }
    updateMany_rentals() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { rentalId } = req.params;
            try {
                const updatedShipp = yield RentalSchema_1.default.findByIdAndUpdate({ _id: rentalId }, { $set: req.body });
                if (!updatedShipp)
                    return;
                res.status(204).json({
                    status: "success !",
                    data: {
                        msg: "updated shippment ...",
                        updatedShipp
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
    }
    remove_rentals() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { rentalId } = req.params;
            try {
                const removedShipp = yield RentalSchema_1.default.findOneAndDelete({ _id: rentalId }, { $set: req.body });
                if (!removedShipp)
                    return;
                res.status(204).json({
                    status: "success !",
                    data: {
                        msg: "removed shippment ...",
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
    }
}
exports.HireTrailersControllers = HireTrailersControllers;
