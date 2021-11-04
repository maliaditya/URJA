import React, { useEffect, useState } from 'react'
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
  RecentlyViewedPage,
  Category,
  UnderConstructionPage,
  FAQ,
  HelpCenter,
  Reports,
  TermsConditions,
  WhoAreWE,
  Dashboard,
  Layout,
  MyLinks,
  BecomeMember,
} from './pages'
import { IntlProvider } from 'react-intl'
import messages from './pages/MLM/messages'
import './pages/MLM/styles/App.scss'
import Signup from './components/Signup'
import { Error } from './components'
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from './actions/auth'
// import TestImage from './pages/TestImage'
import { AppProvider } from './components/context'
function App({ checkAuthenticated, load_user, isAuthenticated }) {
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      checkAuthenticated()
      load_user()
    }
    return () => {
      isMounted = false
    }
  }, [checkAuthenticated, load_user])
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          {isAuthenticated ? (
            <Route exact path='/mbw'>
              <IntlProvider locale={locale} messages={messages[locale]}>
                <Layout setLocale={setLocale} />
              </IntlProvider>
            </Route>
          ) : (
            <Route exact path='/mbw'>
              <HomePage />
            </Route>
          )}
          <Route exact path='/become-member' component={BecomeMember} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/faqs' component={FAQ} />
          <Route exact path='/who-r-we' component={WhoAreWE} />
          <Route exact path='/mylinks/:id' component={MyLinks} />
          <Route exact path='/help-center' component={HelpCenter} />
          <Route exact path='/reports' component={Reports} />
          <Route exact path='/terms-conditions' component={TermsConditions} />
          <Route exact path='/product' component={SingleProductPage} />
          <Route exact path='/categories' component={CategoriesPage} />
          <Route exact path='/Category' component={Category} />
          <Route exact path='/comming_soon' component={UnderConstructionPage} />
          {/* <Route exact path='/image' component={TestImage} /> */}
          <Route exact path='/favourites' component={FavouritesPage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/reset_password' component={ResetPassword} />
          <Route exact path='/recently_viewed' component={RecentlyViewedPage} />
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, { checkAuthenticated, load_user })(App)
