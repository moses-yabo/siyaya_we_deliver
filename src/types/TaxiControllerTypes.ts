
export interface ITaxiController <TRequest>{
    get_all_available_taxi:TRequest;
    get_taxi_by_id:TRequest;
    add_taxi:TRequest;
    updateOne_taxi:TRequest;
    updateMany_taxi:TRequest;
    remove_taxi:TRequest;
  
  }