import { Router } from "express";
import { userController} from "../controllers/UsersController";



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
        .get(get_user_by_id)
        .put(updateMany_user)
        .patch(updateOne_user)
        .delete(remove_user);

    }
}
const  userRouter = new UserRouter().router;
export default userRouter;