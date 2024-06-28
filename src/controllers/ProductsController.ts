import mongoose from "mongoose";
import { RequestHandler } from "express";
import { logger } from "../utils/logger";
import { Products } from "../types/productsTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { AppError } from "../utils/AppErrorHandling";
import { IProductController } from "../types/productControllerTypes";
import { IProductService } from "../types/IProductService";
import { ProductServices } from "../services/product.service";
import { resourceNotFound } from "../utils/resourceNotFound";

class ProductController implements IProductController<RequestHandler>{
private productServices:IProductService<Products> = new ProductServices();
private readonly PRODUCT = "Product";

  public get_all_products: RequestHandler = async (req, res) => {
    try {
      const products: Products[] = await this.productServices.getAllProducts();
      if (products.length === 0) {
        logger.error("Products Not Found!")
        return resourceNotFound(this.PRODUCT);
      };
      logger.info("Fetched a product")
      return sendResponse(res, 200, "Success!", products);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_product_by_id: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product:Products| null = await this.productServices.getProductById(product_id);
      if (!product) {
        return resourceNotFound(this.PRODUCT);
      };
      logger.info("Fetched a Product");
      return sendResponse(res, 200, "Success!", product);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_product: RequestHandler = async (req, res) => {
    try {
      const product = await this.productServices.createProduct(req.body);
      logger.info("Created a product");
      return sendResponse(res, 201, "Created a product", product);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.error(error.message)
        return sendResponse(res, 400, error.message);
      }else if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Failed to create a product");
        return sendResponse(res, 500, "Failed to create a product");
      }
    }
  }

  public updateOne_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const productUpdate = await this.productServices.updateOneProductById(product_id,req.body);
      if (!productUpdate) {
        logger.error("Product not found!");
        return resourceNotFound(this.PRODUCT);
      };
      logger.info("updated a product")
     return sendResponse(res, 204, "Success!", productUpdate);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product = await this.productServices.updateManyProductById(product_id,req.body)
      if (!product) {
        logger.error("Product not found or no changes made")
        return resourceNotFound(this.PRODUCT);
      }
      logger.info("Updated a Product")
     return sendResponse(res, 204, "Success!", product);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product:boolean = await this.productServices.deleteProductById(product_id);
      if (!product) {
        logger.error("Product not found or already deleted");
        return resourceNotFound(this.PRODUCT);
      };
      logger.error("Success in deletion of the product!");
      return sendResponse(res, 204, "Success in deletion of the product!");
    } catch (error) {
      if (error instanceof AppError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const productController = new ProductController();
