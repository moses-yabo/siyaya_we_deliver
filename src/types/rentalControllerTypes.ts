export interface IRentalController <TRequest>{
    get_all_rentals:TRequest;
    get_rental_by_id:TRequest;
    create_rental:TRequest;
    updateOne_rental:TRequest;
    updateMany_rental:TRequest;
    remove_rental:TRequest;
  
  }