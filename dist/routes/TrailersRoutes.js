"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TrailersController_1 = require("../controllers/TrailersController");
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
            .get(get_trailer_by_id)
            .put(updateMany_trailer)
            .patch(updateOne_trailer)
            .delete(remove_trailer);
    }
}
const rentalRouter = new TrailerRouter().router;
exports.default = rentalRouter;
