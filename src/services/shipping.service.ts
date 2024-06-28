import {  IShippingService} from "../types/IShippingService";
import { shipping_Type} from "../types/productsTypes";
import ShippingModel from "../models/ShippingSchema";
import { AppError } from "../utils/AppErrorHandling";
export class ShippingServices implements IShippingService<shipping_Type>{

    /**
 * Retrieves all shippings from the database.
 * 
 * @async
 * @function getAllShippings
 * @returns {Promise<shipping_Type[]>} A promise that resolves to an array of shipping objects.
 * @throws {AppError} If no shippings are found.
 */
public async getAllShippings(): Promise<shipping_Type[]> {
    try {
        const shipping: shipping_Type[] = await ShippingModel.find({});
        return shipping;
    } catch (error) {
        throw new AppError("shipping not found", 404);
    }
}

/**
 * Retrieves a specific shipping by its ID.
 * 
 * @async
 * @function getShippingById
 * @param {string} shippingId - The ID of the shipping to retrieve.
 * @returns {Promise<shipping_Type>} A promise that resolves to the shipping object.
 * @throws {AppError} If the shipping is not found.
 */
public async getShippingById(shippingId: string): Promise<shipping_Type> {
    try {
        const shipping: shipping_Type | null = await ShippingModel.findById(shippingId);
        if (!shipping) {
            throw new AppError("shipping not Found", 404);
        }
        return shipping;
    } catch (error) {
        throw error;
    }
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
public async createShipping(shippingData: shipping_Type): Promise<shipping_Type> {
    try {
        const shipping: shipping_Type = await ShippingModel.create(shippingData);
        return shipping;
    } catch (error) {
        throw error;
    }
}

/**
 * Updates a specific shipping by its ID.
 * 
 * @async
 * @function updateOneShippingById
 * @param {string} shippingId - The ID of the shipping to update.
 * @param {shipping_Type} updateData - The data to update the shipping with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {AppError} If the shipping is not found.
 * @throws {Error} If any error occurs during the update process.
 */
public async updateOneShippingById(shippingId: string, updateData: shipping_Type): Promise<boolean> {
    try {
        const shippingUpdate = await ShippingModel.findByIdAndUpdate(shippingId, updateData, { new: true });
        if (!shippingUpdate) {
            throw new AppError("Shipping not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

/**
 * Updates multiple shippings by their ID.
 * 
 * @async
 * @function updateManyShippingById
 * @param {string} shippingId - The ID of the shippings to update.
 * @param {shipping_Type} updateData - The data to update the shippings with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {AppError} If the shipping is not found or no changes are made.
 * @throws {Error} If any error occurs during the update process.
 */
public async updateManyShippingById(shippingId: string, updateData: shipping_Type): Promise<boolean> {
    try {
        const shippingUpdate = await ShippingModel.updateOne({ _id: shippingId }, { $set: updateData });
        if (shippingUpdate.modifiedCount === 0) {
            throw new AppError("Shipping not found | has no changes made", 404);
        }
        return true;
    } catch (error) {
        // Proper Error Handling && Logger ?? winston
        throw error;
    }
}

/**
 * Deletes a specific shipping by its ID.
 * 
 * @async
 * @function deleteShippingById
 * @param {string} shippingId - The ID of the shipping to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
 * @throws {AppError} If the shipping is not found.
 * @throws {Error} If any error occurs during the deletion process.
 */
public async deleteShippingById(shippingId: string): Promise<boolean> {
    try {
        const shippingDelete = await ShippingModel.findByIdAndDelete(shippingId);
        if (!shippingDelete) {
            throw new AppError('shipping not found', 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}









}