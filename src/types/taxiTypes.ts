import {  Document, Schema} from "mongoose";


export enum Book_Taxi{
    LOCAL_TRIP = "LOCAL_TRIP",
    NATIONAL_TRIP = "NATIONAL_TRIP",
} 

export interface ITaxiBooking extends Document ,TaxiBooking{};
export interface TaxiBooking extends Document {

    passengerId?: Schema.Types.ObjectId; // Reference to the booking passenger's _id
    driverId?: Schema.Types.ObjectId; // Reference to the booking driver's _id
    pickupLocation: Schema.Types.String;
    dropoffLocation: Schema.Types.String;
    pickupTime: Schema.Types.Date;
    fare:Number;
    number_of_passengers:Number;
    tripType:Book_Taxi.LOCAL_TRIP | Book_Taxi.NATIONAL_TRIP
  }
  export interface Taxi extends Document{
    _id?: Schema.Types.ObjectId;
    imgUrl?:Schema.Types.String;
    description?:Schema.Types.String;
    capacity: Schema.Types.String;
    fleet_no:Schema.Types.Number;
    isAvailable: Schema.Types.Boolean;
    isBooked: Schema.Types.Boolean;
  }
