import { sendResponse } from "../middlewares/responseMiddleware";
import trailerModel from "../models/RentalSchema";
import { TrailerBooking } from '../types/trailerTypes';
import { RequestHandler } from "express";
import { CustomError } from "../utils/CustomErrorHandling";

class RentalController {
  
  public get_all_rentals: RequestHandler = async (req, res) => {
    try {
      const rentals: TrailerBooking[] = await trailerModel.find({});
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
      const rental = await trailerModel.findById(rental_id);
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
      const rental = await trailerModel.create(req.body);
      return sendResponse(res, 201, "Created a rental", rental);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, "Validation error");
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a rental");
      }
    }
  }

  public updateOne_rental: RequestHandler = async (req, res): Promise<void> => {
    try {
      const rental_id = req.params["rental_id"];
      const trailerUpdate = await trailerModel.findOneAndUpdate(
        { _id: rental_id },
        { $set: req.body },
        { new: true }
      );

      if (!trailerUpdate) return sendResponse(res, 404, "Rental not found!");
      sendResponse(res, 200, "Success! Rental updated", trailerUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const trailer = await trailerModel.updateOne({ _id: rental_id }, { $set: req.body });

      if (trailer.modifiedCount === 0) return sendResponse(res, 404, "Rental not found or no changes made");
      sendResponse(res, 200, "Success! Rental updated");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_rental: RequestHandler = async (req, res) => {
    try {
      const rental_id = req.params["rental_id"];
      const rental = await trailerModel.deleteOne({ _id: rental_id });

      if (rental.deletedCount === 0) return sendResponse(res, 404, "Rental not found or already deleted");
      sendResponse(res, 200, "Success! Rental deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const rentalController = new RentalController();
