let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

const display = document.getElementById('display');

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    } else if (key === '/' || key === '*' || key === '-' || key === '+') {
        chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput.toString() + number.toString();
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

function chooseOperation(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput !== '') {
        if (operation !== null) {
            calculate();
        } else {
            previousInput = currentInput;
        }
    }
    operation = op;
    shouldResetScreen = true;
    display.value = `${previousInput} ${operation}`;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    currentInput = computation;
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}
