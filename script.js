const displayCurrent = document.querySelector(".displayCurrent");
const operands = document.querySelectorAll(".operand");
const displayPrev = document.querySelector(".displayPrev");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".delete");

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return  x / y;
}

function operate(x, operator, y) {
  x = parseFloat(x);
  y = parseFloat(y);
  switch (operator) {
    case "+": 
      return add(x, y);
    
    case "-":
      return subtract(x, y);
    
    case "*":
      return multiply(x, y);
    
    case "/":
      return divide(x, y);
  }
}

let currentNumber = "0";
let prevNumber = "";
let operator = "";

operators.forEach(button => {
  button.addEventListener("mousedown", e => inputOperator(e.target.textContent));
})

function inputOperator(value) {
    if (!prevNumber) {
      operator = value;
    } else {
      reset(value);
    }
    displayPrev.textContent = `${currentNumber} ${operator}`; 
  }

const equal = document.querySelector(".equal");
equal.addEventListener("mousedown", event => {
  operators.forEach(operator => operator.classList.remove("operatorActive"));
  if (operator && prevNumber && currentNumber) {
    displayPrev.textContent = `${prevNumber} ${operator} ${currentNumber} =`;
    reset("");
  }
})

function reset(operatorVal) {
  currentNumber = Math.round(operate(prevNumber, operator, currentNumber) * 1000) / 1000;
  currentNumber = currentNumber.toString();
  prevNumber = "";
  operator = operatorVal;
  displayCurrent.textContent = currentNumber;
}

operands.forEach(button => {
  button.addEventListener("mousedown", e => inputOperand(e.target.textContent));
});

function inputOperand(value) {
    if (operator && !prevNumber) {
      prevNumber = currentNumber;
      currentNumber = "0";
      displayCurrent.textContent = "0";
    }    
    if (displayCurrent.textContent === "0" && value !== ".") {
      if (value !== "0") {
        displayCurrent.textContent = value;
        currentNumber = value;
      }
    } 
    else {
      if (value === ".") { 
        if (currentNumber.includes(".")) return;
      }
      displayCurrent.textContent += value;
      currentNumber += value;
    }
}

const clear = document.querySelector(".clear");
clear.addEventListener("click", event => {
  displayCurrent.textContent = "0";
  displayPrev.textContent = "";
  currentNumber = "0";
  prevNumber = "";
  operator = "";
});

window.addEventListener("keydown", event => {
  console.log(event);
});