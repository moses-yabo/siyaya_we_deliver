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
exports.ShippingServices = void 0;
const ShippingSchema_1 = __importDefault(require("../models/ShippingSchema"));
const CustomErrorHandling_1 = require("../utils/CustomErrorHandling");
class ShippingServices {
    /**
 * Retrieves all shippings from the database.
 *
 * @async
 * @function getAllShippings
 * @returns {Promise<shipping_Type[]>} A promise that resolves to an array of shipping objects.
 * @throws {CustomError} If no shippings are found.
 */
    getAllShippings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping = yield ShippingSchema_1.default.find({});
                return shipping;
            }
            catch (error) {
                throw new CustomErrorHandling_1.CustomError("shipping not found", 404);
            }
        });
    }
    /**
     * Retrieves a specific shipping by its ID.
     *
     * @async
     * @function getShippingById
     * @param {string} shippingId - The ID of the shipping to retrieve.
     * @returns {Promise<shipping_Type>} A promise that resolves to the shipping object.
     * @throws {CustomError} If the shipping is not found.
     */
    getShippingById(shippingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping = yield ShippingSchema_1.default.findById(shippingId);
                if (!shipping) {
                    throw new CustomErrorHandling_1.CustomError("shipping not Found", 404);
                }
                return shipping;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Creates a new shipping in the database.
     *
     * @async
     * @function createShipping
     * @param {shipping_Type} shippingData - The data of the shipping to create.
     * @returns {Promise<shipping_Type>} A promise that resolves to the created shipping object.
     * @throws {Error} If any error occurs during the creation process.
     */
    createShipping(shippingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shipping = yield ShippingSchema_1.default.create(shippingData);
                return shipping;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates a specific shipping by its ID.
     *
     * @async
     * @function updateOneShippingById
     * @param {string} shippingId - The ID of the shipping to update.
     * @param {shipping_Type} updateData - The data to update the shipping with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {CustomError} If the shipping is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    updateOneShippingById(shippingId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shippingUpdate = yield ShippingSchema_1.default.findByIdAndUpdate(shippingId, updateData, { new: true });
                if (!shippingUpdate) {
                    throw new CustomErrorHandling_1.CustomError("Shipping not found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates multiple shippings by their ID.
     *
     * @async
     * @function updateManyShippingById
     * @param {string} shippingId - The ID of the shippings to update.
     * @param {shipping_Type} updateData - The data to update the shippings with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {CustomError} If the shipping is not found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    updateManyShippingById(shippingId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shippingUpdate = yield ShippingSchema_1.default.updateOne({ _id: shippingId }, { $set: updateData });
                if (shippingUpdate.modifiedCount === 0) {
                    throw new CustomErrorHandling_1.CustomError("Shipping not found | has no changes made", 404);
                }
                return true;
            }
            catch (error) {
                // Proper Error Handling && Logger ?? winston
                throw error;
            }
        });
    }
    /**
     * Deletes a specific shipping by its ID.
     *
     * @async
     * @function deleteShippingById
     * @param {string} shippingId - The ID of the shipping to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {CustomError} If the shipping is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    deleteShippingById(shippingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shippingDelete = yield ShippingSchema_1.default.findByIdAndDelete(shippingId);
                if (!shippingDelete) {
                    throw new CustomErrorHandling_1.CustomError('shipping not found', 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ShippingServices = ShippingServices;
