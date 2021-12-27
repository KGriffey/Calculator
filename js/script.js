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

// Display Functions //
function updateDisplay() {
    if(this.id == "backspace"){
        //make this into a function
        setDisplayText(getDisplayText().slice(0,getDisplayText.length-1));
    } else if(this.id == "power"){
        setDisplayText(getDisplayText() + "^");
    } else if(this.id == "sign"){
        //future
    } else if(this.id == "clear"){
        setDisplayText("");
    } else if(this.id == "decimal"){
        setDisplayText(getDisplayText() + ".");
    } else if(this.id == "equals"){
        //future
    } else{
        setDisplayText(getDisplayText() + this.textContent);
    }

    const display = document.querySelector(".display .expression");
    display.textContent = displayText;
}

function setDisplayText(text) {
    displayText = text;
}

function getDisplayText(){
    return displayText;
}

function initButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click",updateDisplay);
    });
}

let displayText = "";

initButtons();