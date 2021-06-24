import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  HomePage,
  SingleProductPage,
  CategoriesPage,
  FavouritesPage,
  SignupPage,
  LoginPage,
} from './pages'
import { Error } from './components'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/product'>
          <SingleProductPage />
        </Route>
        <Route path='/categories'>
          <CategoriesPage />
        </Route>
        <Route path='/favourites'>
          <FavouritesPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
