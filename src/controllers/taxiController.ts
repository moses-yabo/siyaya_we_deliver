import TaxiModel from "../models/TaxiSchema";
import { RequestHandler} from "express";
import { Taxi} from "../types/taxiTypes";
import taxiModel from "../models/TaxiSchema";
import { isValidObjectId } from "mongoose";

class TaxiController {
    public  get_all_available_taxi:RequestHandler = async(req,res)=>{
    
        try {
            const taxis:Taxi[] = await taxiModel.find({}); 
            if(taxis.length === 0) return res.status(404).json({status:"Users Not Found !",code:404});
          
            res.status(200).json({status:"success !!",data:taxis});
            
          } catch (error) {
          
            res.status(500).json({status:"Internal Server Error",msg:error});
          }
        } 
      
    
    
    public get_taxi_by_id:RequestHandler = async (req,res) =>{
         
        try {
            const taxi_id  = req.params["trailer_id"];
            if(!isValidObjectId(taxi_id)) return res.status(400).json({ status: "failed", message: "Invalid Taxi ID" });
            const taxi = await taxiModel.findById(taxi_id);
            
            if(!taxi) return  res.status(404).json({status:"Taxi not found"});
            
            res.status(200).json({status:"success",data:taxi});
      
          } catch (error) {
            res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
          }
        }
      
    
    public add_taxi:RequestHandler = async(req,res)=>{
        
        try {
      
            const taxi = await taxiModel.create(req.body);
     
         return res.status(201).json({ message: "Created a taxir", status: 201,data:taxi });
     
        } catch (error:unknown) {
    
             if (error instanceof Error) {
                 if (error.name === 'ValidationError') {
                     return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
                 }
                 return res.status(500).json({ message: error.message, status: 500 });
     
             }    
         
     
         return res.status(500).json({ message: "Failed to create a taxi", status: 500 });
     }
        } 
      
    
      public updateOne_taxi:RequestHandler = async (req,res):Promise<void>=>{
         
        try {
            const  taxi_id  = req.params["taxi_id"];  
          
            if(!isValidObjectId(taxi_id)) {
              res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
              return;
            };
          
            const trailerUpdate = await taxiModel.findOneAndUpdate({_id:taxi_id},{$set:req.body},{new:true});
      
            if (!trailerUpdate) {res.status(404).json({status:"failed",msg:"taxi not found !"});}
            
            const isUpdated = trailerUpdate !== null;
            
            if (isUpdated) { 
              res.status(204).json({status:"success !",data:trailerUpdate});
              return;
      
            }else{
               res.status(500).json({ message: "Failed to update taxi" });
            }
      
            } catch (error) {
              res.status(500).json({status:"Internal server error",msg:error});
            }
        } 
      
      public updateMany_taxi:RequestHandler = async(req,res)=>{
    
        try {
        
            const  taxi_id  = req.params["taxi_id"];
        
            if(!isValidObjectId(taxi_id)) {
              res.status(400).json({ status: "failed", message: "Invalid taxi ID" })
            };
      
         const trailer = await taxiModel.updateOne({_id:taxi_id},{$set:req.body});
            
         if (trailer.modifiedCount === 0) {
          res.status(500).json({status:"failed updating a document",msg:"updated booking failed ..."});
        }
          
          res.status(204).json({status:"success !"});
      
          } catch (error) {
            res.status(500).json({status:"failed ",msg:error});
          }
        } 
      
      
      public remove_taxi:RequestHandler = async(req,res)=>{
     
        try {
            const  taxi_id  = req.params["taxi_id"];
            
            if (!isValidObjectId(taxi_id)) {
              return res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
            }
      
            const user = await taxiModel.deleteOne({_id:taxi_id});
            if(user.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"taxi not found"}) };
      
            res.status(204).json({status:"success in deletion of traxi a doc !"});
      
          } catch (error) {
              res.status(500).json({status:"Internal Server Error",msg:error});
            }
          
      }
    
    
}
 export const taxiController = new TaxiController();