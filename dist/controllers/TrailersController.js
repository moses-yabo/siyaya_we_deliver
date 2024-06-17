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
exports.trailerController = void 0;
const TrailerSchema_1 = __importDefault(require("../models/TrailerSchema"));
const mongoose_1 = require("mongoose");
class TrailersController {
    constructor() {
        this.get_all_available_trailers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailers = yield TrailerSchema_1.default.find({});
                if (trailers.length === 0)
                    return res.status(404).json({ status: "Users Not Found !", code: 404 });
                res.status(200).json({ status: "success !!", data: trailers });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ status: "Internal Server Error", msg: error.message });
                }
            }
        });
        this.get_trailer_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailerId = req.params["trailer_id"];
                if (!(0, mongoose_1.isValidObjectId)(trailerId))
                    return res.status(400).json({ status: "failed", message: "Invalid trailer ID" });
                const trailer = yield TrailerSchema_1.default.findById(trailerId);
                console.log(trailer);
                if (!trailer)
                    return res.status(404).json({ status: "trailer not found" });
                res.status(200).json({ status: "success", data: trailer });
            }
            catch (error) {
                res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
            }
        });
        this.add_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer = yield TrailerSchema_1.default.create(req.body);
                return res.status(201).json({ message: "Created a trailer", status: 201, data: trailer });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                    }
                    return res.status(500).json({ message: error.message, status: 500 });
                }
                return res.status(500).json({ message: "Failed to create a trailer", status: 500 });
            }
        });
        this.updateOne_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                if (!(0, mongoose_1.isValidObjectId)(trailer_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid trailer ID" });
                    return;
                }
                ;
                const trailerUpdate = yield TrailerSchema_1.default.findOneAndUpdate({ _id: trailer_id }, { $set: req.body }, { new: true });
                if (!trailerUpdate) {
                    res.status(404).json({ status: "failed", msg: "trailer not found !" });
                }
                const isUpdated = trailerUpdate !== null;
                if (isUpdated) {
                    res.status(204).json({ status: "success !", data: trailerUpdate });
                    return;
                }
                else {
                    res.status(500).json({ message: "Failed to update user" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ status: "Internal server error", msg: error.message });
                }
            }
        });
        this.updateMany_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                if (!(0, mongoose_1.isValidObjectId)(trailer_id)) {
                    res.status(400).json({ status: "failed", message: "Invalid user ID" });
                }
                ;
                const trailer = yield TrailerSchema_1.default.updateOne({ _id: trailer_id }, { $set: req.body });
                if (trailer.modifiedCount === 0) {
                    res.status(500).json({ status: "failed updating a document", msg: "updated booking failed ..." });
                }
                res.status(204).json({ status: "success !" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ status: "failed ", msg: error.message });
                }
            }
        });
        this.remove_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                if (!(0, mongoose_1.isValidObjectId)(trailer_id)) {
                    return res.status(400).json({ status: "failed", message: "Invalid trailerr ID" });
                }
                const user = yield TrailerSchema_1.default.deleteOne({ _id: trailer_id });
                if (user.deletedCount === 0) {
                    res.status(404).json({ status: "Failed ", message: "User not found" });
                }
                ;
                res.status(204).json({ status: "success in deletion of trailer a doc !" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(500).json({ status: "Internal Server Error", msg: error });
            }
        });
    }
}
exports.trailerController = new TrailersController();
