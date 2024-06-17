import { Router } from "express";
import { trailerController} from "../controllers/TrailersController";



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
        .get(get_trailer_by_id)
        .put(updateMany_trailer)
        .patch(updateOne_trailer)
        .delete(remove_trailer);

    }
}
const  rentalRouter = new TrailerRouter().router;
export default rentalRouter;