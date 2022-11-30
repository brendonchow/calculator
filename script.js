const displayCurrent = document.querySelector(".displayCurrent");
const operands = document.querySelectorAll(".operand");
const displayPrev = document.querySelector(".displayPrev");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");

equal.addEventListener("mousedown", inputEqual)
clear.addEventListener("click", inputClear);
backspace.addEventListener("mousedown", inputBackspace);

operands.forEach(button => button.addEventListener("mousedown", e => inputOperand(e.target.textContent)));

operators.forEach(button => {
  button.addEventListener("mousedown", e => inputOperator(e.target.textContent));
})

let prevNumber = "";
let operator = "";
let currentNumber = "";

function inputOperator(value) {
  if (divideByZero(operator, currentNumber)) return;
  else if (currentNumber && prevNumber) {
    displayCurrent.textContent = Math.round(operate(prevNumber, operator, currentNumber) * 1000) / 1000;
  }
  operator = value;
  prevNumber = displayCurrent.textContent;
  currentNumber = "";
  displayPrev.textContent = `${prevNumber} ${operator}`; 
}

function inputEqual() {
  if (operator && prevNumber && currentNumber) {
    if (divideByZero(operator, currentNumber)) return
    displayPrev.textContent = `${prevNumber} ${operator} ${currentNumber} =`;
    displayCurrent.textContent = Math.round(operate(prevNumber, operator, currentNumber) * 1000) / 1000;
    currentNumber = displayCurrent.textContent;
    prevNumber = ""
    operator = ""
  }
}

function divideByZero(operator, currentNumber) {
  if (operator === "/" && currentNumber === "0") {
    alert("DIVIDING BY ZERO");
    return true;
  }
}

function inputOperand(value) {
  if (value === "." && currentNumber.includes(".")) return;
  else if (currentNumber === "" || currentNumber === "0") {
    if (value !== ".") displayCurrent.textContent = value     
    else displayCurrent.textContent = "0.";
    currentNumber = displayCurrent.textContent;
  } else {
    displayCurrent.textContent += value;
    currentNumber += value;
  }
}

function inputClear() {
  displayCurrent.textContent = "0";
  displayPrev.textContent = "";
  currentNumber = "";
  prevNumber = "";
  operator = "";
}

function inputBackspace() {
  if (displayCurrent.textContent.length > 0) {
    displayCurrent.textContent = displayCurrent.textContent.substr(0, displayCurrent.textContent.length - 1);
    currentNumber = currentNumber.substr(0, currentNumber.length - 1);
  }
}

const choice = {
  operand(value) {
    inputOperand(value);
  },
  operator(value) {
    inputOperator(value);
  },
  backspace() {
    inputBackspace();
  },
  equal() {
    inputEqual();
  },
  clear() {
    inputClear();
  }
}

window.addEventListener("keydown", event => {
  const button = document.querySelector(`[data-key="${event.key}"]`);
  if (button) choice[button.classList.value](button.textContent);
});

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
  