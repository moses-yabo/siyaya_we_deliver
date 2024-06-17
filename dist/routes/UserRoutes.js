"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const { get_all_available_users, get_user_by_id, add_user, updateMany_user, updateOne_user, remove_user } = UsersController_1.userController;
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
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
const userRouter = new UserRouter().router;
exports.default = userRouter;
