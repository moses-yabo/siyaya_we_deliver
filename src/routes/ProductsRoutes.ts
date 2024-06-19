import { Router } from 'express';
import { productController } from '../controllers/ProductsController';
import { validateObjectId } from "../middlewares/validationMiddleware";


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
    .get(validateObjectId("product_id"),get_product_by_id)
    .put(validateObjectId("product_id"),updateMany_product)
    .patch(validateObjectId("product_id"),updateOne_product)
    .delete(validateObjectId("product_id"),remove_product);
  }
}

const productRouter = new BookingRouter().route;





export  default productRouter;
