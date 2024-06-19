"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = void 0;
const mongoose_1 = require("mongoose");
const responseMiddleware_1 = require("./responseMiddleware");
const validateObjectId = (param_id) => {
    return (req, res, next) => {
        const id = req.params[param_id];
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            (0, responseMiddleware_1.sendResponse)(res, 400, `Invalid ${id} ID`);
            return;
        }
        next();
    };
};
exports.validateObjectId = validateObjectId;
