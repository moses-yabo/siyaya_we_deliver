import mongoose from "mongoose";
import { sendResponse } from "../middlewares/responseMiddleware";
import { TrailerBooking } from '../types/trailerTypes';
import { RequestHandler } from "express";
import { AppError } from "../utils/AppErrorHandling";
import { IRentalController } from "../types/rentalControllerTypes";
import { RentalServices } from "../services/rental.service";
import { IRentalService } from "../types/IRentalService";
import { logger } from "../utils/logger";
import { resourceNotFound } from "../utils/resourceNotFound";
class RentalController  implements IRentalController<RequestHandler>{
  private readonly RENTAL = "Rental";
  private _rentalServices:IRentalService<TrailerBooking> = new RentalServices();
  
  public get_all_rentals: RequestHandler = async (req, res) => {
    
    try {
      const rentals: TrailerBooking[] = await this._rentalServices.getAllRentals();
      if (rentals.length === 0) {
        logger.error("Rentals Not Found!");
        return resourceNotFound(this.RENTAL);
      };
      logger.info("Fetched all Trailer Rentals");
      sendResponse(res, 200, "Success!", rentals);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_rental_by_id: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental:TrailerBooking | null = await this._rentalServices.getRentalById(rental_id);
      if (!rental) {
        logger.error("Rental not found");
        return resourceNotFound(this.RENTAL);
      };
      logger.info("Fetched a Rental")
      sendResponse(res, 200, "Success!", rental);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_rental: RequestHandler = async (req, res) => {
    try {
      const rental = await this._rentalServices.createRental(req.body);
      logger.info("Created a rental");
      return sendResponse(res, 201, "Created a rental", rental);
    } catch (error: unknown) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.error(error.message);
        return sendResponse(res, 400, error.message);
      }else if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Failed to create a rental");
        return sendResponse(res, 500, "Failed to create a rental");
      }
    }
  }

  public updateOne_rental: RequestHandler = async (req, res): Promise<void> => {
    try {

      const rental_id = req.params["rental_id"];
      const rentalUpdate = await this._rentalServices.updateOneRentalById(rental_id,req.body);
      
      if (!rentalUpdate) {
        logger.error("Rental not found!");
         resourceNotFound(this.RENTAL);
      };
      logger.error("Updated Trailer Rental");
      return sendResponse(res, 200, "Success! Rental updated", rentalUpdate);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
       return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental = await this._rentalServices.updateManyRentalById(rental_id,req.body);

      if (!rental){
        logger.error("Rental not found or no changes made");
        resourceNotFound(this.RENTAL);
      };
      logger.error("Updated Trailer Rental");
      return sendResponse(res, 204, "Success! Rental updated");
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental = await this._rentalServices.deleteRentalById(rental_id);

      if (!rental) {
        logger.error("Rental not found or already deleted");
        return resourceNotFound(this.RENTAL);
      };
      logger.error("Deleted a Rental");
      return sendResponse(res, 204, "Success! Rental deleted");
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const rentalController = new RentalController();
