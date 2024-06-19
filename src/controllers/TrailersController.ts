import { RequestHandler } from "express";
import { Trailer } from "../types/trailerTypes";
import trailerModel from "../models/TrailerSchema";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";

class TrailersController {
  public get_all_available_trailers: RequestHandler = async (req, res) => {
    try {
      const trailers: Trailer[] = await trailerModel.find({});
      if (trailers.length === 0) return sendResponse(res, 404, "Trailers Not Found!");
      sendResponse(res, 200, "Success!", trailers);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_trailer_by_id: RequestHandler = async (req, res) => {
    try {
      const trailerId = req.params["trailer_id"];
      const trailer = await trailerModel.findById(trailerId);
      if (!trailer) return sendResponse(res, 404, "Trailer not found");
      sendResponse(res, 200, "Success!", trailer);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public add_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer = await trailerModel.create(req.body);
      return sendResponse(res, 201, "Created a trailer", trailer);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, error.message);
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a trailer");
      }
    }
  }

  public updateOne_trailer: RequestHandler = async (req, res): Promise<void> => {
    try {
      const trailer_id = req.params["trailer_id"];
      const trailerUpdate = await trailerModel.findOneAndUpdate(
        { _id: trailer_id },
        { $set: req.body },
        { new: true }
      );
      if (!trailerUpdate) return sendResponse(res, 404, "Trailer not found!");
      sendResponse(res, 200, "Success! Trailer updated", trailerUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer_id = req.params["trailer_id"];
      const trailer = await trailerModel.updateOne({ _id: trailer_id }, { $set: req.body });
      if (trailer.modifiedCount === 0) return sendResponse(res, 404, "Trailer not found or no changes made");
      sendResponse(res, 200, "Success! Trailer updated");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer_id = req.params["trailer_id"];
      const trailer = await trailerModel.deleteOne({ _id: trailer_id });
      if (trailer.deletedCount === 0) return sendResponse(res, 404, "Trailer not found or already deleted");
      sendResponse(res, 200, "Success! Trailer deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const trailerController = new TrailersController();
