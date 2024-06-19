"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TrailersController_1 = require("../controllers/TrailersController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const { get_all_available_trailers, get_trailer_by_id, add_trailer, updateMany_trailer, updateOne_trailer, remove_trailer } = TrailersController_1.trailerController;
class TrailerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(get_all_available_trailers)
            .post(add_trailer);
        this.router
            .route("/:trailer_id")
            .get((0, validationMiddleware_1.validateObjectId)("trailer_id"), get_trailer_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("trailer_id"), updateMany_trailer)
            .patch((0, validationMiddleware_1.validateObjectId)("trailer_id"), updateOne_trailer)
            .delete((0, validationMiddleware_1.validateObjectId)("trailer_id"), remove_trailer);
    }
}
const rentalRouter = new TrailerRouter().router;
exports.default = rentalRouter;
