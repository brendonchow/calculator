const displayCurrent = document.querySelector(".displayCurrent");
const operands = document.querySelectorAll(".operand");
const displayPrev = document.querySelector(".displayPrev");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");

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
  displayPrev.textContent = `${displayCurrent.textContent} ${operator}`; 
}

const equal = document.querySelector(".equal");
equal.addEventListener("mousedown", inputEqual)
function inputEqual() {
  if (operator && prevNumber) {
    displayPrev.textContent = `${prevNumber} ${operator} ${displayCurrent.textContent} =`;
    reset("");
  }
}

function reset(operatorVal) {
  displayCurrent.textContent = Math.round(operate(prevNumber, operator, displayCurrent.textContent) * 1000) / 1000;
  prevNumber = "";
  operator = operatorVal;
}

operands.forEach(button => button.addEventListener("mousedown", e => inputOperand(e.target.textContent)));
function inputOperand(value) {
  if (operator && !prevNumber) {
    prevNumber = displayCurrent.textContent;
    displayCurrent.textContent = "0";
  }    
  if (displayCurrent.textContent === "0" && value !== ".") {
    if (value !== "0") {
      displayCurrent.textContent = value;
    }
  } 
  else {
    if (value === ".") { 
      if (displayCurrent.textContent.includes(".")) return;
    }
    displayCurrent.textContent += value;
  }
}

const clear = document.querySelector(".clear");
clear.addEventListener("click", inputClear);
function inputClear() {
  displayCurrent.textContent = "0";
  displayPrev.textContent = "";
  prevNumber = "";
  operator = "";
}

backspace.addEventListener("mousedown", () => inputBackspace);
function inputBackspace() {
  let currentNumber = displayCurrent.textContent
  if (currentNumber !== "0") {
    if (currentNumber.length === 1) displayCurrent.textContent = "0";
    else displayCurrent.textContent = currentNumber.slice(0, currentNumber.length - 1);
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
  