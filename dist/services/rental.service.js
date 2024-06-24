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
exports.RentalServices = void 0;
const RentalSchema_1 = __importDefault(require("../models/RentalSchema"));
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class RentalServices {
    /**
     * Retrieves all rentals from the database.
     *
     * @async
     * @function getAllRentals
     * @returns {Promise<TrailerBooking[]>} A promise that resolves to an array of rental objects.
     * @throws {CustomError} If no rentals are found.
     */
    getAllRentals() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield RentalSchema_1.default.find({});
                return products;
            }
            catch (error) {
                throw new CustomErrorHandling_1.CustomError("rental not found", 404);
            }
        });
    }
    /**
     * Retrieves a specific rental by its ID.
     *
     * @async
     * @function getRentalById
     * @param {string} rentalId - The ID of the rental to retrieve.
     * @returns {Promise<TrailerBooking>} A promise that resolves to the rental object.
     * @throws {CustomError} If the rental is not found.
     */
    getRentalById(rentalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rental = yield RentalSchema_1.default.findById(rentalId);
                if (!rental) {
                    throw new CustomErrorHandling_1.CustomError("rental not Found", 404);
                }
                return rental;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Creates a new rental in the database.
     *
     * @async
     * @function createRental
     * @param {TrailerBooking} rentalData - The data of the rental to create.
     * @returns {Promise<TrailerBooking>} A promise that resolves to the created rental object.
     * @throws {Error} If any error occurs during the creation process.
     */
    createRental(rentalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rental = yield RentalSchema_1.default.create(rentalData);
                return rental;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates a specific rental by its ID.
     *
     * @async
     * @function updateOneRentalById
     * @param {string} rentalId - The ID of the rental to update.
     * @param {TrailerBooking} updateData - The data to update the rental with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {CustomError} If the rental is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    updateOneRentalById(rentalId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentalUpdate = yield RentalSchema_1.default.findByIdAndUpdate(rentalId, updateData, { new: true });
                if (!rentalUpdate) {
                    throw new CustomErrorHandling_1.CustomError("Rental not found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates multiple rentals by their ID.
     *
     * @async
     * @function updateManyRentalById
     * @param {string} rentalId - The ID of the rentals to update.
     * @param {TrailerBooking} updateData - The data to update the rentals with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {CustomError} If the rental is not found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    updateManyRentalById(rentalId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentalUpdate = yield RentalSchema_1.default.updateOne({ _id: rentalId }, { $set: updateData });
                if (rentalUpdate.modifiedCount === 0) {
                    throw new CustomErrorHandling_1.CustomError("rental not found | rental has no changes made", 404);
                }
                return true;
            }
            catch (error) {
                // Proper Error Handling && Logger
                throw error;
            }
        });
    }
    /**
     * Deletes a specific rental by its ID.
     *
     * @async
     * @function deleteRentalById
     * @param {string} rentalId - The ID of the rental to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {CustomError} If the rental is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    deleteRentalById(rentalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentalDelete = yield RentalSchema_1.default.findByIdAndDelete(rentalId);
                if (!rentalDelete) {
                    throw new CustomErrorHandling_1.CustomError('rental not found', 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RentalServices = RentalServices;
