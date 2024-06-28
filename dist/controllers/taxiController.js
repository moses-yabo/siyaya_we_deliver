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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const taxi_service_1 = require("../services/taxi.service");
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
const resourceNotFound_1 = require("../utils/resourceNotFound");
class TaxiController {
    constructor() {
        this.TAXI = "Taxi";
        this._taxi_services = new taxi_service_1.TaxiServices();
        this.get_all_available_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxis = yield this._taxi_services.getAllTaxis();
                if (taxis.length === 0) {
                    logger_1.logger.error("Taxis Not Found!");
                    (0, resourceNotFound_1.resourceNotFound)(this.TAXI);
                }
                ;
                logger_1.logger.info("Fetched All Taxis ...");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", taxis);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.get_taxi_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield this._taxi_services.getTaxiById(taxi_id);
                if (!taxi) {
                    logger_1.logger.error("Taxi is not found");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TAXI);
                }
                ;
                logger_1.logger.info("Fetched a Taxi");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", taxi);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.add_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi = yield this._taxi_services.createTaxi(req.body);
                logger_1.logger.info("Created a taxi");
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a taxi", taxi);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Failed to create a taxi");
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a taxi");
                }
                ;
            }
        });
        this.updateOne_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxiUpdate = yield this._taxi_services.updateOneTaxiById(taxi_id, req.body);
                if (!taxiUpdate) {
                    logger_1.logger.error("Taxi not found!");
                    (0, resourceNotFound_1.resourceNotFound)(this.TAXI);
                }
                ;
                logger_1.logger.info("Taxi updated");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi updated", taxiUpdate);
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateMany_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield this._taxi_services.updateManyTaxiById(taxi_id, req.body);
                if (!taxi) {
                    logger_1.logger.error("Taxi not found or no changes made");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TAXI);
                }
                ;
                logger_1.logger.info("Taxi updated");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi updated");
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.remove_taxi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi_id = req.params["taxi_id"];
                const taxi = yield this._taxi_services.deleteTaxiById(taxi_id);
                if (!taxi) {
                    logger_1.logger.error("Taxi not found or already deleted");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TAXI);
                }
                ;
                logger_1.logger.info("Taxi deleted");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Taxi deleted");
            }
            catch (error) {
                if (error instanceof AppErrorHandling_1.AppError) {
                    logger_1.logger.error(error.message);
                    (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    logger_1.logger.error("Internal Server Error");
                    (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
    }
}
exports.taxiController = new TaxiController();
