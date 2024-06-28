import { RequestHandler } from "express";
import { logger } from "../utils/logger";
import { Trailer } from "../types/trailerTypes";
import { ITrailerController} from "../types/trailerControllerTypes";
import { TrailerServices } from "../services/trailer.service";
import { sendResponse } from "../middlewares/responseMiddleware";
import { AppError } from "../utils/AppErrorHandling";
import mongoose from "mongoose";
import { resourceNotFound } from "../utils/resourceNotFound";


class TrailersController  implements ITrailerController<RequestHandler>{
  private readonly TRAILER = "Trailer";
  private readonly _trailerService:TrailerServices = new TrailerServices();
  public get_all_available_trailers: RequestHandler = async (req, res) => {
    try {
      const trailers: Trailer[] = await this._trailerService.getAllTrailers();
      if (trailers.length === 0) {
        logger.error("Trailers Not Found!");
        return resourceNotFound(this.TRAILER);
      };
      logger.info("Fetched available trailers")
      sendResponse(res, 200, "Success!", trailers);
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

  public get_trailer_by_id: RequestHandler = async (req, res) => {
    try {
      const trailerId:string = req.params["trailer_id"];
      const trailer:Trailer = await this._trailerService.getTrailerById(trailerId);
      if (!trailer){
        logger.error("Trailer not found");
        return resourceNotFound(this.TRAILER);
      };
      logger.error("Fetched a Trailer");
      sendResponse(res, 200, "Success!", trailer);
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

  public add_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer = await this._trailerService.createTrailer(req.body);
      logger.info("Created a trailer");
      return sendResponse(res, 201, "Created a trailer", trailer);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.error(error.message);
        return sendResponse(res, 400, error.message);
      }
      else if (error instanceof AppError) {
        logger.error(error.message);
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
      if (!trailerUpdate) {
        logger.error("Trailer not found!");
         resourceNotFound(this.TRAILER);
      };
      logger.error("Trailer updated");
      sendResponse(res, 200, "Success! Trailer updated", trailerUpdate);
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

  public updateMany_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer_id = req.params["trailer_id"];
      const trailer:boolean = await this._trailerService.updateManyTrailerById(trailer_id,req.body);
      if (!trailer) {
        logger.error("Trailer not found or no changes made");
        return resourceNotFound(this.TRAILER);
      };
      logger.info("Trailer update")
      sendResponse(res, 200, "Success! Trailer updated");
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

  public remove_trailer: RequestHandler = async (req, res) => {
    try {
      const trailer_id = req.params["trailer_id"];
      const trailer:boolean = await this._trailerService.deleteTrailerById(trailer_id);
      if (!trailer) {
        logger.error("Trailer not found or already deleted");
        return resourceNotFound(this.TRAILER);
      };
      logger.info("Trailer deleted");
      sendResponse(res, 200, "Success! Trailer deleted");
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
}

export const trailerController = new TrailersController();
