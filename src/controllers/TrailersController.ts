import { RequestHandler} from "express";
import { Trailer} from "../types/trailerTypes";
import trailerModel from "../models/TrailerSchema";
import { isValidObjectId } from "mongoose";

class TrailersController {
 
 
  public get_all_available_trailers:RequestHandler = async (req,res)=>{
    try {
      const trailers:Trailer[] = await trailerModel.find({}); 
      if(trailers.length === 0) return res.status(404).json({status:"Users Not Found !",code:404});
    
      res.status(200).json({status:"success !!",data:trailers});
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({status:"Internal Server Error",msg:error.message});

      }
    }
  }

  
  


public get_trailer_by_id:RequestHandler = async (req,res) =>{
     
      
    try {
      const trailerId  = req.params["trailer_id"];
      if(!isValidObjectId(trailerId)) return res.status(400).json({ status: "failed", message: "Invalid trailer ID" });
      const trailer = await trailerModel.findById(trailerId);
      console.log(trailer);
      
      
      if(!trailer) return  res.status(404).json({status:"trailer not found"});
      
      res.status(200).json({status:"success",data:trailer});

    } catch (error) {
      res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
    }
  }
  


public add_trailer:RequestHandler = async(req,res)=>{
    
  try {
      
      const trailer = await trailerModel.create(req.body);

    return res.status(201).json({ message: "Created a trailer", status: 201,data:trailer });
} catch (error) {
        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
            }
            return res.status(500).json({ message: error.message, status: 500 });

        }    
    

    return res.status(500).json({ message: "Failed to create a trailer", status: 500 });
}
    } 
  

  public updateOne_trailer:RequestHandler = async (req,res):Promise<void>=>{
     
      
    try {
      const  trailer_id  = req.params["trailer_id"];  
    
      if(!isValidObjectId(trailer_id)) {
        res.status(400).json({ status: "failed", message: "Invalid trailer ID" });
        return;
      };
    
      const trailerUpdate = await trailerModel.findOneAndUpdate({_id:trailer_id},{$set:req.body},{new:true});

      if (!trailerUpdate) {res.status(404).json({status:"failed",msg:"trailer not found !"});}
      
      const isUpdated = trailerUpdate !== null;
      
      if (isUpdated) { 
        res.status(204).json({status:"success !",data:trailerUpdate});
        return;

      }else{
         res.status(500).json({ message: "Failed to update user" });
      }

      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({status:"Internal server error",msg:error.message});

        }
      }
    } 
  
  public updateMany_trailer:RequestHandler = async(req,res)=>{

    try {
    
      const  trailer_id  = req.params["trailer_id"];
  
      if(!isValidObjectId(trailer_id)) {
        res.status(400).json({ status: "failed", message: "Invalid user ID" })
      };

   const trailer = await trailerModel.updateOne({_id:trailer_id},{$set:req.body});
      
   if (trailer.modifiedCount === 0) {
    res.status(500).json({status:"failed updating a document",msg:"updated booking failed ..."});
  }
    
    res.status(204).json({status:"success !"});

    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({status:"failed ",msg:error.message});  
      }
      
    }

    } 
  
  
  public remove_trailer:RequestHandler = async(req,res)=>{
 
  
    try {
      const  trailer_id  = req.params["trailer_id"];
      
      if (!isValidObjectId(trailer_id)) {
        return res.status(400).json({ status: "failed", message: "Invalid trailerr ID" });
      }

      const user = await trailerModel.deleteOne({_id:trailer_id});
      if(user.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"User not found"}) };

      res.status(204).json({status:"success in deletion of trailer a doc !"});

    } catch (error) {
      if(error instanceof Error)res.status(500).json({status:"Internal Server Error",msg:error});
      }
    
  }

}

export const trailerController = new TrailersController();