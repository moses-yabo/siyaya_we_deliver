import ProductsModel from "../models/ProductsSchema";
import { RequestHandler} from "express";
import { Products} from "../types/productsTypes";


  export const  get_all_products:RequestHandler = async(req,res)=>{
    
    
      try {
        const products = await ProductsModel.find({}); 
        if(!products) return;
        
        res
        .status(200)
        .json({
          status:"success !!",
          data:products
        });
        
      } catch (error) {
      
        res
        .statusCode >= 400 ? res
        .json({
          status:"failed",
          msg:error
        })
        : Error(error as string)
      }
    } 
  


export const get_product_by_id:RequestHandler = async (req,res) =>{
     
      
    try {
      const productId  = req.params["productId"];
      const product = await ProductsModel.findById(productId);
      
      if(!product) return;
      res
      .status(200)
      .json({
        status:"success",
        data:product
      });

    } catch (error) {
      res
      .status(404)
      .json({
        status:"Failed",
        msg:"404 resources not found",
        error
      });
    }
    }
  

export const create_product:RequestHandler = async(req,res)=>{
    
    
      try {
        
        const newproduct:Products = await ProductsModel.create(<Products>req.body);
        if(!newproduct) return;
        res
        .status(201)
        .json({
          status:'success',
          data:newproduct
          
        });

      } catch (error) {
        res
        .status(404)
        .json({
        status:"failed",
        err:{error}

       });
       throw Error(error as string);
       
      }
    } 
  

  export const updateOne_product:RequestHandler = async (req,res):Promise<void>=>{
     
      try {
      const  productId  = req.params["productId"];
      console.log(productId);
      
      const product = await ProductsModel.updateOne(
        {_id:productId},
        {$set:req.body});
      if (product.modifiedCount === 0) {
        console.log(product.acknowledged);
        
      res
      .status(500)
      .json({
        status:"failed updating a document",
        err:{
          msg:"updated booking failed ...",
        }
      });
        return;
      }
    
      res
      .status(201)
      .json({
        status:"success !",
        data:{
          msg:"updated booking ...",
          data:{
            product
          }
        }
      });

      } catch (error) {
        res
        .status(500)
        .json({
          status:"failed 😭",
          msg:{error}
        });
      }
    } 
  
  export const updateMany_product:RequestHandler = async(req,res)=>{

      try {
      const  productId  = req.params["productId"];
      const product = await ProductsModel.findByIdAndUpdate(productId,{$set:req.body});
      if(!product)  return ;
      res
      .status(201)
      .json({
        status:"success !",
        data:{
          msg:"updated product ...",
          product
        }
      });

      } catch (error) {
        res
        .status(404)
        .json({
          status:"failed 😭",
          msg:{error}
        });
      }

    } 
  
  
  export const remove_product:RequestHandler = async(req,res)=>{
 
  
      try {
      const  productId  = req.params["productId"];
      const product = await ProductsModel.deleteOne({productId},req.body);
      if(!product)  return ;
      res
      .status(204)
      .json({
        status:"success in deletion of a doc !"
      });

      } catch (error) {
        res
        .status(404)
        .json({
          status:"failed 😭",
          msg:{error}
        });
      }
    
  }

