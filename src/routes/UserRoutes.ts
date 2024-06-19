import { Router } from "express";
import { userController} from "../controllers/UsersController";
import { validateObjectId } from "../middlewares/validationMiddleware";



const { get_all_available_users,get_user_by_id,add_user,updateMany_user,updateOne_user,remove_user} = userController;


class UserRouter {
    public router:Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes():void{
        this.router
        .route("/")
        .get(get_all_available_users)
        .post(add_user);
        this.router
        .route("/:user_id")
        .get(validateObjectId("user_id"),get_user_by_id)
        .put(validateObjectId("user_id"),updateMany_user)
        .patch(validateObjectId("user_id"),updateOne_user)
        .delete(validateObjectId("user_id"),remove_user);

    }
}
const  userRouter = new UserRouter().router;
export default userRouter;