/* console.log("DOM Test: ")
   if (typeof(Storage) !== "undefined") {
     console.log('Browser mendukung sessionStorage/localStorage.')
   } else {
     console.log('Browser tidak mendukung sessionStorage/LocalStorage')
   } */

// definision
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false, //waiting when we click
};

// print button number on displayNumber
function updateDisplay() {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// for displayNumber not 0 when we input number
function inputDigit(digit) {
  if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
    calculator.displayNumber = digit;
  } else {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

const buttons = document.querySelectorAll('.button');
for (let button of buttons) {
  button.addEventListener('click', function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // clear button == CE
    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // negative button == +/-
    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;

      if (button.classList.contains('negative')) {
        calculator.displayNumber = '-';
      }
    }

    // equals button == =
    if (target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    // operator button == + or - or * or /
    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      // calculator.displayNumber = target.innerText;
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

// inverseNumber definition == negative button +/-
function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// operator function == operator button + or - or * or /
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else {
    alert('Operator sudah ditetapkan');
  }
}

// value calculate
function performCalculation() {
  /* fulfilled == terpenuhi
	   If it is not fulfilled then the process will be canceled. 
	   But if the calculation is fulfilled, it will be done. */
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
    return;
  }

  let result = 0;
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else if (calculator.operator === '*') {
    result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
  } else if (calculator.operator === '/') {
    result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
  } else if (calculator.operator === '%') {
    result = parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}
