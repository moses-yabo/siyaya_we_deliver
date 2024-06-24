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
exports.rentalController = void 0;
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
const rental_service_1 = require("../services/rental.service");
const mongoose_1 = __importDefault(require("mongoose"));
class RentalController {
    constructor() {
        this._rentalServices = new rental_service_1.RentalServices();
        this.get_all_rentals = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rentals = yield this._rentalServices.getAllRentals();
                if (rentals.length === 0)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Rentals Not Found!");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", rentals);
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
        this.get_rental_by_id = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rental_id = req.params["rental_id"];
                const rental = yield this._rentalServices.getRentalById(rental_id);
                if (!rental)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Rental not found");
                (0, responseMiddleware_1.sendResponse)(res, 200, "Success!", rental);
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
        this.create_rental = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rental = yield this._rentalServices.createRental(req.body);
                return (0, responseMiddleware_1.sendResponse)(res, 201, "Created a rental", rental);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    return (0, responseMiddleware_1.sendResponse)(res, 400, error.message);
                }
                else if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Failed to create a rental");
                }
            }
        });
        this.updateOne_rental = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rental_id = req.params["rental_id"];
                const rentalUpdate = yield this._rentalServices.updateOneRentalById(rental_id, req.body);
                if (!rentalUpdate)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Rental not found!");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Rental updated", rentalUpdate);
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.updateMany_rental = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rental_id = req.params["rental_id"];
                const rental = yield this._rentalServices.updateManyRentalById(rental_id, req.body);
                if (!rental)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Rental not found or no changes made");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Rental updated");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
        this.remove_rental = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rental_id = req.params["rental_id"];
                const rental = yield this._rentalServices.deleteRentalById(rental_id);
                if (!rental)
                    return (0, responseMiddleware_1.sendResponse)(res, 404, "Rental not found or already deleted");
                return (0, responseMiddleware_1.sendResponse)(res, 200, "Success! Rental deleted");
            }
            catch (error) {
                if (error instanceof CustomErrorHandling_1.CustomError) {
                    return (0, responseMiddleware_1.sendResponse)(res, error.statusCode, error.message);
                }
                else {
                    return (0, responseMiddleware_1.sendResponse)(res, 500, "Internal Server Error");
                }
            }
        });
    }
}
exports.rentalController = new RentalController();
