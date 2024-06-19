import ProductsModel from "../models/ProductsSchema";
import { RequestHandler } from "express";
import { Products } from "../types/productsTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";

class ProductController {
  
  public get_all_products: RequestHandler = async (req, res) => {
    try {
      const products: Products[] = await ProductsModel.find({});
      if (products.length === 0) return sendResponse(res, 404, "Products Not Found!");
      sendResponse(res, 200, "Success!", products);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_product_by_id: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product = await ProductsModel.findById(product_id);
      if (!product) return sendResponse(res, 404, "Product not found");
      sendResponse(res, 200, "Success!", product);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_product: RequestHandler = async (req, res) => {
    try {
      const product = await ProductsModel.create(req.body);
      return sendResponse(res, 201, "Created a product", product);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, "Validation error");
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a product");
      }
    }
  }

  public updateOne_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const productUpdate = await ProductsModel.findOneAndUpdate(
        { _id: product_id },
        { $set: req.body },
        { new: true }
      );
      if (!productUpdate) return sendResponse(res, 404, "Product not found!");
      sendResponse(res, 204, "Success!", productUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product = await ProductsModel.updateOne({ _id: product_id }, { $set: req.body });
      if (product.modifiedCount === 0) {
        return sendResponse(res, 404, "Product not found or no changes made");
      }
      sendResponse(res, 200, "Success!", product);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product = await ProductsModel.deleteOne({ _id: product_id });
      if (product.deletedCount === 0) return sendResponse(res, 404, "Product not found or already deleted");
      sendResponse(res, 204, "Success in deletion of the product!");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const productController = new ProductController();
