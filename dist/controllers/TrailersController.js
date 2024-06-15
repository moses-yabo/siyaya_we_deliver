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
exports.remove_trailer = exports.updateMany_trailer = exports.updateOne_trailer = exports.add_trailer = exports.get_trailer_by_id = exports.get_all_available_trailers = void 0;
const TrailerSchema_1 = __importDefault(require("../models/TrailerSchema"));
const get_all_available_trailers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trailer = yield TrailerSchema_1.default.find({});
        if (!trailer)
            return;
        res
            .status(200)
            .json({
            status: "success !!",
            data: trailer
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
exports.get_all_available_trailers = get_all_available_trailers;
const get_trailer_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trailerId = req.params["trailerId"];
        const trailer = yield TrailerSchema_1.default.findById(trailerId);
        if (!trailer)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: trailer
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
exports.get_trailer_by_id = get_trailer_by_id;
const add_trailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTrailer = yield TrailerSchema_1.default.create(req.body);
        if (!newTrailer)
            return;
        res
            .status(201)
            .json({
            status: 'success',
            data: newTrailer
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
exports.add_trailer = add_trailer;
const updateOne_trailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trailerId = req.params["trailer_id"];
        const trailer = yield TrailerSchema_1.default.updateOne({ _id: trailerId }, { $set: req.body });
        if (trailer.modifiedCount === 0) {
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
                    trailer
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
exports.updateOne_trailer = updateOne_trailer;
const updateMany_trailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["trailer_id"];
        const taxi = yield TrailerSchema_1.default.findByIdAndUpdate(taxiId, { $set: req.body });
        if (!taxi)
            return;
        res
            .status(201)
            .json({
            status: "success !",
            data: {
                msg: "updated taxi ...",
                taxi
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
exports.updateMany_trailer = updateMany_trailer;
const remove_trailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["trailer_id"];
        const taxi = yield TrailerSchema_1.default.deleteOne({ _id: taxiId }, req.body);
        if (!taxi)
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
exports.remove_trailer = remove_trailer;
