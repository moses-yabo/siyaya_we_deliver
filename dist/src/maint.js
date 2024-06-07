"use strict";
const ray = [1, 2, 3, 4, 5];
for (const i in ray) {
    if (Number(i) === 1) {
        console.log("*");
    }
    else if (Number(i) === 2) {
        console.log("**");
    }
    else if (Number(i) === 3) {
        console.log("***");
    }
    else if (Number(i) === 4) {
        console.log("****");
    }
    else if (Number(i) === 5) {
        console.log("*****");
    }
}
let num = 0;
while (true) {
    console.log("bitch boy");
    num++;
    if (num === 1) {
        break;
    }
    console.log("m,as");
}
let myLetter = [2, 2, 2, 7];
while (myLetter) {
    for (let letter in myLetter) {
        if (Number(letter) === 2) {
            console.log("== \n");
        }
        else if (Number(letter) === 7) {
            console.log("=======");
        }
        else {
            console.log("heeey");
            break;
        }
    }
}
