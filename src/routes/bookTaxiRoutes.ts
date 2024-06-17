import { bookingController } from './../controllers/bookingController';
import express, { Router } from 'express';
const {create_booking,get_all_bookings,get_booking_by_id,remove_booking,updateOne_booking,updateMany_booking} = bookingController;

class BookingRouter {
  public route:Router;
  constructor() {
    this.route = Router();
    this.initializeRoutes();
  }

  
  private initializeRoutes(){

      this.route
        .route("/")
          .get(get_all_bookings)
          .post(create_booking);
      this.route
          .route("/:booking_id")
           .get(get_booking_by_id)
           .put(updateMany_booking)
           .patch(updateOne_booking)
            .delete(remove_booking);
  }
}

const bookingRouter = new BookingRouter().route;
export default bookingRouter;