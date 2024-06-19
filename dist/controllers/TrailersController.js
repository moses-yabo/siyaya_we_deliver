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
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class TrailersController {
    constructor() {
        this.get_all_available_trailers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailers = yield TrailerSchema_1.default.find({});
                if (trailers.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Trailers Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", trailers);
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
        this.get_trailer_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailerId = req.params["trailer_id"];
                const trailer = yield TrailerSchema_1.default.findById(trailerId);
                if (!trailer)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Trailer not found");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", trailer);
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
        this.add_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer = yield TrailerSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a trailer", trailer);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    if (error.name === 'ValidationError') {
                        return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                    }
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a trailer");
                }
            }
        });
        this.updateOne_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailerUpdate = yield TrailerSchema_1.default.findOneAndUpdate({ _id: trailer_id }, { $set: req.body }, { new: true });
                if (!trailerUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Trailer not found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer updated", trailerUpdate);
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
        this.updateMany_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailer = yield TrailerSchema_1.default.updateOne({ _id: trailer_id }, { $set: req.body });
                if (trailer.modifiedCount === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Trailer not found or no changes made");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer updated");
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
        this.remove_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailer = yield TrailerSchema_1.default.deleteOne({ _id: trailer_id });
                if (trailer.deletedCount === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Trailer not found or already deleted");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer deleted");
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
exports.trailerController = new TrailersController();
