import { Router } from "express";
import { shippingController } from "../controllers/ShippingController";



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
        .get(get_shipping_by_id)
        .put(updateMany_shipping)
        .patch(updateOne_shipping)
        .delete(remove_shipping);

    }
}
const  shippingRouter = new ShippingRouter().router;
  export  default shippingRouter;
