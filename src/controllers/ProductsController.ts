import { RequestHandler } from "express";
import { Products } from "../types/productsTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";
import { IProductController } from "../types/productControllerTypes";
import { IProductService } from "../types/IProductService";
import { ProductServices } from "../services/product.service";
import mongoose from "mongoose";

class ProductController implements IProductController<RequestHandler>{
private productServices:IProductService<Products> = new ProductServices();

  public get_all_products: RequestHandler = async (req, res) => {
    try {
      const products: Products[] = await this.productServices.getAllProducts();
      if (products.length === 0) return sendResponse(res, 404, "Products Not Found!");
      return sendResponse(res, 200, "Success!", products);
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_product_by_id: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product:Products| null = await this.productServices.getProductById(product_id);
      if (!product) return sendResponse(res, 404, "Product not found");
      return sendResponse(res, 200, "Success!", product);
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_product: RequestHandler = async (req, res) => {
    try {
      const product = await this.productServices.createProduct(req.body);
      return sendResponse(res, 201, "Created a product", product);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        return sendResponse(res, 400, error.message);
      }else if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a product");
      }
    }
  }

  public updateOne_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const productUpdate = await this.productServices.updateOneProductById(product_id,req.body);
      if (!productUpdate) return sendResponse(res, 404, "Product not found!");
     return sendResponse(res, 204, "Success!", productUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
       return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product = await this.productServices.updateManyProductById(product_id,req.body)
      if (!product) {
        return sendResponse(res, 404, "Product not found or no changes made");
      }
     return sendResponse(res, 200, "Success!", product);
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_product: RequestHandler = async (req, res) => {
    try {
      const product_id = req.params["product_id"];
      const product:boolean = await this.productServices.deleteProductById(product_id);
      if (!product) return sendResponse(res, 404, "Product not found or already deleted");
      return sendResponse(res, 204, "Success in deletion of the product!");
    } catch (error) {
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const productController = new ProductController();
