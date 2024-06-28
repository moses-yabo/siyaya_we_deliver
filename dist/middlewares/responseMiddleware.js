"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, status, message, data) => {
    if (res.headersSent)
        return;
    res.status(status).json({ status, message, data });
};
exports.sendResponse = sendResponse;
