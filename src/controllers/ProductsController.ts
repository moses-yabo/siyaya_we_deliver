import ProductsModel from "../models/ProductsSchema";
import { RequestHandler} from "express";
import { Products} from "../types/productsTypes";
import { isValidObjectId } from "mongoose";

class ProductController {
  public  get_all_products:RequestHandler = async(req,res)=>{
    
    try {
        const products:Products[] = await ProductsModel.find({}); 
        if(products.length === 0) return res.status(404).json({status:"product Not Found !",code:404});
      
        res.status(200).json({status:"success !!",data:products});
        
      } catch (error) {
      
        res.status(500).json({status:"Internal Server Error",msg:error});
      }
    } 
  
  
  
  public get_product_by_id:RequestHandler = async (req,res) =>{
     
    try {
        const product_id  = req.params["product_id"];
        if(!isValidObjectId(product_id)) return res.status(400).json({ status: "failed", message: "Invalid product ID" });
        const product = await ProductsModel.findById(product_id);
        
        if(!product) return  res.status(404).json({status:"product not found"});
        
        res.status(200).json({status:"success",data:product});
  
      } catch (error) {
        res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
      }
    }
  
  
  public create_product:RequestHandler = async(req,res)=>{
    
    try {
  
        const product = await ProductsModel.create(req.body);
  
     return res.status(201).json({ message: "Created a productr", status: 201,data:product });
  
    } catch (error:unknown) {
  
         if (error instanceof Error) {
             if (error.name === 'ValidationError') {
                 return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
             }
             return res.status(500).json({ message: error.message, status: 500 });
  
         }    
     
  
     return res.status(500).json({ message: "Failed to create a product", status: 500 });
  }
    } 
  
  
  public updateOne_product:RequestHandler = async (req,res):Promise<void>=>{
     
    try {
        const  product_id  = req.params["product_id"];  
      
        if(!isValidObjectId(product_id)) {
          res.status(400).json({ status: "failed", message: "Invalid product ID" });
          return;
        };
      
        const productUpdate = await ProductsModel.findOneAndUpdate({_id:product_id},{$set:req.body},{new:true});
  
        if (!productUpdate) {res.status(404).json({status:"failed",msg:"product not found !"});}
        
        const isUpdated = productUpdate !== null;
        
        if (isUpdated) { 
          res.status(204).json({status:"success !",data:productUpdate});
          return;
  
        }else{
           res.status(500).json({ message: "Failed to update product" });
        }
  
        } catch (error) {
          res.status(500).json({status:"Internal server error",msg:error});
        }
    } 
  
  public updateMany_product:RequestHandler = async(req,res)=>{
  
    try {
    
        const  product_id  = req.params["product_id"];
    
        if(!isValidObjectId(product_id)) {
          res.status(400).json({ status: "failed", message: "Invalid product ID" })
        };
  
     const product = await ProductsModel.updateOne({_id:product_id},{$set:req.body});
        
     if (product.modifiedCount === 0) {
      res.status(500).json({status:"failed updating a document",msg:"updated product failed ..."});
    }
      
      res.status(204).json({status:"success !"});
  
      } catch (error) {
        res.status(500).json({status:"failed ",msg:error});
      }
    } 
  
  
  public remove_product:RequestHandler = async(req,res)=>{
  
    try {
        const  product_id  = req.params["product_id"];
        
        if (!isValidObjectId(product_id)) {
          return res.status(400).json({ status: "failed", message: "Invalid product ID" });
        }
  
        const product = await ProductsModel.deleteOne({_id:product_id});
        if(product.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"product not found"}) };
  
        res.status(204).json({status:"success in deletion of traxi a doc !"});
  
      } catch (error) {
          res.status(500).json({status:"Internal Server Error",msg:error});
        }
      
  }  
}
export const productController = new ProductController();