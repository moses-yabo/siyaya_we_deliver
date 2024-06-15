import {CustomError} from "./CustomErrorHandling";

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
} catch (error) {
    
    throw new CustomError((error as any)?.stack);    
};
//uncaught exceptions

process.on("uncaughtException",(err)=>{
err.message;
err.stack;
err.name;
});
