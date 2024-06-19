import { Router } from "express";
import { trailerController} from "../controllers/TrailersController";
import { validateObjectId } from "../middlewares/validationMiddleware";



const { get_all_available_trailers,get_trailer_by_id,add_trailer,updateMany_trailer,updateOne_trailer,remove_trailer} = trailerController;
class TrailerRouter {
    public router:Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes():void{
        this.router
        .route("/")
        .get(get_all_available_trailers)
        .post(add_trailer);
        this.router
        .route("/:trailer_id")
        .get(validateObjectId("trailer_id"),get_trailer_by_id)
        .put(validateObjectId("trailer_id"),updateMany_trailer)
        .patch(validateObjectId("trailer_id"),updateOne_trailer)
        .delete(validateObjectId("trailer_id"),remove_trailer);

    }
}
const  rentalRouter = new TrailerRouter().router;
export default rentalRouter;