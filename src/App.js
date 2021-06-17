import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { HomePage } from './pages'

function App() {
  return (
    <>
      <HomePage />
    </>
  )
}

export default App
