import { isValidObjectId } from "mongoose";
import trailerModel from "../models/RentalSchema";
import { TrailerBooking } from '../types/trailerTypes';
import { RequestHandler } from "express";

class RentalController {
  
public  get_all_rentals:RequestHandler = async(req,res)=>{
    
  try {
      const rentals:TrailerBooking[] = await trailerModel.find({}); 
      if(rentals.length === 0) return res.status(404).json({status:"rental Not Found !",code:404});
    
      res.status(200).json({status:"success !!",data:rentals});
      
    } catch (error) {
    
      res.status(500).json({status:"Internal Server Error",msg:error});
    }
  } 



public get_rental_by_id:RequestHandler = async (req,res) =>{
   
  try {
      const rental_id  = req.params["rental_id"];
      if(!isValidObjectId(rental_id)) return res.status(400).json({ status: "failed", message: "Invalid rental ID" });
      const rental = await trailerModel.findById(rental_id);
      
      if(!rental) return  res.status(404).json({status:"rental not found"});
      
      res.status(200).json({status:"success",data:rental});

    } catch (error) {
      res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
    }
  }


public create_rental:RequestHandler = async(req,res)=>{
  
  try {

      const rental = await trailerModel.create(req.body);

   return res.status(201).json({ message: "Created a rentalr", status: 201,data:rental });

  } catch (error:unknown) {

       if (error instanceof Error) {
           if (error.name === 'ValidationError') {
               return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
           }
           return res.status(500).json({ message: error.message, status: 500 });

       }    
   

   return res.status(500).json({ message: "Failed to create a rental", status: 500 });
}
  } 


public updateOne_rental:RequestHandler = async (req,res):Promise<void>=>{
   
  try {
      const  rental_id  = req.params["rental_id"];  
    
      if(!isValidObjectId(rental_id)) {
        res.status(400).json({ status: "failed", message: "Invalid rental ID" });
        return;
      };
    
      const trailerUpdate = await trailerModel.findOneAndUpdate({_id:rental_id},{$set:req.body},{new:true});

      if (!trailerUpdate) {res.status(404).json({status:"failed",msg:"rental not found !"});}
      
      const isUpdated = trailerUpdate !== null;
      
      if (isUpdated) { 
        res.status(204).json({status:"success !",data:trailerUpdate});
        return;

      }else{
         res.status(500).json({ message: "Failed to update rental" });
      }

      } catch (error) {
        res.status(500).json({status:"Internal server error",msg:error});
      }
  } 

public updateMany_rental:RequestHandler = async(req,res)=>{

  try {
  
      const  rental_id  = req.params["rental_id"];
  
      if(!isValidObjectId(rental_id)) {
        res.status(400).json({ status: "failed", message: "Invalid rental ID" })
      };

   const trailer = await trailerModel.updateOne({_id:rental_id},{$set:req.body});
      
   if (trailer.modifiedCount === 0) {
    res.status(500).json({status:"failed updating a document",msg:"updated booking failed ..."});
  }
    
    res.status(204).json({status:"success !"});

    } catch (error) {
      res.status(500).json({status:"failed ",msg:error});
    }
  } 


public remove_rental:RequestHandler = async(req,res)=>{

  try {
      const  taxi_id  = req.params["taxi_id"];
      
      if (!isValidObjectId(taxi_id)) {
        return res.status(400).json({ status: "failed", message: "Invalid taxi ID" });
      }

      const user = await trailerModel.deleteOne({_id:taxi_id});
      if(user.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"rental not found"}) };

      res.status(204).json({status:"success in deletion of traxi a doc !"});

    } catch (error) {
        res.status(500).json({status:"Internal Server Error",msg:error});
      }
    
}

}
export const rentalController = new RentalController();