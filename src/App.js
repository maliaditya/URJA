import React, { useEffect }   from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  HomePage,
  SingleProductPage,
  CategoriesPage,
  FavouritesPage,
  LoginPage,
  CreateSellerAccount,
  AccountPage,
  ResetPassword,
  ResetPasswordConfirm,
  Activate,
  SignupInfo,
} from './pages'

import Signup from './components/Signup'
import { Error } from './components'
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from './actions/auth'
import TestImage from './pages/TestImage'
import { AppProvider } from './components/context';
function App(props) {
   useEffect(()=>{
    props.checkAuthenticated()
    props.load_user()
  },[])
  return (
  <AppProvider>
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/product' component={SingleProductPage} />
          <Route exact path='/categories' component={CategoriesPage} />
          <Route exact path='/image' component={TestImage} />
          <Route exact path='/favourites' component={FavouritesPage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/reset_password' component={ResetPassword} />
          <Route
            exact
            path='/password/reset/confirm/:uid/:token'
            component={ResetPasswordConfirm}
          />
          <Route exact path='/activate/:uid/:token' component={Activate} />
          <Route exact path='/selleracc' component={CreateSellerAccount} />
          <Route exact path='/account' component={AccountPage} />
          <Route exact path='/signup_info' component={SignupInfo} />
          <Route path='/*' component={Error} />
        </Switch>
      </Router>
  </AppProvider>
  )
}

export default connect(null,{checkAuthenticated, load_user})(App)
