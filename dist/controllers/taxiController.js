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
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const TaxiSchema_1 = __importDefault(require("../models/TaxiSchema"));
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class TaxiController {
    constructor() {
        this.get_all_available_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxis = yield TaxiSchema_1.default.find({});
                if (taxis.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Taxis Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", taxis);
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
        this.get_taxi_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield TaxiSchema_1.default.findById(taxi_id);
                if (!taxi)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Taxi not found");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", taxi);
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
        this.add_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi = yield TaxiSchema_1.default.create(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a taxi", taxi);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    if (error.name === 'ValidationError') {
                        return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                    }
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a taxi");
                }
            }
        });
        this.updateOne_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxiUpdate = yield TaxiSchema_1.default.findOneAndUpdate({ _id: taxi_id }, { $set: req.body }, { new: true });
                if (!taxiUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Taxi not found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi updated", taxiUpdate);
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
        this.updateMany_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield TaxiSchema_1.default.updateOne({ _id: taxi_id }, { $set: req.body });
                if (taxi.modifiedCount === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Taxi not found or no changes made");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi updated");
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
        this.remove_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield TaxiSchema_1.default.deleteOne({ _id: taxi_id });
                if (taxi.deletedCount === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Taxi not found or already deleted");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi deleted");
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
exports.taxiController = new TaxiController();
