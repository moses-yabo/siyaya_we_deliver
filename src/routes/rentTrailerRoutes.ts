import { Router } from 'express';
import { rentalController } from '../controllers/rentalController';
import { validateObjectId } from "../middlewares/validationMiddleware";

const { create_rental,get_all_rentals,get_rental_by_id,updateOne_rental,updateMany_rental,remove_rental} = rentalController;
class RentalRouter {
    public router:Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes():void{
        this.router
        .route("/")
        .get(get_all_rentals)
        .post(create_rental);
        this.router
        .route("/:rental_id")
        .get(validateObjectId("rental_id"),get_rental_by_id)
        .put(validateObjectId("rental_id"),updateMany_rental)
        .patch(validateObjectId("rental_id"),updateOne_rental)
        .delete(validateObjectId("rental_id"),remove_rental);

    }
}
const  rentalRouter = new RentalRouter().router;

export  default rentalRouter;
