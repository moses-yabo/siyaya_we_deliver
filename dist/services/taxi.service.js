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
exports.TaxiServices = void 0;
const TaxiSchema_1 = __importDefault(require("../models/TaxiSchema"));
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
class TaxiServices {
    /**
   * Retrieves all taxis from the database.
   *
   * This method fetches all taxi documents from the TaxirModel collection.
   * If an error occurs during the retrieval process, a AppError is thrown.
   *
   * @async
   * @function getAllTaxis
   * @returns {Promise<Taxi[]>} A promise that resolves to an array of Trailer objects.
   * @throws {AppError} Throws an error if taxis are not found or if there is an issue with the database query.
   *
   * @example
   * // Example usage in an async function
   * try {
   *   const taxis = await TaxiModel.find({});
   *   console.log(taxis);
   * } catch (error) {
   *   console.error(error.message); // User not found
   * }
   */
    getAllTaxis() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxis = yield TaxiSchema_1.default.find({});
                return taxis;
            }
            catch (error) {
                throw new AppErrorHandling_1.AppError("taxi not found", 404);
            }
        });
    }
    /**
     * Retrieves a taxi by their ID from the database.
     *
     * This method fetches a taxi document from the TrailerModel collection by the given taxid.
     * If the taxi is not found, it throws a AppError.
     *
     * @async
     * @function getTaxiById
     * @param {string} taxiId - The ID of the taxi to retrieve.
     * @returns {Promise<Taxi>} A promise that resolves to an Taxi object.
     * @throws {AppError} Throws an error if the user is not found.
     *
     * @example
     * // Example usage in an async function
     * try {
     *   const taxi = await TaxiModel.findById('someTaxiId');
     *   console.log(user);
     * } catch (error) {
     *   console.error(error.message); // trailer not Found
     * }
     */
    getTaxiById(taxiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi = yield TaxiSchema_1.default.findById(taxiId);
                if (!taxi) {
                    throw new AppErrorHandling_1.AppError("taxi not Found", 404);
                }
                return taxi;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
  * Creates a new taxi.
  *
  * This method creates a new taxi document in the taxiModel collection based on the provided taxiData.
  *
  * @async
  * @function createTaxi
  * @param {Taxi} taxiData - The data for the taxi to create.
  * @returns {Promise<Taxi>} A promise that resolves to the newly created taxi.
  * @throws {Error} Throws a generic error if there is an issue with creating the taxi.
  *
  * @example
  * // Example usage in an async function
  * try {
  *   const newtaxi = await taxiService.createtaxi({
  *     model: 'Model X',
  *     manufacturer: 'taxi Corp',
  *     year: 2023
  *   });
  *   console.log('taxi created successfully:', newtaxi);
  * } catch (error) {
  *   console.error('Error creating taxi:', error.message);
  * }
  */
    createTaxi(taxiData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxi = yield TaxiSchema_1.default.create(taxiData);
                return taxi;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
    * Updates a taxi by its ID.
    *
    * This function updates the details of a taxi in the database based on the provided taxi ID.
    * If the taxi is not found, it throws a AppError. If the update is successful, it returns true.
    *
    * @async
    * @function updateOneTaxiById
    * @param {string} taxiId - The ID of the taxi to update.
    * @param {Taxi} updateData - The data to update the taxi with.
    * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
    * @throws {AppError} If the taxi is not found.
    * @throws {Error} If any other error occurs during the update process.
    *
    * @example
    * // Update a taxi by ID
    * updateOneTaxiById('60b6c8d5f10a4a0d4c8b4567', {
    *   model: 'Toyota Prius',
    *   year: 2021
    * }).then(success => {
    *   console.log('Taxi updated successfully:', success);
    * }).catch(error => {
    *   console.error('Error updating taxi:', error.message);
    * });
    */
    updateOneTaxiById(taxiId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxiUpdate = yield TaxiSchema_1.default.findByIdAndUpdate(taxiId, updateData, { new: true });
                if (!taxiUpdate) {
                    throw new AppErrorHandling_1.AppError("Taxi not found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Updates multiple fields of a taxi by its ID.
     *
     * This function updates multiple fields of a taxi in the database based on the provided taxi ID.
     * If the taxi is not found or if there are no changes made, it throws a AppError.
     * If the update is successful, it returns true.
     *
     * @async
     * @function updateManyTaxiById
     * @param {string} taxiId - The ID of the taxi to update.
     * @param {Taxi} updateData - The data to update the taxi with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the taxi is not found or if no changes are made.
     * @throws {Error} If any other error occurs during the update process.
     *
     * @example
     * // Update multiple fields of a taxi by ID
     * updateManyTaxiById('60b6c8d5f10a4a0d4c8b4567', {
     *   model: 'Toyota Prius',
     *   year: 2021,
     *   driver: 'John Doe'
     * }).then(success => {
     *   console.log('Taxi updated successfully:', success);
     * }).catch(error => {
     *   console.error('Error updating taxi:', error.message);
     * });
     */
    updateManyTaxiById(taxiId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxiUpdate = yield TaxiSchema_1.default.updateOne({ _id: taxiId }, { $set: updateData });
                if (taxiUpdate.modifiedCount === 0) {
                    throw new AppErrorHandling_1.AppError("taxi not found | taxi has no changes made", 404);
                }
                return true;
            }
            catch (error) {
                //Proper Error Handling && Logger ?? winston
                throw error;
            }
        });
    }
    /**
     * Deletes a taxi by its ID.
     *
     * This function deletes a taxi from the database based on the provided taxi ID.
     * If the taxi is not found, it throws a AppError. If the deletion is successful, it returns true.
     *
     * @async
     * @function deleteTaxiById
     * @param {string} taxiId - The ID of the taxi to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {AppError} If the taxi is not found.
     * @throws {Error} If any other error occurs during the deletion process.
     *
     * @example
     * // Delete a taxi by ID
     * deleteTaxiById('60b6c8d5f10a4a0d4c8b4567').then(success => {
     *   console.log('Taxi deleted successfully:', success);
     * }).catch(error => {
     *   console.error('Error deleting taxi:', error.message);
     * });
     */
    deleteTaxiById(taxiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxiDelete = yield TaxiSchema_1.default.findByIdAndDelete(taxiId);
                if (!taxiDelete) {
                    throw new AppErrorHandling_1.AppError('shipping not found', 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TaxiServices = TaxiServices;
