/*-------------------------------- Constants --------------------------------*/
const OPERATIONS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,  // Added subtraction
    '*': (a, b) => a * b,
    '/': (a, b) => b !== 0 ? a / b : "Error: Division by zero"
};

/*-------------------------------- Variables --------------------------------*/
let currentNumber = '';
let previousNumber = null;
let operation = null;
let result = 0;

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');


const clearButton = document.querySelector('.button.operator')

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

clearButton.addEventListener('click', clearDisplay);


/*-------------------------------- Functions --------------------------------*/
function handleButtonClick(event) {
    const value = event.target.textContent;
    if (event.target.classList.contains('number')) {
        handleNumber(value);
    } else if (event.target.classList.contains('operator')) {
        handleOperator(value);
    } else if (event.target.classList.contains('equals')) {
        calculate();
    }
}

function handleNumber(number) {
    currentNumber += number;
    updateDisplay(currentNumber);
}

function handleOperator(op) {
    if (currentNumber === '') return;  // No action if no number entered yet
    if (previousNumber !== null) calculate();  // If there's an ongoing calculation, finish it
    previousNumber = parseFloat(currentNumber);
    operation = op;
    currentNumber = '';  // Reset for next number input
    updateDisplay(operation);  // Show the operation or previous number if preferred
}

function calculate() {
    if (operation === null || previousNumber === null) return;
    let current = parseFloat(currentNumber);
    if (isNaN(current)) current = 0;  // Handle cases where currentNumber is not a number

    result = OPERATIONS[operation](previousNumber, current);
    updateDisplay(result);
    previousNumber = result;
    currentNumber = '';
    operation = null;  // Reset operation for new calculation
}

function updateDisplay(value) {
    if (typeof value === 'number') {
        display.textContent = value.toFixed(2);
    } else {
        display.textContent = value;
    }
}


function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    selectedOperator = null
    operation = null;
    result = 0;
    updateDisplay(0);  // Reset display to 0
}