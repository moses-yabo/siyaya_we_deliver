import { Document,Schema } from "mongoose";

export interface TrailerBooking extends Document {
    trailerId?: Schema.Types.ObjectId; 
    customerId?: Schema.Types.ObjectId;
    startDate: Schema.Types.Date;
    endDate: Schema.Types.Date;
    totalCost: Schema.Types.Number;
    tripType:Trailer_Hire.LOCAL_TRIP | Trailer_Hire.NATIONAL_TRIP;
    destination:Schema.Types.String;
    duration:Schema.Types.Number;
    isAvailable: Schema.Types.Boolean;
    capacity: Schema.Types.String;
  }
  
  export interface Trailer extends Document{
    _id?: Schema.Types.ObjectId;
    imgUrl?:String;
    capacity: String;
    isAvailable: Boolean;
    fleet_no:string;
    description:String
    isRented: Boolean;
  }
  

export enum Trailer_Hire{
    LOCAL_TRIP = "LOCAL_TRIP",
    NATIONAL_TRIP = "NATIONAL_TRIP",
} 


