import { sendResponse } from "../middlewares/responseMiddleware";
import { TrailerBooking } from '../types/trailerTypes';
import { RequestHandler } from "express";
import { CustomError } from "../utils/CustomErrorHandling";
import { IRentalController } from "../types/rentalControllerTypes";
import { RentalServices } from "../services/rental.service";
import { IRentalService } from "../types/IRentalService";
import mongoose from "mongoose";
class RentalController  implements IRentalController<RequestHandler>{
  
  private _rentalServices:IRentalService<TrailerBooking> = new RentalServices();
  
  public get_all_rentals: RequestHandler = async (req, res) => {
    
    try {
      const rentals: TrailerBooking[] = await this._rentalServices.getAllRentals();
      if (rentals.length === 0) return sendResponse(res, 404, "Rentals Not Found!");
      sendResponse(res, 200, "Success!", rentals);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_rental_by_id: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental:TrailerBooking | null = await this._rentalServices.getRentalById(rental_id);
      if (!rental) return sendResponse(res, 404, "Rental not found");
      sendResponse(res, 200, "Success!", rental);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_rental: RequestHandler = async (req, res) => {
    try {
      const rental = await this._rentalServices.createRental(req.body);
      return sendResponse(res, 201, "Created a rental", rental);
    } catch (error: unknown) {
      if(error instanceof mongoose.Error.ValidationError){
        return sendResponse(res, 400, error.message);
      }else if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a rental");
      }
    }
  }

  public updateOne_rental: RequestHandler = async (req, res): Promise<void> => {
    try {

      const rental_id = req.params["rental_id"];
      const rentalUpdate = await this._rentalServices.updateOneRentalById(rental_id,req.body);
      
      if (!rentalUpdate) return sendResponse(res, 404, "Rental not found!");
      return sendResponse(res, 200, "Success! Rental updated", rentalUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
       return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental = await this._rentalServices.updateManyRentalById(rental_id,req.body);

      if (!rental) return sendResponse(res, 404, "Rental not found or no changes made");
      return sendResponse(res, 200, "Success! Rental updated");
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental = await this._rentalServices.deleteRentalById(rental_id);

      if (!rental) return sendResponse(res, 404, "Rental not found or already deleted");
      return sendResponse(res, 200, "Success! Rental deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const rentalController = new RentalController();
