import {TrailerBooking } from "../types/trailerTypes";
import RentalModel from "../models/RentalSchema";
import { AppError } from "../utils/AppErrorHandling";
import { IRentalService } from "../types/IRentalService";

export class RentalServices implements IRentalService<TrailerBooking>{
   
  
    /**
     * Retrieves all rentals from the database.
     * 
     * @async
     * @function getAllRentals
     * @returns {Promise<TrailerBooking[]>} A promise that resolves to an array of rental objects.
     * @throws {AppError} If no rentals are found.
     */
    public async getAllRentals(): Promise<TrailerBooking[]> {
        try {
            const products: TrailerBooking[] = await RentalModel.find({});
            return products;
        } catch (error) {
            throw new AppError("rental not found", 404);
        }
    }

    /**
     * Retrieves a specific rental by its ID.
     * 
     * @async
     * @function getRentalById
     * @param {string} rentalId - The ID of the rental to retrieve.
     * @returns {Promise<TrailerBooking>} A promise that resolves to the rental object.
     * @throws {AppError} If the rental is not found.
     */
    public async getRentalById(rentalId: string): Promise<TrailerBooking> {
        try {
            const rental: TrailerBooking | null = await RentalModel.findById(rentalId);
            if (!rental) {
                throw new AppError("rental not Found", 404);
            }
            return rental;
        } catch (error) {
            throw error;
        }
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
    public async createRental(rentalData: TrailerBooking): Promise<TrailerBooking> {
        try {
            const rental: TrailerBooking = await RentalModel.create(rentalData);
            return rental;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a specific rental by its ID.
     * 
     * @async
     * @function updateOneRentalById
     * @param {string} rentalId - The ID of the rental to update.
     * @param {TrailerBooking} updateData - The data to update the rental with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the rental is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    public async updateOneRentalById(rentalId: string, updateData: TrailerBooking): Promise<boolean> {
        try {
            const rentalUpdate = await RentalModel.findByIdAndUpdate(rentalId, updateData, { new: true });
            if (!rentalUpdate) {
                throw new AppError("Rental not found", 404);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates multiple rentals by their ID.
     * 
     * @async
     * @function updateManyRentalById
     * @param {string} rentalId - The ID of the rentals to update.
     * @param {TrailerBooking} updateData - The data to update the rentals with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the rental is not found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    public async updateManyRentalById(rentalId: string, updateData: TrailerBooking): Promise<boolean> {
        try {
            const rentalUpdate = await RentalModel.updateOne({ _id: rentalId }, { $set: updateData });
            if (rentalUpdate.modifiedCount === 0) {
                throw new AppError("rental not found | rental has no changes made", 404);
            }
            return true;
        } catch (error) {
            // Proper Error Handling && Logger
            throw error;
        }
    }

    /**
     * Deletes a specific rental by its ID.
     * 
     * @async
     * @function deleteRentalById
     * @param {string} rentalId - The ID of the rental to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {AppError} If the rental is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    public async deleteRentalById(rentalId: string): Promise<boolean> {
        try {
            const rentalDelete = await RentalModel.findByIdAndDelete(rentalId);
            if (!rentalDelete) {
                throw new AppError('rental not found', 404);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}