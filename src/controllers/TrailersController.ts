import { RequestHandler} from "express";
import { Trailer} from "../types/trailerTypes";
import trailerModel from "../models/TrailerSchema";


  export const  get_all_available_trailers:RequestHandler = async(req,res)=>{
    
    
      try {
        const trailer = await trailerModel.find({}); 
        if(!trailer) return;
        
        res
        .status(200)
        .json({
          status:"success !!",
          data:trailer
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
  


export const get_trailer_by_id:RequestHandler = async (req,res) =>{
     
      
    try {
      const trailerId  = req.params["trailerId"];
      const trailer = await trailerModel.findById(trailerId);
      
      if(!trailer) return;
      res
      .status(200)
      .json({
        status:"success",
        data:trailer
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
  

export const add_trailer:RequestHandler = async(req,res)=>{
    
    
      try {
        
        const newTrailer = await trailerModel.create(<Trailer>req.body);
        if(!newTrailer) return;
        res
        .status(201)
        .json({
          status:'success',
          data:newTrailer
          
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
  

  export const updateOne_trailer:RequestHandler = async (req,res):Promise<void>=>{
     
      try {
      const  trailerId  = req.params["trailerId"];
      
      const trailer = await trailerModel.updateOne(
        {_id:trailerId},
        {$set:req.body});
      if (trailer.modifiedCount === 0) {
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
            trailer
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
  
  export const updateMany_trailer:RequestHandler = async(req,res)=>{

      try {
      const  taxiId  = req.params["taxiId"];
      const taxi = await trailerModel.findByIdAndUpdate(taxiId,{$set:req.body});
      if(!taxi)  return ;
      res
      .status(201)
      .json({
        status:"success !",
        data:{
          msg:"updated taxi ...",
          taxi
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
  
  
  export const remove_taxi:RequestHandler = async(req,res)=>{
 
  
      try {
      const  taxiId  = req.params["taxiId"];
      const taxi = await trailerModel.deleteOne({_id:taxiId},req.body);
      if(!taxi)  return ;
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

