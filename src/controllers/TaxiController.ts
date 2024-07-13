import { RequestHandler } from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { ITaxiController } from "../types/TaxiControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { ITaxiService } from "../types/ITaxiService";
import { TaxiServices } from "../services/taxi.service"
import { AppError } from "../utils/AppErrorHandling";
import { Taxi } from "../types/taxiTypes";
import { resourceNotFound } from "../utils/resourceNotFound";

class TaxiController implements ITaxiController<RequestHandler>{
  private readonly TAXI = "Taxi";
  private  _taxi_services:ITaxiService<Taxi> = new TaxiServices();
  public get_all_available_taxi: RequestHandler = async (req, res) => {
    try {
      const taxis: Taxi[] = await this._taxi_services.getAllTaxis();
      if (taxis.length === 0) {
        logger.error("Taxis Not Found!");
        resourceNotFound(this.TAXI);
      };
      logger.info("Fetched All Taxis ...")
      sendResponse(res, 200, "Success!", taxis);
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

  public get_taxi_by_id: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.getTaxiById(taxi_id);
      if (!taxi){
        logger.error("Taxi is not found");
        return resourceNotFound(this.TAXI);
      };
      logger.info("Fetched a Taxi");
      sendResponse(res, 200, "Success!", taxi);
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

  public add_taxi: RequestHandler = async (req, res) => {
    
    try {
      const taxi = await this._taxi_services.createTaxi(req.body);
         logger.info("Created a taxi");
      return sendResponse(res, 201, "Created a taxi", taxi);   
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        logger.error(error.message);
        return sendResponse(res, 400, error.message);
      } 
      else if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Failed to create a taxi");
        return sendResponse(res, 500, "Failed to create a taxi");
      };
    }
  }

  public updateOne_taxi: RequestHandler = async (req, res): Promise<void> => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxiUpdate = await this._taxi_services.updateOneTaxiById(taxi_id,req.body);
      if (!taxiUpdate) {
        logger.error("Taxi not found!");
         resourceNotFound(this.TAXI)
      };
      logger.info("Taxi updated");
      sendResponse(res, 200, "Success! Taxi updated", taxiUpdate);
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

  public updateMany_taxi: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.updateManyTaxiById(taxi_id,req.body);
      if (!taxi) {
        logger.error("Taxi not found or no changes made");
        return resourceNotFound(this.TAXI);
      };
      logger.info("Taxi updated");
      sendResponse(res, 200, "Success! Taxi updated");
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error")
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_taxi: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.deleteTaxiById(taxi_id);
      if (!taxi) {
        logger.error("Taxi not found or already deleted");
        return resourceNotFound(this.TAXI);
      };
      logger.info("Taxi deleted");
      sendResponse(res, 200, "Success! Taxi deleted");
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

export const taxiController = new TaxiController();
