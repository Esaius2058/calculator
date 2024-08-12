const buttons = document.querySelectorAll("input");
const display = document.getElementById("display");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let isActive = false;

const updateDisplay = () => {
    display.innerText = displayValue;
}

updateDisplay();

const inputOperand = (operand) => {
    if(operator === null){
        if (displayValue === "0" || displayValue === 0){
            //1st click - handles first operand input
            displayValue = operand;
            firstOperand = displayValue;
        } else {
            displayValue += operand;
            firstOperand = displayValue;
        }
    } else {
        // handles secondOperand input
        if (displayValue === firstOperand){
            displayValue = operand;
            secondOperand = displayValue;
        } else {
            displayValue += operand;
            secondOperand = displayValue;        
        }
    }
}

const inputOperator = (op) => {
    if (operator === null){
       operator = op;
       firstOperand = displayValue; 
    } else if (operator != null ) {
        secondOperand = displayValue;
    }

    isActive = true;
    updateDisplay();
}

const operate = (a, b, op) => {
    if(op === '+') {
        return a + b;
    } else if(op === '-') {
        return a - b;
    } else if(op === '*') {
        return a * b;
    } else if(op === '/') {
        if(b === 0) {
            return 'error';
        } else {
        return a / b;
        }
    }
}

const roundAccurately = (num, places) => {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

const inputClear = () => {
    /**numbers = Array.from(displayValue);
    if (numbers.length > 0){
        numbers.pop();
        newNum = numbers.join("");
        if (firstOperand === null){
            firstOperand = newNum;
            displayValue = firstOperand;
        } else {
            secondOperand = newNum;
            displayValue = secondOperand;
        }

    } else {
        displayValue = "0";
    }**/
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    isActive = false;
    updateDisplay();
}

const inputEquals = () => {
    if (operator === null){
        displayValue = displayValue;
    } else if (operator != null){
        result = operate(Number(firstOperand), Number(secondOperand), operator);
        if (result === "error"){
            isActive = false;
            displayValue = "error";
        }else {
            displayValue = roundAccurately(result, 10).toString();
            firstOperand = displayValue;
            secondOperand = null;
            operator = null;
            result = null;
            isActive = false;
        }
    }
}


const inputDecimal = (dot) => {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue += dot;
    } 
}

const inputPercent = (num) => {
    displayValue = (num/100).toString();
}

const inputRoot = (num) => {
    var sqrt = Math.sqrt(num);
    displayValue = sqrt.toString();
    updateDisplay();
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList.contains("operand")){
            inputOperand(e.target.value);
            updateDisplay();
        } else if (button.classList.contains("operator")){
            inputOperator(e.target.value);

            if (isActive) {
                button.classList.add("operator-active");
            }

            isActive = false;
            updateDisplay();
        } else if (button.classList.contains("clear")){
            inputClear();
        } else if (button.classList.contains("dot")){
            inputDecimal(button.value);
            updateDisplay();
        } else if (button.classList.contains("percent")){
            inputPercent(displayValue);
            updateDisplay();
        } else if (button.classList.contains("root")){
            inputRoot(displayValue);
            updateDisplay();
        } else if (button.classList.contains("equals")){
            inputEquals();
            updateDisplay();
        }
    })
})