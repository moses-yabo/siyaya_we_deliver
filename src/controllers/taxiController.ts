import { RequestHandler } from "express";
import { ITaxiController } from "../types/TaxiControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { ITaxiService } from "../types/ITaxiService";
import { TaxiServices } from "../services/taxi.service"
import { CustomError } from "../utils/CustomErrorHandling";
import { Taxi } from "../types/taxiTypes";
import mongoose from "mongoose";

class TaxiController implements ITaxiController<RequestHandler>{
    private  _taxi_services:ITaxiService<Taxi> = new TaxiServices();
  public get_all_available_taxi: RequestHandler = async (req, res) => {
    try {
      const taxis: Taxi[] = await this._taxi_services.getAllTaxis();
      if (taxis.length === 0) return sendResponse(res, 404, "Taxis Not Found!");
      sendResponse(res, 200, "Success!", taxis);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_taxi_by_id: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.getTaxiById(taxi_id);
      if (!taxi) return sendResponse(res, 404, "Taxi not found");
      sendResponse(res, 200, "Success!", taxi);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public add_taxi: RequestHandler = async (req, res) => {
    
    try {
      const taxi = await this._taxi_services.createTaxi(req.body);
         
      return sendResponse(res, 201, "Created a taxi", taxi);   
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return sendResponse(res, 400, error.message);
      } 
      else if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a taxi");
      };
    }
  }

  public updateOne_taxi: RequestHandler = async (req, res): Promise<void> => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxiUpdate = await this._taxi_services.updateOneTaxiById(taxi_id,req.body);
      if (!taxiUpdate) return sendResponse(res, 404, "Taxi not found!");
      sendResponse(res, 200, "Success! Taxi updated", taxiUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_taxi: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.updateManyTaxiById(taxi_id,req.body);
      if (!taxi) return sendResponse(res, 404, "Taxi not found or no changes made");
      sendResponse(res, 200, "Success! Taxi updated");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_taxi: RequestHandler = async (req, res) => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxi = await this._taxi_services.deleteTaxiById(taxi_id);
      if (!taxi) return sendResponse(res, 404, "Taxi not found or already deleted");
      sendResponse(res, 200, "Success! Taxi deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const taxiController = new TaxiController();
