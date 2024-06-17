import { Router } from 'express';
import { rentalController } from '../controllers/rentalController';


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
        .get(get_rental_by_id)
        .put(updateMany_rental)
        .patch(updateOne_rental)
        .delete(remove_rental);

    }
}
const  rentalRouter = new RentalRouter().router;

export  default rentalRouter;
