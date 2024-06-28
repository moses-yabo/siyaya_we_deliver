"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceNotFound = void 0;
const logger_1 = require("../utils/logger");
const responseMiddleware_1 = require("../middlewares/responseMiddleware");
const resourceNotFound = (resourceName) => {
    return (req, res, next) => {
        const message = `${resourceName} is not Found 😭`;
        logger_1.logger.error(message);
        (0, responseMiddleware_1.sendResponse)(res, 404, message);
        next;
    };
};
exports.resourceNotFound = resourceNotFound;
