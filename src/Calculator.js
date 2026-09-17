import { useState } from 'react'
import React from 'react'
import './Calculator.css'

// not to type React.createElement a hundred times
const e = React.createElement

// The four operations the calculator supports.
const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => (b === 0 ? 'Error' : a / b),
}

function Calculator() {
  // What's currently shown on the screen
  const [display, setDisplay] = useState('0')
  // The number that was on screen before an operator was pressed
  const [storedValue, setStoredValue] = useState(null)
  // Which operator is currently selected (+, -, ×, ÷)
  const [operator, setOperator] = useState(null)
  // True right after pressing an operator, so the next digit
  // starts a fresh number instead of appending to the old one
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  function inputDigit(digit) {
    if (waitingForNewValue) {
      setDisplay(String(digit))
      setWaitingForNewValue(false)
    } else {
      // Don't let the display fill up with leading zeros
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  function inputDecimal() {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
      return
    }
    // Only add a decimal point if there isn't one already
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  function clearAll() {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(display)

    if (storedValue === null) {
      // First operator press: just remember the current number
      setStoredValue(inputValue)
    } else if (operator && !waitingForNewValue) {
      const result = OPERATIONS[operator](storedValue, inputValue)
      setDisplay(String(result))
      setStoredValue(result)
    }

    setWaitingForNewValue(true)
    setOperator(nextOperator)
  }

  function calculateResult() {
    if (operator === null || storedValue === null) return

    const inputValue = parseFloat(display)
    const result = OPERATIONS[operator](storedValue, inputValue)

    setDisplay(String(result))
    setStoredValue(null)
    setOperator(null)
    setWaitingForNewValue(true)
  }

  // The button layout, row by row
  const buttonRows = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  function handleButtonClick(label) {
    if (label === '=') {
      calculateResult()
    } else if (label === '.') {
      inputDecimal()
    } else if (['+', '-', '×', '÷'].includes(label)) {
      handleOperator(label)
    } else {
      inputDigit(label)
    }
  }

  // Build the 16 button elements from buttonRows
  const buttonElements = buttonRows.flat().map((label) => {
    const isOperator = ['+', '-', '×', '÷'].includes(label)
    const isEquals = label === '='

    let className = 'calculator__button'
    if (isOperator) className += ' calculator__button--operator'
    if (isEquals) className += ' calculator__button--equals'

    return e(
      'button',
      {
        key: label,
        className: className,
        onClick: () => handleButtonClick(label),
      },
      label
    )
  })

  return e(
    'div',
    { className: 'calculator' },
    // screen
    e(
      'div',
      { className: 'calculator__screen' },
      e(
        'span',
        { className: 'calculator__operator-hint' },
        storedValue !== null && operator ? `${storedValue} ${operator}` : ''
      ),
      e('span', { className: 'calculator__display' }, display)
    ),
    // reset button
    e(
      'button',
      { className: 'calculator__clear', onClick: clearAll },
      'Reset'
    ),
    // button grid
    e('div', { className: 'calculator__grid' }, ...buttonElements)
  )
}

export default Calculator
