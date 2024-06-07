"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRouter = void 0;
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
const { create_rental, get_all_rentals, get_rentals_by_id, updateOne_rental, updateMany_rentals, remove_rentals } = new rentalController_1.HireTrailersControllers();
const rentalRouter = (0, express_1.Router)();
exports.rentalRouter = rentalRouter;
rentalRouter.
    get("/", get_all_rentals())
    .post("/", create_rental())
    .get("/:trentalId", get_rentals_by_id())
    .put("/:trentalId", updateMany_rentals())
    .patch("/:trentalId", updateOne_rental())
    .delete("/:trentalId", remove_rentals());
