import { bookingController } from './../controllers/bookingController';
import { Router } from 'express';
import { validateObjectId } from "../middlewares/validationMiddleware";

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
           .get(validateObjectId("booking_id"),get_booking_by_id)
           .put(validateObjectId("booking_id"),updateMany_booking)
           .patch(validateObjectId("booking_id"),updateOne_booking)
            .delete(validateObjectId("booking_id"),remove_booking);
  }
}

const bookingRouter = new BookingRouter().route;
export default bookingRouter;