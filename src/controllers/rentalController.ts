import trailerModel from "../models/RentalSchema";
import { TrailerBooking } from '../types/trailerTypes';
import { RequestHandler } from "express";



  export const get_all_rentals:RequestHandler = async (req,res):Promise<void>=>{
  
      try {
        const rentals = await trailerModel.find({});
          if(!rentals) return;
      
          res.status(200).json({
            status:"success",
            data:rentals
          });
        
        
      } catch (error) {
        if (error) {
          res.status(401).json({
            status:"failed",
            msg:error
          });
        }
      }
     
    };
  
    export const get_rentals_by_id:RequestHandler = async(req,res):Promise<void> => {
    
      const rentalId:string = req.params["rentalId"];
        
      try {
        const rental = await trailerModel.findById(rentalId);
        if(!rental) return;
        res
        .status(200)
        .json({
          status:"success",
          data:{rental}
        });
  
      } catch (error) {
        res
        .status(404)
        .json({
          status:"Failed",
          msg:{error}
        });
      }
  
      }
 
  
  export const create_rental:RequestHandler = async(req,res):Promise<void>=>{
      
    try {
    
      const newRental = await trailerModel.create(req.body);
    
      if (!newRental)  return;
    
      res.status(201).json({
          status:"success!",
          data:{
          newRental
          }
        });


      } catch (error) {
        res.status(401).json({
          status:"failed",
          msg:{error}
        });
      }
    }
  

export  const updateOne_rental:RequestHandler = async (req,res):Promise<void>=>{

      const  rentalId = req.params["rentalId"];
    
      try {

       const rental =  await trailerModel.updateOne(
        {_id:rentalId},
        {$set:req.body}
        );
        if(rental.upsertedCount === 0 && !rental){
          res.status(404).json({
            status:"could'nt update the rental or rental id is not found",

          })
        }
    
    
       res.status(201).json({
        status:"success !",
        data:{
          msg:"updated shippment ...",
          rental
        }
       });


      } catch (error) {
        res.status(400).json({
          status:"failed 😭",
          msg:{error}
        });
      }
    }
  

 export const updateMany_rentals:RequestHandler = async(req,res):Promise<void> =>{

  const  rentalId = req.params["rentalId"];

      try {

       const rental =  await trailerModel.findByIdAndUpdate({_id:rentalId},{$set:req.body});
       if (!rental) return ;

       res.status(201).json({
        status:"success !",
        data:{
          msg:"updated shippment ...",
          rental
        }
       });


      } catch (error) {
        res.status(400).json({
          status:"failed 😭",
          msg:{error}
        });
      }
    }
  

 export const remove_rentals:RequestHandler = async(req,res):Promise<void>=> {
      const rentalId = req.params["rentalId"];
      try {

       const rental =  await trailerModel.findOneAndDelete({_id:rentalId},{$set:req.body});
       if (!rental) return ;
       res
       .status(204)
       .json({
        status:"success !",
        data:{
          msg:"removed shippment ...",
      
        }
       });
      } catch (error) {
        res
        .status(400)
        .json({
          status:"failed 😭",
          msg:{error}
        });
      }
    }
  
