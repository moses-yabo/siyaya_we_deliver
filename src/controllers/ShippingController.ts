import { RequestHandler } from "express";
import shipping_model from "../models/ShippingSchema";
import { shipping_Type } from "../types/productsTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";

class ShippingController {
  public get_all_shippings: RequestHandler = async (req, res) => {
    try {
      const shippings: shipping_Type[] = await shipping_model.find({});
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
      const shipping = await shipping_model.findById(shipping_id);
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
      const shipping = await shipping_model.create(req.body);
      return sendResponse(res, 201, "Created a shipping", shipping);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, "Validation error");
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a shipping");
      }
    }
  }

  public updateOne_shipping: RequestHandler = async (req, res): Promise<void> => {
    try {
      const shipping_id = req.params["shipping_id"];
      const shippingUpdate = await shipping_model.findOneAndUpdate(
        { _id: shipping_id },
        { $set: req.body },
        { new: true }
      );

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
      const shipping = await shipping_model.updateOne({ _id: shipping_id }, { $set: req.body });

      if (shipping.modifiedCount === 0) return sendResponse(res, 404, "Shipping not found or no changes made");
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
      const user = await shipping_model.deleteOne({ _id: shipping_id });

      if (user.deletedCount === 0) return sendResponse(res, 404, "Shipping not found or already deleted");
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
