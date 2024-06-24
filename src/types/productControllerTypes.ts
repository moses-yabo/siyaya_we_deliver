export interface IProductController <TRequest>{
    get_all_products:TRequest;
    get_product_by_id:TRequest;
    create_product:TRequest;
    updateOne_product:TRequest;
    updateMany_product:TRequest;
    remove_product:TRequest;
  
  }