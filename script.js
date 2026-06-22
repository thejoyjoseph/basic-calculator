let currentInput = "";
let expression = "";
let isFinished = false;

const historyDisplay = document.getElementById('history');
const resultDisplay = document.getElementById('result');

// Function to add numbers to the screen
function appendNumber(number) {
    if (isFinished) {
        currentInput = number;
        expression = "";
        isFinished = false;
    } else {
        // Prevent multiple decimals in one number
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

// Function to handle operators (+, -, *, /, %)
function appendOperator(op) {
    if (currentInput === "" && expression === "") return;
    
    if (isFinished) {
        expression = currentInput + " " + op + " ";
        isFinished = false;
    } else {
        expression += currentInput + " " + op + " ";
    }
    
    currentInput = "";
    updateDisplay();
}

// DELETE function: removes the last character
function deleteLast() {
    if (isFinished) return;
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// CLEAR function: resets everything
function clearAll() {
    currentInput = "";
    expression = "";
    isFinished = false;
    updateDisplay();
}

// CALCULATE function: shows work and gives answer
function calculate() {
    if (currentInput === "" && expression === "") return;

    let finalExpression = expression + currentInput;
    
    try {
        // eval() takes the string (e.g., "2 + 2") and does the math
        let result = eval(finalExpression);
        
        // Show the full work in the history section
        historyDisplay.innerText = finalExpression + " =";
        
        // Show final answer in the main section
        resultDisplay.innerText = result;
        
        // Prepare for next calculation
        currentInput = result.toString();
        expression = "";
        isFinished = true;
    } catch (error) {
        resultDisplay.innerText = "Error";
        currentInput = "";
        expression = "";
    }
}

// Update the HTML elements
function updateDisplay() {
    resultDisplay.innerText = currentInput || "0";
    historyDisplay.innerText = expression;
}