"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
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
            .get((0, validationMiddleware_1.validateObjectId)("user_id"), get_user_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("user_id"), updateMany_user)
            .patch((0, validationMiddleware_1.validateObjectId)("user_id"), updateOne_user)
            .delete((0, validationMiddleware_1.validateObjectId)("user_id"), remove_user);
    }
}
const userRouter = new UserRouter().router;
exports.default = userRouter;
