import { Request, Response } from 'express';
import { TaxiBooking } from '../types/taxiTypes';
import { IBookingService } from './../types/IBookingService';
import bookingModel from "../models/BookingSchema";
import { AppError } from '../utils/AppErrorHandling';


export class BookingService implements IBookingService<TaxiBooking> {
    
 /**
     * Retrieves all taxi bookings from the database.
     * 
     * @async
     * @function getAllBookings
     * @returns {Promise<TaxiBooking[]>} A promise that resolves to an array of taxi booking objects.
     * @throws {AppError} If no bookings are found.
     */
 public async getAllBookings(): Promise<TaxiBooking[]> {
    const taxiBookings: TaxiBooking[] = await bookingModel.find({});
    if (taxiBookings.length === 0) throw new AppError("No Bookings Found",404);
    return taxiBookings;
}

/**
 * Retrieves a specific taxi booking by its ID.
 * 
 * @async
 * @function getBookingById
 * @param {string} bookingId - The ID of the booking to retrieve.
 * @returns {Promise<TaxiBooking>} A promise that resolves to the taxi booking object.
 * @throws {AppError} If the booking is not found.
 * @throws {Error} If any error occurs during the retrieval process.
 */
public async getBookingById(bookingId: string): Promise<TaxiBooking> {
    
        const booking: TaxiBooking | null = await bookingModel.findById(bookingId);
        if (!booking)  throw new AppError("Booking not Found !", 404);
        return booking;
}

/**
 * Creates a new taxi booking in the database.
 * 
 * @async
 * @function createBooking
 * @param {TaxiBooking} bookingData - The data of the booking to create.
 * @returns {Promise<TaxiBooking>} A promise that resolves to the created taxi booking object.
 * @throws {Error} If any error occurs during the creation process.
 */
public async createBooking(bookingData: TaxiBooking): Promise<TaxiBooking> {
   try {
    const booking: TaxiBooking = await bookingModel.create(bookingData);
    return booking;

   } catch (error:unknown) {

    if(error instanceof Error){
    if (error.name === "ValidationError") throw new AppError(`Validation error ${error.message}`,400);  
    }
    
    throw new AppError("Couldn't Create a Booking try again later",500);
   }
       
   
}

/**
 * Updates a specific taxi booking by its ID.
 * 
 * @async
 * @function updateOneBookingById
 * @param {string} bookingId - The ID of the booking to update.
 * @param {any} updateData - The data to update the booking with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {AppError} If the booking is not found.
 * @throws {Error} If any error occurs during the update process.
 */
public async updateOneBookingById(bookingId: string, updateData: any): Promise<boolean> {
        const bookingUpdate = await bookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
        if (!bookingUpdate) throw new AppError("Booking not found", 404);
        return true;
}

/**
 * Updates multiple taxi bookings by their ID.
 * 
 * @async
 * @function updateManyBookingById
 * @param {string} bookingId - The ID of the bookings to update.
 * @param {any} updateData - The data to update the bookings with.
 * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
 * @throws {AppError} If no bookings are found or no changes are made.
 * @throws {Error} If any error occurs during the update process.
 */
public async updateManyBookingById(bookingId: string, updateData: any): Promise<boolean> {
        const booking = await bookingModel.updateOne({ _id: bookingId }, { $set: updateData });
        if (booking.modifiedCount === 0) throw new AppError("Booking has no changes made | Booking is not found", 404);
        return true;
  
}

/**
 * Deletes a specific taxi booking by its ID.
 * 
 * @async
 * @function deleteBookingById
 * @param {string} bookingId - The ID of the booking to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
 * @throws {AppError} If the booking is not found.
 * @throws {Error} If any error occurs during the deletion process.
 */
public async deleteBookingById(bookingId: string): Promise<boolean> {

        const bookingDelete = await bookingModel.findByIdAndDelete(bookingId);
        if (!bookingDelete) throw new AppError('Booking not found', 404);
        return true;

}


}