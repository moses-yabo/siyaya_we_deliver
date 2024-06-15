"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomErrorHandling_1 = require("./CustomErrorHandling");
const error = new Error("something went wrong");
// console.log("error stack",error.stack);
// console.log("message",error.message);
// console.log("Name",error.name);
function dosum() {
    const sata = fetch("localhost:300/api");
    // console.log("I am from the do function")
    return sata;
}
try {
    dosum();
}
catch (error) {
    throw new CustomErrorHandling_1.CustomError(error === null || error === void 0 ? void 0 : error.stack);
}
;
//uncaught exceptions
process.on("uncaughtException", (err) => {
    err.message;
    err.stack;
    err.name;
});
