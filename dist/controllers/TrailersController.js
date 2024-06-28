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
const logger_1 = require("../utils/logger");
const trailer_service_1 = require("../services/trailer.service");
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
const mongoose_1 = __importDefault(require("mongoose"));
const resourceNotFound_1 = require("../utils/resourceNotFound");
class TrailersController {
    constructor() {
        this.TRAILER = "Trailer";
        this._trailerService = new trailer_service_1.TrailerServices();
        this.get_all_available_trailers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailers = yield this._trailerService.getAllTrailers();
                if (trailers.length === 0) {
                    logger_1.logger.error("Trailers Not Found!");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TRAILER);
                }
                ;
                logger_1.logger.info("Fetched available trailers");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", trailers);
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
        this.get_trailer_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailerId = req.params["trailer_id"];
                const trailer = yield this._trailerService.getTrailerById(trailerId);
                if (!trailer) {
                    logger_1.logger.error("Trailer not found");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TRAILER);
                }
                ;
                logger_1.logger.error("Fetched a Trailer");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", trailer);
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
        this.add_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer = yield this._trailerService.createTrailer(req.body);
                logger_1.logger.info("Created a trailer");
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a trailer", trailer);
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
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a trailer");
                }
            }
        });
        this.updateOne_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailerUpdate = yield this._trailerService.updateOneTrailerById(trailer_id, req.body);
                if (!trailerUpdate) {
                    logger_1.logger.error("Trailer not found!");
                    (0, resourceNotFound_1.resourceNotFound)(this.TRAILER);
                }
                ;
                logger_1.logger.error("Trailer updated");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer updated", trailerUpdate);
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
        this.updateMany_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailer = yield this._trailerService.updateManyTrailerById(trailer_id, req.body);
                if (!trailer) {
                    logger_1.logger.error("Trailer not found or no changes made");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TRAILER);
                }
                ;
                logger_1.logger.info("Trailer update");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer updated");
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
        this.remove_trailer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const trailer_id = req.params["trailer_id"];
                const trailer = yield this._trailerService.deleteTrailerById(trailer_id);
                if (!trailer) {
                    logger_1.logger.error("Trailer not found or already deleted");
                    return (0, resourceNotFound_1.resourceNotFound)(this.TRAILER);
                }
                ;
                logger_1.logger.info("Trailer deleted");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Trailer deleted");
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
exports.trailerController = new TrailersController();
