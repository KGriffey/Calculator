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
    if(b == 0){
        return "ERR: DIV 0";
    }
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    } else {
        return "error";
    }
}

// Display Functions //
function updateDisplay() {
    let parsedExpression = parseExpression();


    if (this.id == "backspace") {
        //make this into a function
        setExpression(getExpression().slice(0, getExpression.length - 1));
    } else if (this.id == "power") {
        setExpression(getExpression() + "^");
    } else if (this.id == "sign") {

    } else if (this.id == "clear") {
        setExpression("");
        setResult("");
    } else if (this.id == "decimal") {
        setExpression(getExpression() + ".");
    } else if (this.id == "equals") {
        setResult(operate(parsedExpression[1], parsedExpression[0], parsedExpression[2]));
    } else {
        setExpression(getExpression() + this.textContent);
    }

    parsedExpression = parseExpression();
    if (parsedExpression[3] !== undefined) {
        setResult(operate(parsedExpression[1], parsedExpression[0], parsedExpression[2]));
        setExpression(getResult() + parsedExpression[3]);
    }

    const displayExpression = document.querySelector(".display .expression");
    displayExpression.textContent = getExpression();

    const displayResult = document.querySelector(".display .result");
    displayResult.textContent = getResult();

    if (this.id == "equals") {
        setExpression(getResult());
    }
}

// Expression and Result Manipulation //
function setExpression(text) {
    expression = text;
}

function getExpression() {
    return expression;
}

function setResult(text) {
    result = text;
}

function getResult() {
    return result;
}

function parseExpression() {
    // Separate the expression into operands and operator for evaluation
    // toString needed in case parsing a single value
    return getExpression().toString().split(/(\/|\*|\+|-)/);
    //console.log(parsedExpression);
}

// Event Listener //
function initButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", updateDisplay);
    });
}

let expression = "";
let result = ""

initButtons();