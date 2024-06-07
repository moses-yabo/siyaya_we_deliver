import TaxiModel from "../models/TaxiSchema";
import { RequestHandler} from "express";
import { Taxi} from "../types/taxiTypes";
import taxiModel from "../models/TaxiSchema";


  export const  get_all_available_taxi:RequestHandler = async(req,res)=>{
    
    
      try {
        const taxi = await TaxiModel.find({}); 
        if(!taxi) return;
        
        res
        .status(200)
        .json({
          status:"success !!",
          data:taxi
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
  


export const get_taxi_by_id:RequestHandler = async (req,res) =>{
     
      
    try {
      const taxiId  = req.params["taxiId"];
      const taxi = await TaxiModel.findById(taxiId);
      
      if(!taxi) return;
      res
      .status(200)
      .json({
        status:"success",
        data:taxi
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
  

export const add_taxi:RequestHandler = async(req,res)=>{
    
    
      try {
        
        const newTaxi = await TaxiModel.create(<Taxi>req.body);
        if(!newTaxi) return;
        res
        .status(201)
        .json({
          status:'success',
          data:newTaxi
          
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
  

  export const updateOne_taxi:RequestHandler = async (req,res):Promise<void>=>{
     
      try {
      const  taxiId  = req.params["taxiId"];
      
      const taxi = await TaxiModel.updateOne(
        {_id:taxiId},
        {$set:req.body});
      if (taxi.modifiedCount === 0) {
        console.log(taxi.acknowledged);
        
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
            taxi
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
  
  export const updateMany_taxi:RequestHandler = async(req,res)=>{

      try {
      const  taxiId  = req.params["taxiId"];
      const taxi = await taxiModel.findByIdAndUpdate(taxiId,{$set:req.body});
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
      const taxi = await taxiModel.deleteOne({_id:taxiId},req.body);
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

