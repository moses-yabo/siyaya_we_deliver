export interface IShippingController <TRequest>{
    get_all_shippings:TRequest;
    get_shipping_by_id:TRequest;
    create_shipping:TRequest;
    updateOne_shipping:TRequest;
    updateMany_shipping:TRequest;
    remove_shipping:TRequest;
  
  }