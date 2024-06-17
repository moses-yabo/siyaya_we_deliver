"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = new Error("something went wrong");
// console.log("error stack",error.stack);
// console.log("message",error.message);
// console.log("Name",error.name);
try {
    function dosum() {
        const sata = fetch("localhost:4000/api/docs");
        // console.log("I am from the do function")
        return sata.then((res) => console.log(res));
    }
    const result = dosum();
    console.log(result);
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
;
//uncaught exceptions
process.on("uncaughtException", (err) => {
    err.message;
    err.stack;
    err.name;
});
