import { RequestHandler } from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { shipping_Type } from "../types/productsTypes";
import { IShippingController } from "../types/shippingControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { AppError } from "../utils/AppErrorHandling";
import { IShippingService } from "../types/IShippingService";
import { ShippingServices } from "../services/shipping.service";
import { resourceNotFound } from "../utils/resourceNotFound";

class ShippingController implements IShippingController<RequestHandler>{
  private readonly SHIPPING = "Shipping";
  private readonly _shippingService:IShippingService<shipping_Type> = new ShippingServices(); 
  public get_all_shippings: RequestHandler = async (req, res) => {
    try {
      const shippings: shipping_Type[] = await this._shippingService.getAllShippings();
      if (shippings.length === 0) {
        logger.error("Shippings Not Found!");
        return resourceNotFound(this.SHIPPING)
      };
      logger.info("Fetched Shippings");
      sendResponse(res, 200, "Success!", shippings);
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

  public get_shipping_by_id: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shipping = await this._shippingService.getShippingById(shipping_id);
      if (!shipping) {
        logger.error("Shipping not found");
        return resourceNotFound(this.SHIPPING);
      };
      logger.info("Fetched a Shipping");
      sendResponse(res, 200, "Success!", shipping);
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

  public create_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping = await this._shippingService.createShipping(req.body);
      logger.error("Created a shipping");
      return sendResponse(res, 201, "Created a shipping", shipping);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.error(error.message);
        return sendResponse(res, 400, error.message);
      }
      else if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Failed to create a shipping");
        return sendResponse(res, 500, "Failed to create a shipping");
      }
    }
  }

  public updateOne_shipping: RequestHandler = async (req, res): Promise<void> => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shippingUpdate = await this._shippingService.updateOneShippingById(shipping_id,req.body);

      if (!shippingUpdate) {
        logger.error("Shipping not found!");
        resourceNotFound(this.SHIPPING);
      };
      logger.info("Success! Shipping updated");
      sendResponse(res, 200, "Success! Shipping updated", shippingUpdate);
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

  public updateMany_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shipping = await this._shippingService.updateManyShippingById(shipping_id,req.body);

      if (!shipping) {
        logger.error("Shipping not found or no changes made");
        return sendResponse(res, 404, "Shipping not found or no changes made")
      };
      logger.error("Shipping updated");
      sendResponse(res, 204, "Success! Shipping updated");
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

  public remove_shipping: RequestHandler = async (req, res) => {
    try {
      const shipping_id = req.params["shipping_id"];
      const user = await this._shippingService.deleteShippingById(shipping_id);

      if (user) {
        logger.error("Shipping not found or already deleted");
        return resourceNotFound(this.SHIPPING);
      };
      logger.info("Shipping deleted");
      sendResponse(res, 204, "Success! Shipping deleted");
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
}

export const shippingController = new ShippingController();
