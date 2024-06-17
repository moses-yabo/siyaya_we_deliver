import {RequestHandler } from "express";
import shipping_model from "../models/ShippingSchema";
import { shipping_Type } from "../types/productsTypes";
import { isValidObjectId } from "mongoose";
class ShippingController {
  public  get_all_shippings:RequestHandler = async(req,res)=>{
    
    try {
        const shippings:shipping_Type[] = await shipping_model.find({}); 
        if(shippings.length === 0) return res.status(404).json({status:"shipping Not Found !",code:404});
      
        res.status(200).json({status:"success !!",data:shippings});
        
      } catch (error) {
      
        res.status(500).json({status:"Internal Server Error",msg:error});
      }
    } 
  
  
  
  public get_shipping_by_id:RequestHandler = async (req,res) =>{
     
    try {
        const shipping_id  = req.params["shipping_id"];
        if(!isValidObjectId(shipping_id)) return res.status(400).json({ status: "failed", message: "Invalid shipping ID" });
        const shipping = await shipping_model.findById(shipping_id);
        
        if(!shipping) return  res.status(404).json({status:"shipping not found"});
        
        res.status(200).json({status:"success",data:shipping});
  
      } catch (error) {
        res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
      }
    }
  
  
  public create_shipping:RequestHandler = async(req,res)=>{
    
    try {
  
        const shipping = await shipping_model.create(req.body);
  
     return res.status(201).json({ message: "Created a shippingr", status: 201,data:shipping });
  
    } catch (error:unknown) {
  
         if (error instanceof Error) {
             if (error.name === 'ValidationError') {
                 return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
             }
             return res.status(500).json({ message: error.message, status: 500 });
  
         }    
     
  
     return res.status(500).json({ message: "Failed to create a shipping", status: 500 });
  }
    } 
  
  
  public updateOne_shipping:RequestHandler = async (req,res):Promise<void>=>{
     
    try {
        const  shipping_id  = req.params["shipping_id"];  
      
        if(!isValidObjectId(shipping_id)) {
          res.status(400).json({ status: "failed", message: "Invalid shipping ID" });
          return;
        };
      
        const trailerUpdate = await shipping_model.findOneAndUpdate({_id:shipping_id},{$set:req.body},{new:true});
  
        if (!trailerUpdate) {res.status(404).json({status:"failed",msg:"shipping not found !"});}
        
        const isUpdated = trailerUpdate !== null;
        
        if (isUpdated) { 
          res.status(204).json({status:"success !",data:trailerUpdate});
          return;
  
        }else{
           res.status(500).json({ message: "Failed to update shipping" });
        }
  
        } catch (error) {
          res.status(500).json({status:"Internal server error",msg:error});
        }
    } 
  
  public updateMany_shipping:RequestHandler = async(req,res)=>{
  
    try {
    
        const  shipping_id  = req.params["shipping_id"];
    
        if(!isValidObjectId(shipping_id)) {
          res.status(400).json({ status: "failed", message: "Invalid shipping ID" })
        };
  
     const trailer = await shipping_model.updateOne({_id:shipping_id},{$set:req.body});
        
     if (trailer.modifiedCount === 0) {
      res.status(500).json({status:"failed updating a document",msg:"updated booking failed ..."});
    }
      
      res.status(204).json({status:"success !"});
  
      } catch (error) {
        res.status(500).json({status:"failed ",msg:error});
      }
    } 
  
  
  public remove_shipping:RequestHandler = async(req,res)=>{
  
    try {
        const  taxi_id  = req.params["taxi_id"];
        
        if (!isValidObjectId(taxi_id)) {
          return res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
        }
  
        const user = await shipping_model.deleteOne({_id:taxi_id});
        if(user.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"shipping not found"}) };
  
        res.status(204).json({status:"success in deletion of traxi a doc !"});
  
      } catch (error) {
          res.status(500).json({status:"Internal Server Error",msg:error});
        }
      
  }
  
}
export const shippingController = new ShippingController();