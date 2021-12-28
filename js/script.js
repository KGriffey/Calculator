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
        return "ERR: DIV 0";
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
        return "error";
    }
}

// Calculator updater //
function updateCalc() {
    // Update expression based on key pressed
    updateExpression(this);

    // Evaluate expression if needed
    evaluateExpression();

    // Display new expression and/or results
    updateDisplay();
}

// Display Functions //
function updateDisplay() {
    const displayExpression = document.querySelector(".display .expression");
    displayExpression.textContent = getExpression();

    const displayResult = document.querySelector(".display .result");
    displayResult.textContent = getResult();
}

// Expression and Result Manipulation //
function evaluateExpression() {
    // Get parsed expression
    const parsedExpression = parseExpression();

    // Evaluate expression
    if (parsedExpression[3] !== undefined) {
        setResult(operate(parsedExpression[1], parsedExpression[0], parsedExpression[2]));
        if (parsedExpression[3] != "=") {
            setExpression(getResult() + parsedExpression[3]);
        } else {
            setExpression(getResult());
        }
    }
}

function updateExpression(button) {
    // Get parsed expression
    const parsedExpression = parseExpression();
    const regexOperator = /(\/|\*|\+|-)/;
    const regexDecimal = /\./;

    if (button.id == "backspace") {
        backspace();
    } else if (button.id == "power") {
        setExpression(getExpression() + "^");
    } else if (button.id == "sign") {

    } else if (button.id == "clear") {
        clear();
    } else if (button.id == "decimal") {
        // Add decimal only if one hasn't already been used in current number
        if (!regexDecimal.test(parsedExpression[parsedExpression.length - 1])) {
            setExpression(getExpression() + ".");
        }
    } else if (button.id == "equals") {
        // Add equals to expression only if the current expression can be evaluated
        if (parsedExpression[2]) {
            setExpression(getExpression() + "=");
        }
    } else if (button.id == "add" || button.id == "subtract" || button.id == "multiply" || button.id == "divide") {
        // Add operator only if one hasn't already been used OR the current expression can be evaulated
        if (!regexOperator.test(expression) || parsedExpression[2]) {
            setExpression(getExpression() + button.textContent);
        }
    } else {
        if (getExpression() != getResult()) {
            setExpression(getExpression() + button.textContent);
        } else {
            clear();
            setExpression(button.textContent);
        }
    }
}

function backspace() {
    // Delete entries up to the result. If user attempts to delete result then clear.
    if (getExpression() != getResult()) {
        setExpression(getExpression().toString().slice(0, getExpression.length - 1));
    } else {
        clear();
    }
}

function clear() {
    setExpression("");
    setResult("");
}

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
    return getExpression().toString().split(/(\/|\*|\+|-|\^|=)/);
    //console.log(parsedExpression);
}

// Event Listener //
function initButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", updateCalc);
    });
}

let expression = "";
let result = ""

initButtons();