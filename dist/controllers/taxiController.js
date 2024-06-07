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
exports.remove_taxi = exports.updateMany_taxi = exports.updateOne_taxi = exports.add_taxi = exports.get_taxi_by_id = exports.get_all_available_taxi = void 0;
const TaxiSchema_1 = __importDefault(require("../models/TaxiSchema"));
const TaxiSchema_2 = __importDefault(require("../models/TaxiSchema"));
const get_all_available_taxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxi = yield TaxiSchema_1.default.find({});
        if (!taxi)
            return;
        res
            .status(200)
            .json({
            status: "success !!",
            data: taxi
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
exports.get_all_available_taxi = get_all_available_taxi;
const get_taxi_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["taxiId"];
        const taxi = yield TaxiSchema_1.default.findById(taxiId);
        if (!taxi)
            return;
        res
            .status(200)
            .json({
            status: "success",
            data: taxi
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
exports.get_taxi_by_id = get_taxi_by_id;
const add_taxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTaxi = yield TaxiSchema_1.default.create(req.body);
        if (!newTaxi)
            return;
        res
            .status(201)
            .json({
            status: 'success',
            data: newTaxi
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
exports.add_taxi = add_taxi;
const updateOne_taxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["taxiId"];
        const taxi = yield TaxiSchema_1.default.updateOne({ _id: taxiId }, { $set: req.body });
        if (taxi.modifiedCount === 0) {
            console.log(taxi.acknowledged);
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
                    taxi
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
exports.updateOne_taxi = updateOne_taxi;
const updateMany_taxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["taxiId"];
        const taxi = yield TaxiSchema_2.default.findByIdAndUpdate(taxiId, { $set: req.body });
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
exports.updateMany_taxi = updateMany_taxi;
const remove_taxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.params["taxiId"];
        const taxi = yield TaxiSchema_2.default.deleteOne({ _id: taxiId }, req.body);
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
exports.remove_taxi = remove_taxi;
