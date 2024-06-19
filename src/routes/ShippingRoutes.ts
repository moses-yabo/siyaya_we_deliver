import { Router } from "express";
import { shippingController } from "../controllers/ShippingController";
import { validateObjectId } from "../middlewares/validationMiddleware";



const {create_shipping,get_all_shippings,get_shipping_by_id,updateOne_shipping,updateMany_shipping,remove_shipping} = shippingController;
class ShippingRouter {
    public router:Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes():void{
        this.router
        .route("/")
        .get(get_all_shippings)
        .post(create_shipping);
        this.router
        .route("/:shipping_id")
        .get(validateObjectId("shipping_id"),get_shipping_by_id)
        .put(validateObjectId("shipping_id"),updateMany_shipping)
        .patch(validateObjectId("shipping_id"),updateOne_shipping)
        .delete(validateObjectId("shipping_id"),remove_shipping);

    }
}
const  shippingRouter = new ShippingRouter().router;
  export  default shippingRouter;
