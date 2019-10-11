import React from 'react'
import './App.css'

import { BrowserRouter } from 'react-router-dom'

import AppClass from './AppClass'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppClass />
      </div>
    </BrowserRouter>
  )
}

export default App
