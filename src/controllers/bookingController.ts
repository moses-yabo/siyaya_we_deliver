import taxiBookingModel from "../models/BookingSchema";
import { RequestHandler} from "express";
import { Book_Taxi,TaxiBooking } from "../types/taxiTypes";


  export const  get_all_booking:RequestHandler = async(req,res)=>{
    
    
      try {
        const bookings = await taxiBookingModel.find({}); 
        if(!bookings) return;
        
        res
        .status(200)
        .json({
          status:"success !!",
          data:bookings
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
  


export const get_booking_by_id:RequestHandler = async (req,res) =>{
     
      
    try {
      const bookingId  = req.params["bookingId"];
      const booking = await taxiBookingModel.findById(bookingId);
      
      if(!booking) return;
      res
      .status(200)
      .json({
        status:"success",
        data:booking
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
  

export const create_booking:RequestHandler = async(req,res)=>{
    
      try {       
        const newBooking:TaxiBooking = await taxiBookingModel.create(<TaxiBooking>req.body);
        if(!newBooking) return;
        res
        .status(201)
        .json({
          status:'success',
          data:newBooking
          
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
  

  export const updateOne_booking:RequestHandler = async (req,res):Promise<void>=>{
     
      try {
      const  bookingId  = req.params["bookingId"];
      console.log(bookingId);
      
      const booking = await taxiBookingModel.updateOne(
        {_id:bookingId},
        {$set:req.body});
      if (booking.modifiedCount === 0) {
        console.log(booking.acknowledged);
        
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
            booking
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
  
  export const updateMany_booking:RequestHandler = async(req,res)=>{

      try {
      const  bookingId  = req.params["bookingId"];
      const booking = await taxiBookingModel.findByIdAndUpdate(bookingId,{$set:req.body});
      if(!booking)  return ;
      res
      .status(201)
      .json({
        status:"success !",
        data:{
          msg:"updated booking ...",
          booking
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
  
  
  export const remove_booking:RequestHandler = async(req,res)=>{
 
  
      try {
      const  bookingId  = req.params["bookingId"];
      const booking = await taxiBookingModel.deleteOne({bookingId},req.body);
      if(!booking)  return ;
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

