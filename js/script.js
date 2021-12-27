// Base Functions //
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "add") {
        return add(a, b);
    } else if (operator == "subtract") {
        return subtract(a, b);
    } else if (operator == "multiply") {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

// Base Function Testing
/*
const a = prompt("a = ?");
const b = prompt("b = ?");

console.log(add(a,b));
console.log(subtract(a,b));
console.log(multiply(a,b));
console.log(divide(a,b));
*/

// Operator Function Testing
/*
const operator = prompt("Operator: ");
const a = prompt("a: ");
const b = prompt("b: ");

console.log(operate(operator, a, b));
*/


