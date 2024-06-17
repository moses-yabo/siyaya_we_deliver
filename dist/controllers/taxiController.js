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
exports.taxiController = void 0;
const TaxiSchema_1 = __importDefault(require("../models/TaxiSchema"));
const mongoose_1 = require("mongoose");
class TaxiController {
    constructor() {
        this.get_all_available_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxis = yield TaxiSchema_1.default.find({});
                if (taxis.length === 0)
                    return res.status(404).json({ status: "Users Not Found !", code: 404 });
                res.status(200).json({ status: "success !!", data: taxis });
            }
            catch (error) {
                res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
        this.get_taxi_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["trailer_id"];
                if (!(0, mongoose_1.isValidObjectId)(taxi_id))
                    return res.status(400).json({ status: "failed", message: "Invalid Taxi ID" });
                const taxi = yield TaxiSchema_1.default.findById(taxi_id);
                if (!taxi)
                    return res.status(404).json({ status: "Taxi not found" });
                res.status(200).json({ status: "success", data: taxi });
            }
            catch (error) {
                res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
            }
        });
        this.add_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi = yield TaxiSchema_1.default.create(req.body);
                return res.status(201).json({ message: "Created a taxir", status: 201, data: taxi });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                    }
                    return res.status(500).json({ message: error.message, status: 500 });
                }
                return res.status(500).json({ message: "Failed to create a taxi", status: 500 });
            }
        });
        this.updateOne_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                if (!(0, mongoose_1.isValidObjectId)(taxi_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
                    return;
                }
                ;
                const trailerUpdate = yield TaxiSchema_1.default.findOneAndUpdate({ _id: taxi_id }, { $set: req.body }, { new: true });
                if (!trailerUpdate) {
                    res.status(404).json({ status: "failed", msg: "taxi not found !" });
                }
                const isUpdated = trailerUpdate !== null;
                if (isUpdated) {
                    res.status(204).json({ status: "success !", data: trailerUpdate });
                    return;
                }
                else {
                    res.status(500).json({ message: "Failed to update taxi" });
                }
            }
            catch (error) {
                res.status(500).json({ status: "Internal server error", msg: error });
            }
        });
        this.updateMany_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                if (!(0, mongoose_1.isValidObjectId)(taxi_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
                }
                ;
                const trailer = yield TaxiSchema_1.default.updateOne({ _id: taxi_id }, { $set: req.body });
                if (trailer.modifiedCount === 0) {
                    res.status(500).json({ status: "failed updating a document", msg: "updated booking failed ..." });
                }
                res.status(204).json({ status: "success !" });
            }
            catch (error) {
                res.status(500).json({ status: "failed ", msg: error });
            }
        });
        this.remove_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                if (!(0, mongoose_1.isValidObjectId)(taxi_id)) {
                    return res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
                }
                const user = yield TaxiSchema_1.default.deleteOne({ _id: taxi_id });
                if (user.deletedCount === 0) {
                    res.status(404).json({ status: "Failed ", message: "taxi not found" });
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
exports.taxiController = new TaxiController();
