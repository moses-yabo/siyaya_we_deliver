import { RequestHandler } from "express";
import mongoose from "mongoose";
import { resourceNotFound} from "../utils/resourceNotFound";
import { TaxiBooking } from "../types/taxiTypes";
import { IBookingController } from "../types/bookingControllerTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { AppError } from "../utils/AppErrorHandling";
import { logger } from "../utils/logger";
import { IBookingService } from "../types/IBookingService";
import { BookingService } from "../services/booking.service";
import { NotFoundErrorHandler } from "../middlewares/notFoundHandler";

export class BookingController  implements IBookingController<RequestHandler>{
  private readonly bookingService:IBookingService<TaxiBooking>  = new BookingService();

  public get_all_bookings: RequestHandler = async (req, res,next) => {
    try {
      const bookings:TaxiBooking[] = await this.bookingService.getAllBookings();
      logger.info("Fetched the bookings ");
      sendResponse(res, 200, "success !!", bookings);
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message);
        sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error");
        sendResponse(res, 500, "Internal Server Error ok !");
        next(error);
      }
    }
  }
  // Finish the logger

  public get_booking_by_id: RequestHandler = async (req, res,next) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking:TaxiBooking | null = await this.bookingService.getBookingById(booking_id);
      
        if (!booking) {
          resourceNotFound(`Booking`);
          return;
        };
      logger.info("Fetched a booking");
        return sendResponse(res, 200, "success", booking);

    } catch (error) {
      if (error instanceof AppError) {
       // next(new AppError(error.message,error.statusCode));
          logger.info(error.message);
          sendResponse(res, error.statusCode, error.message);          
      } else {
          sendResponse(res, 500, "Internal Server Error");
          next(error)
      }
    }
  }

  public create_booking: RequestHandler = async (req, res):Promise<void> => {
    try {
      
      const booking = await this.bookingService.createBooking(req.body);
      logger.info("Booking Created");
      return sendResponse(res, 201, "Created a Booking", booking);
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.error(error.message);
        return sendResponse(res, 400, error.message);
      }else if (error instanceof AppError) {
        logger.error(error.message);
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal Server Error")
        return sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateOne_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
        const bookingUpdate = this.bookingService.updateOneBookingById(booking_id,req.body);

      if (!bookingUpdate) {
        resourceNotFound("Booking");
        return sendResponse(res, 404, "booking not found !");
      }
      logger.info("updated booking");
      return sendResponse(res, 204, "success ! updated booking",bookingUpdate);
    } catch (error) {
      
      if (error instanceof AppError) {
        logger.error(error.message)
        return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal server error");
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public updateMany_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = this.bookingService.updateManyBookingById(booking_id,req.body);
      
      if (!booking) { 
        logger.warn("booking has no changes made");
        return resourceNotFound("Booking");
      }
      return sendResponse(res, 204, "success updated a booking",booking);
    } catch (error) {
      
      if (error instanceof AppError) {
        logger.error(error.message);
         return sendResponse(res, error.statusCode, error.message);
      } else {
        logger.error("Internal server error");
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public remove_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = await this.bookingService.deleteBookingById(booking_id);
      if (!booking) {
        logger.warn("booking not found or already deleted");
        return resourceNotFound("Booking");
      }
      logger.info("success in deletion of booking");
      return sendResponse(res, 204, "success in deletion of booking",booking);
    } catch (error) {
      
      if (error instanceof AppError) {
        logger.error(error.message);
       return sendResponse(res, error.statusCode, error.message);
      
      } else {
        logger.error("Internal server error");
        return sendResponse(res, 500, "Internal server error");
      }
    }
  }
}

export const bookingController = new BookingController();
