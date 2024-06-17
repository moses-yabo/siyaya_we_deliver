import express,{ Router } from 'express';
import { productController } from '../controllers/ProductsController';



const { create_product,get_all_products,get_product_by_id,remove_product,updateOne_product,updateMany_product} = productController;
class BookingRouter {
  public route:Router
  constructor() {
    this.route = Router();
    this.initializeRoutes();

  }

  private  initializeRoutes():void{
    this.route
    .route("/")
    .get(get_all_products)
    .post(create_product);
    this.route
    .route("/:product_id")
    .get(get_product_by_id)
    .put(updateMany_product)
    .patch(updateOne_product)
    .delete(remove_product);
  }
}

const productRouter = new BookingRouter().route;





export  default productRouter;
