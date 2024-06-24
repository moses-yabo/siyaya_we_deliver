import { ITrailerService } from "../types/ITrailerService";
import { Trailer } from "../types/trailerTypes";
import TrailerModel from "../models/TrailerSchema";
import { CustomError } from "../utils/CustomErrorHandling";
export class TrailerServices implements ITrailerService<Trailer>{

    /**
 * Retrieves all trailers from the database.
 * 
 * This method fetches all trailer documents from the TrailerModel collection. 
 * If an error occurs during the retrieval process, a CustomError is thrown.
 * 
 * @async
 * @function getAllTrailers
 * @returns {Promise<Trailer[]>} A promise that resolves to an array of Trailer objects.
 * @throws {CustomError} Throws an error if users are not found or if there is an issue with the database query.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const trailers = await TrailerModel.find({});
 *   console.log(trailers);
 * } catch (error) {
 *   console.error(error.message); // User not found
 * }
 */
   
    public async getAllTrailers(): Promise<Trailer[]> {
    try {
        const trailers:Trailer[] = await TrailerModel.find({});
        return trailers;
    } catch (error) {

        throw new CustomError("trailer not found",404);
    }
}
/**
 * Retrieves a trailerr by their ID from the database.
 * 
 * This method fetches a trailer document from the TrailerModel collection by the given userId.
 * If the user is not found, it throws a CustomError.
 * 
 * @async
 * @function getUserById
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object.
 * @throws {CustomError} Throws an error if the user is not found.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const trailer = await TaxiModel.findById('someUserId');
 *   console.log(user);
 * } catch (error) {
 *   console.error(error.message); // trailer not Found
 * }
 */

public async getTrailerById(trailerId: string): Promise<Trailer>{
   try {
    const trailer:Trailer | null = await TrailerModel.findById(trailerId);
        if (!trailer) {
            throw new CustomError("trailer not Found",404);
        }
        return trailer;
   } catch (error) {

    throw error
   }
    }
/**
 * Creates a new trailer.
 * 
 * This method creates a new trailer document in the TrailerModel collection based on the provided trailerData.
 * 
 * @async
 * @function createTrailer
 * @param {Trailer} trailerData - The data for the trailer to create.
 * @returns {Promise<Trailer>} A promise that resolves to the newly created trailer.
 * @throws {Error} Throws a generic error if there is an issue with creating the trailer.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const newTrailer = await trailerService.createTrailer({
 *     model: 'Model X',
 *     manufacturer: 'Trailer Corp',
 *     year: 2023
 *   });
 *   console.log('Trailer created successfully:', newTrailer);
 * } catch (error) {
 *   console.error('Error creating trailer:', error.message);
 * }
 */
   public async createTrailer(trailerData: Trailer): Promise<Trailer> {
    try {
        const trailer:Trailer = await TrailerModel.create(trailerData);
        return trailer;
    } catch (error) {
        throw error;
    }
    }
/**
 * Updates a trailer by its ID.
 * 
 * This function updates a trailer's data based on the provided trailer ID and update data. If the trailer
 * is not found, it throws a CustomError. If the update is successful, it returns true.
 * 
 * @async
 * @function updateOneTrailerById
 * @param {string} trailerId - The ID of the trailer to update.
 * @param {Trailer} updateData - The new data to update the trailer with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {CustomError} If the trailer is not found.
 * @throws {Error} If any other error occurs during the update process.
 * 
 * @example
 * // Update a trailer by ID
 * updateOneTrailerById('60b6c8d5f10a4a0d4c8b4567', {
 *   model: 'Updated Model',
 *   manufacturer: 'Updated Manufacturer',
 *   year: 2024
 * }).then(success => {
 *   console.log('Trailer updated successfully:', success);
 * }).catch(error => {
 *   console.error('Error updating trailer:', error.message);
 * });
 */
    public async updateOneTrailerById(trailerId: string, updateData:Trailer): Promise<boolean> {
        try {
            const trailerUpdate = await TrailerModel.findByIdAndUpdate(trailerId, updateData, { new: true });
            if (!trailerUpdate) {
                throw new CustomError("Trailer not found",404);
            }
                return true;
           } catch (error) {
            throw error
           }
    }
/**
 * Updates multiple fields of a trailer by its ID.
 * 
 * This function updates multiple fields of a trailer's data based on the provided trailer ID and update data.
 * If the trailer is not found or no changes are made, it throws a CustomError. If the update is successful,
 * it returns true.
 * 
 * @async
 * @function updateManyTrailerById
 * @param {string} trailerId - The ID of the trailer to update.
 * @param {Trailer} updateData - The new data to update the trailer with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {CustomError} If the trailer is not found or no changes are made.
 * @throws {Error} If any other error occurs during the update process.
 * 
 * @example
 * // Update multiple fields of a trailer by ID
 * updateManyTrailerById('60b6c8d5f10a4a0d4c8b4567', {
 *   model: 'Updated Model',
 *   manufacturer: 'Updated Manufacturer',
 *   year: 2024
 * }).then(success => {
 *   console.log('Trailer updated successfully:', success);
 * }).catch(error => {
 *   console.error('Error updating trailer:', error.message);
 * });
 */
    public async updateManyTrailerById(trailerId: string, updateData:Trailer): Promise<boolean> {
        try {
            const trailerUpdate = await TrailerModel.updateOne({ _id: trailerId }, { $set:updateData});
            if (trailerUpdate.modifiedCount === 0) {
                throw new CustomError("Trailer not found | Trailer has no changes made",404);
            }
            return true;
        } catch (error) {
            //Proper Error Handling && Logger ?? winston
            throw error;
        }
    }
    
/**
 * Deletes a trailer by its ID.
 * 
 * This function deletes a trailer from the database based on the provided trailer ID.
 * If the trailer is not found, it throws a CustomError. If the deletion is successful,
 * it returns true.
 * 
 * @async
 * @function deleteTrailerById
 * @param {string} trailerId - The ID of the trailer to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
 * @throws {CustomError} If the trailer is not found.
 * @throws {Error} If any other error occurs during the deletion process.
 * 
 * @example
 * // Delete a trailer by ID
 * deleteTrailerById('60b6c8d5f10a4a0d4c8b4567').then(success => {
 *   console.log('Trailer deleted successfully:', success);
 * }).catch(error => {
 *   console.error('Error deleting trailer:', error.message);
 * });
 */
    public async  deleteTrailerById(trailerId: string): Promise<boolean> {
        try {
            const trailerDelete = await TrailerModel.findByIdAndDelete(trailerId);
            if (!trailerDelete) {
              throw new CustomError('Trailer not found',404);
            }
            return true
        } catch (error) {
            throw error;
        }
    }

}