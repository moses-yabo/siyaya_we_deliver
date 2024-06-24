export interface ITrailerController <TRequest>{
    get_all_available_trailers:TRequest;
    get_trailer_by_id:TRequest;
    add_trailer:TRequest;
    updateOne_trailer:TRequest;
    updateMany_trailer:TRequest;
    remove_trailer:TRequest;
  
  }