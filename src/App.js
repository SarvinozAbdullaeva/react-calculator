import React from 'react'
import Calculator from './Calculator.js'

function App() {

  return React.createElement(
    'div',
    { className: 'page' },
    React.createElement(Calculator)
  )
}

export default App
