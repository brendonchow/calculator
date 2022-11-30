const displayCurrent = document.querySelector(".displayCurrent");
const operands = document.querySelectorAll(".operand");
const firstNumber = document.querySelector(".first");
const displayPrev = document.querySelector(".displayPrev");
const operators = document.querySelectorAll(".operator");

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

function operate(operator, x, y) {
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

let currentNumber = 0;
let prevNumber = 0;
let operator = "";

operators.forEach(operator => {
  operator.addEventListener("mousedown", event => {
    operators.forEach(operator => operator.classList.remove("operatorActive"));
    event.target.classList.add("operatorActive");
  });
})

operands.forEach(button => {
  
  button.addEventListener("mousedown", e => {
    let buttonNumber = e.target.textContent;
    if (displayCurrent.textContent == 0) firstNumber.textContent = buttonNumber;
    else {
      const newNumber = document.createElement("span");
      newNumber.textContent = e.target.textContent;
      displayCurrent.appendChild(newNumber);
    }
    expressions.push(parseInt(buttonNumber));
  })
});

const equal = document.querySelector(".equal");
equal.addEventListener("mousedown", event => {
  operators.forEach(operator => operator.classList.remove("operatorActive"));
})

const clear = document.querySelector(".clear");
clear.addEventListener("click", event => {
  firstNumber.textContent = 0;
  displayCurrent.replaceChildren(firstNumber);
  displayPrev.textContent = "";
})
