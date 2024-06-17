import { Router } from "express";
import { taxiController } from "../controllers/TaxiController";


const {get_all_available_taxi,get_taxi_by_id,add_taxi,updateOne_taxi,updateMany_taxi,remove_taxi} = taxiController;
class TaxiRouter {
    public router:Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes():void{
        this.router
        .route("/")
        .get(get_all_available_taxi)
        .post(add_taxi);
        this.router
        .route("/:taxi_id")
        .get(get_taxi_by_id)
        .put(updateMany_taxi)
        .patch(updateOne_taxi)
        .delete(remove_taxi);

    }
}
const  taxiRouter = new TaxiRouter().router;
export default taxiRouter;