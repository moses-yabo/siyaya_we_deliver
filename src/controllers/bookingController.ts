import taxiBookingModel from "../models/BookingSchema";
import { RequestHandler } from "express";
import { TaxiBooking } from "../types/taxiTypes";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";

class BookingController {
  public get_all_bookings: RequestHandler = async (req, res) => {
    try {
      const taxi_booking: TaxiBooking[] = await taxiBookingModel.find({});
      if (taxi_booking.length === 0) return sendResponse(res, 404, "booking Not Found !");
      sendResponse(res, 200, "success !!", taxi_booking);
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
      const booking = await taxiBookingModel.findById(booking_id);
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

  public create_booking: RequestHandler = async (req, res) => {
    try {
      const booking = await taxiBookingModel.create(req.body);
      return sendResponse(res, 201, "Created a Booking", booking);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, "Validation error");
        }
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateOne_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const bookingUpdate = await taxiBookingModel.findOneAndUpdate({ _id: booking_id }, { $set: req.body }, { new: true });
      if (!bookingUpdate) {
        return sendResponse(res, 404, "booking not found !");
      }
      sendResponse(res, 204, "success ! updated booking");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public updateMany_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = await taxiBookingModel.updateOne({ _id: booking_id }, { $set: req.body });
      if (booking.modifiedCount === 0) {
        return sendResponse(res, 404, "booking not found or no changes made");
      }
      sendResponse(res, 200, "success updated a booking");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal server error");
      }
    }
  }

  public remove_booking: RequestHandler = async (req, res) => {
    try {
      const booking_id = req.params["booking_id"];
      const booking = await taxiBookingModel.deleteOne({ _id: booking_id });
      if (booking.deletedCount === 0) {
        return sendResponse(res, 404, "booking not found or already deleted");
      }
      sendResponse(res, 204, "success in deletion of booking");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal server error");
      }
    }
  }
}

export const bookingController = new BookingController();
