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
    if (b == 0) {
        alert("Can't divide by 0!");
        return ;
    }
    return a / b;
}

function powerOf(a, b) {
    return Math.pow(a, b);
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
    } else if (operator == "^") {
        return powerOf(a, b);
    } else {
        return;
    }
}

// Event Listeners //
function initButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", updateCalc);
    });
}

function appendDigit(number) {
    if (operator == "") {
        operand1 += number;
    } else {
        operand2 += number;
    }
}

function setOperator(newOperator) {
    // Attempt to evaluate the expression first if it's valid 
    evaluate();

    // Set operator if currently blank and operand1 is valid for the expression
    if (operator == "" && !(operand1 == "" || operand1 == "-")) {
        operator = newOperator;
    }
}

function clear() {
    operand1 = "";
    operator = "";
    operand2 = "";
    result = "";
}

function backspace() {
    // Delete from operands or operator depending on what has been filled so far
    if (operand2 != "") {
        operand2 = operand2.toString().slice(0, -1);
    } else if (operator != "") {
        operator = "";
    } else {
        operand1 = operand1.toString().slice(0, -1);
    }
}

function isValidExpression() {
    // Check for a complete expression
    if (operand1 == "" || operator == "" || operand2 == "") {
        return false;
    } else {
        return true;
    }
}

function evaluate() {
    // If the expression is complete, attempt to evaluate it and set up for next expression.
    if (isValidExpression()) {
        // Prevent the calculator from updating if result is NaN (i.e. divide by 0 or invalid expression)
        // Invalid example would be: "- ^ -"
        if (!isNaN(operate(operator, operand1, operand2))){
            // Limit results to a maximum of 8 decimal places
            result = Math.round(operate(operator, operand1, operand2)*100000000)/100000000;
            operand1 = result;
            operator = "";
            operand2 = "";
        }
    }
}

function isNegative(operand) {
    // Check if an operand is negative
    if (operand.toString()[0] == "-") {
        return true;
    } else {
        return false;
    }
}

function negate() {
    // Negate operand2 if operator has been entered. Else, negate operand1
    if (operator != "") {
        if (isNegative(operand2)) {
            operand2 = operand2.toString().slice(1);
        } else {
            operand2 = "-" + operand2;
        }
    } else {
        if (isNegative(operand1)) {
            operand1 = operand1.toString().slice(1);
        } else {
            operand1 = "-" + operand1;
        }
    }
}

function containsDecimal(operand) {
    // Check if operand contains a decimal already
    if (operand.includes(".")){
        return true;
    } else {
        return false;
    }
}

function appendDecimal() {
    if (operator != "") {
        if (!containsDecimal(operand2)) {
            operand2 += ".";
        }
    } else {
        if (!containsDecimal(operand1)) {
            operand1 += ".";
        }
    }
}

function updateCalc() {
    // Update operators or operand
    if (this.className == "number") {
        appendDigit(this.textContent);
    } else if (this.className == "operator") {
        setOperator(this.textContent);
    } else if (this.id == "clear") {
        clear();
    } else if (this.id == "backspace") {
        backspace();
    } else if (this.id == "equals") {
        evaluate();
    } else if (this.id == "sign") {
        negate();
    } else if (this.id == "decimal") {
        appendDecimal();
    }

    // Update the display
    updateDisplay();
}

function updateDisplay() {
    const displayExpression = document.querySelector(".display .expression");
    displayExpression.textContent = `${operand1} ${operator} ${operand2}`;

    const displayResult = document.querySelector(".display .result");
    displayResult.textContent = result;
}

// Global variables and event listener initalization
let operand1 = "";
let operator = "";
let operand2 = "";
let result = "";

initButtons();