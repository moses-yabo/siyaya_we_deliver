import { RequestHandler } from "express";
import { shipping_Type } from "../types/productsTypes";
import { IShippingController } from "../types/shippingControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";
import { IShippingService } from "../types/IShippingService";
import { ShippingServices } from "../services/shipping.service";
import mongoose from "mongoose";
class ShippingController implements IShippingController<RequestHandler>{
  private readonly _shippingService:IShippingService<shipping_Type> = new ShippingServices(); 
  public get_all_shippings: RequestHandler = async (req, res) => {
    try {
      const shippings: shipping_Type[] = await this._shippingService.getAllShippings();
      if (shippings.length === 0) return sendResponse(res, 404, "Shippings Not Found!");
      sendResponse(res, 200, "Success!", shippings);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_shipping_by_id: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shipping = await this._shippingService.getShippingById(shipping_id);
      if (!shipping) return sendResponse(res, 404, "Shipping not found");
      sendResponse(res, 200, "Success!", shipping);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping = await this._shippingService.createShipping(req.body);
      return sendResponse(res, 201, "Created a shipping", shipping);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        return sendResponse(res, 400, error.message);
      }
      else if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a shipping");
      }
    }
  }

  public updateOne_shipping: RequestHandler = async (req, res): Promise<void> => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shippingUpdate = await this._shippingService.updateOneShippingById(shipping_id,req.body);

      if (!shippingUpdate) return sendResponse(res, 404, "Shipping not found!");
      sendResponse(res, 200, "Success! Shipping updated", shippingUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shipping = await this._shippingService.updateManyShippingById(shipping_id,req.body);

      if (!shipping) return sendResponse(res, 404, "Shipping not found or no changes made");
      sendResponse(res, 200, "Success! Shipping updated");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const user = await this._shippingService.deleteShippingById(shipping_id);

      if (user) return sendResponse(res, 404, "Shipping not found or already deleted");
      sendResponse(res, 200, "Success! Shipping deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const shippingController = new ShippingController();
