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
const displayCurrent = document.querySelector(".displayCurrent")
const operands = document.querySelectorAll(".operand");
const expressions = []
const firstNumber = document.querySelector(".first")

operands.forEach(button => {
  
  button.addEventListener("click", e => {
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
