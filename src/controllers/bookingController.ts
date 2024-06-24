import taxiBookingModel from "../models/BookingSchema";
import { RequestHandler } from "express";
import { TaxiBooking } from "../types/taxiTypes";
import { IBookingController } from "../types/bookingControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";
import { IBookingService } from "../types/IBookingService";
import { BookingService } from "../services/booking.service";
import mongoose from "mongoose";

export class BookingController  implements IBookingController<RequestHandler>{
  private readonly bookingService:IBookingService<TaxiBooking>  = new BookingService();

  public get_all_bookings: RequestHandler = async (req, res) => {
    try {
      const bookings:TaxiBooking[] = await this.bookingService.getAllBookings();
      sendResponse(res, 200, "success !!", bookings);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_booking_by_id: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking:TaxiBooking | null = await this.bookingService.getBookingById(booking_id);
      
      if (!booking) return sendResponse(res, 404, "booking not found", booking);
        sendResponse(res, 200, "success", booking);

    } catch (error) {
      if (error instanceof CustomError) {
          sendResponse(res, error.statusCode, error.message);
      } else {
          sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public create_booking: RequestHandler = async (req, res):Promise<void> => {
    try {
      const booking = await this.bookingService.createBooking(req.body);
      return sendResponse(res, 201, "Created a Booking", booking);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        return sendResponse(res, 400, error.message);
      }else if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateOne_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
        const bookingUpdate = this.bookingService.updateOneBookingById(booking_id,req.body);

      if (!bookingUpdate) {
        return sendResponse(res, 404, "booking not found !");
      }
      return sendResponse(res, 204, "success ! updated booking",bookingUpdate);
    } catch (error) {
      
      if (error instanceof CustomError) {
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public updateMany_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = this.bookingService.updateManyBookingById(booking_id,req.body);
      
      if (!booking) {
        return sendResponse(res, 404, "booking has no changes made");
      }
      return sendResponse(res, 204, "success updated a booking",booking);
    } catch (error) {
      
      if (error instanceof CustomError) {
         return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public remove_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = await this.bookingService.deleteBookingById(booking_id);
      if (!booking) {
        return sendResponse(res, 404, "booking not found or already deleted");
      }
      return sendResponse(res, 204, "success in deletion of booking",booking);
    } catch (error) {

      if (error instanceof CustomError) {
      
       return sendResponse(res, error.statusCode, error.message);
      
      } else {
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }
}

export const bookingController = new BookingController();
