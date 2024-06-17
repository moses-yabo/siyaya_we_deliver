import taxiBookingModel from "../models/BookingSchema";
import { RequestHandler} from "express";
import { Book_Taxi,TaxiBooking } from "../types/taxiTypes";
import { isValidObjectId } from "mongoose";


class BookingController {
  public  get_all_bookings:RequestHandler = async(req,res)=>{
    
    try {
        const taxi_booking:TaxiBooking[] = await taxiBookingModel.find({}); 
        if(taxi_booking.length === 0) return res.status(404).json({status:"booking Not Found !",code:404});
      
        res.status(200).json({status:"success !!",data:taxi_booking});
        
      } catch (error) {
      
        res.status(500).json({status:"Internal Server Error",msg:error});
      }
    } 
  
  
  
  public get_booking_by_id:RequestHandler = async (req,res) =>{
     
    try {
        const booking_id  = req.params["booking_id"];
        if(!isValidObjectId(booking_id)) return res.status(400).json({ status: "failed", message: "Invalid booking ID" });
        const booking = await taxiBookingModel.findById(booking_id);
        
        if(!booking) return  res.status(404).json({status:"booking not found"});
        
        res.status(200).json({status:"success",data:booking});
  
      } catch (error) {
        res.status(500).json({status:"Failed",msg:"500 internal server Error",error});
      }
    }
  
  
  public create_booking:RequestHandler = async(req,res)=>{
    
    try {
  
        const booking = await taxiBookingModel.create(req.body);
  
     return res.status(201).json({ message: "Created a bookingr", status: 201,data:booking });
  
    } catch (error:unknown) {
  
         if (error instanceof Error) {
             if (error.name === 'ValidationError') {
                 return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
             }
             return res.status(500).json({ message: error.message, status: 500 });
  
         }    
     
  
     return res.status(500).json({ message: "Failed to create a booking", status: 500 });
  }
    } 
  
  
  public updateOne_booking:RequestHandler = async (req,res):Promise<void>=>{
     
    try {
        const  booking_id  = req.params["booking_id"];  
      
        if(!isValidObjectId(booking_id)) {
          res.status(400).json({ status: "failed", message: "Invalid booking ID" });
          return;
        };
      
        const bookingUpdate = await taxiBookingModel.findOneAndUpdate({_id:booking_id},{$set:req.body},{new:true});
  
        if (!bookingUpdate) {res.status(404).json({status:"failed",msg:"booking not found !"});}
        
        const isUpdated = bookingUpdate !== null;
        
        if (isUpdated) { 
          res.status(204).json({status:"success !",data:bookingUpdate});
          return;
  
        }else{
           res.status(500).json({ message: "Failed to update booking" });
        }
  
        } catch (error) {
          res.status(500).json({status:"Internal server error",msg:error});
        }
    } 
  
  public updateMany_booking:RequestHandler = async(req,res)=>{
  
    try {
    
        const  booking_id  = req.params["booking_id"];
    
        if(!isValidObjectId(booking_id)) {
          res.status(400).json({ status: "failed", message: "Invalid booking ID" })
        };
  
     const booking = await taxiBookingModel.updateOne({_id:booking_id},{$set:req.body});
        
     if (booking.modifiedCount === 0) {
      res.status(500).json({status:"failed updating a document",msg:"updated booking failed ..."});
    }
      
      res.status(204).json({status:"success !"});
  
      } catch (error) {
        res.status(500).json({status:"failed ",msg:error});
      }
    } 
  
  
  public remove_booking:RequestHandler = async(req,res)=>{
  
    try {
        const  booking_id  = req.params["booking_id"];
        
        if (!isValidObjectId(booking_id)) {
          return res.status(400).json({ status: "failed", message: "Invalid booking ID" });
        }
  
        const booking = await taxiBookingModel.deleteOne({_id:booking_id});
        if(booking.deletedCount === 0){ res.status(404).json({status:"Failed ",message:"booking not found"}) };
  
        res.status(204).json({status:"success in deletion of traxi a doc !"});
  
      } catch (error) {
          res.status(500).json({status:"Internal Server Error",msg:error});
        }
      
  }
}

export const bookingController = new BookingController();