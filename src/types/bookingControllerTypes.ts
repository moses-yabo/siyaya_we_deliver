export interface IBookingController <TRequest>{
    get_all_bookings:TRequest;
    get_booking_by_id:TRequest;
    create_booking:TRequest;
    updateOne_booking:TRequest;
    updateMany_booking:TRequest;
    remove_booking:TRequest;
  
  }