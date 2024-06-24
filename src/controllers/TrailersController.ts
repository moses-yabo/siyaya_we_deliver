import { RequestHandler } from "express";
import { Trailer } from "../types/trailerTypes";
import { ITrailerController} from "../types/trailerControllerTypes";
import { TrailerServices } from "../services/trailer.service";
import trailerModel from "../models/TrailerSchema";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";
import mongoose from "mongoose";


class TrailersController  implements ITrailerController<RequestHandler>{
  private readonly _trailerService:TrailerServices = new TrailerServices();
  public get_all_available_trailers: RequestHandler = async (req, res) => {
    try {
      const trailers: Trailer[] = await this._trailerService.getAllTrailers();
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
      const trailerId:string = req.params["trailer_id"];
      const trailer:Trailer = await this._trailerService.getTrailerById(trailerId);
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
      const trailer = await this._trailerService.createTrailer(req.body);
      return sendResponse(res, 201, "Created a trailer", trailer);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        return sendResponse(res, 400, error.message);
      }
      else if (error instanceof CustomError) {
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
      const trailerUpdate = await this._trailerService.updateOneTrailerById(trailer_id,req.body);
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
      const trailer:boolean = await this._trailerService.updateManyTrailerById(trailer_id,req.body);
      if (!trailer) return sendResponse(res, 404, "Trailer not found or no changes made");
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
      const trailer:boolean = await this._trailerService.deleteTrailerById(trailer_id);
      if (!trailer) return sendResponse(res, 404, "Trailer not found or already deleted");
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
