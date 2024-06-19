import { RequestHandler } from "express";
import { Taxi } from "../types/taxiTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import taxiModel from "../models/TaxiSchema";
import { CustomError } from "../utils/CustomErrorHandling";

class TaxiController {
  public get_all_available_taxi: RequestHandler = async (req, res) => {
    try {
      const taxis: Taxi[] = await taxiModel.find({});
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
      const taxi = await taxiModel.findById(taxi_id);
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
      const taxi = await taxiModel.create(req.body);
      return sendResponse(res, 201, "Created a taxi", taxi);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, error.message);
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a taxi");
      }
    }
  }

  public updateOne_taxi: RequestHandler = async (req, res): Promise<void> => {
    try {
      const taxi_id = req.params["taxi_id"];
      const taxiUpdate = await taxiModel.findOneAndUpdate(
        { _id: taxi_id },
        { $set: req.body },
        { new: true }
      );
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
      const taxi = await taxiModel.updateOne({ _id: taxi_id }, { $set: req.body });
      if (taxi.modifiedCount === 0) return sendResponse(res, 404, "Taxi not found or no changes made");
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
      const taxi = await taxiModel.deleteOne({ _id: taxi_id });
      if (taxi.deletedCount === 0) return sendResponse(res, 404, "Taxi not found or already deleted");
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
