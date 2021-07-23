import React from 'react'
import { connect } from 'react-redux'
import {
  Productnav,
  Account,
  Services,
  Footer,
  NewsLetter,
} from '../components'
import { checkAuthenticated, load_user } from '../actions/auth'
const AccountPage = () => {
  React.useEffect(() => {
    checkAuthenticated()
    load_user()
  }, [])
  return (
    <div>
      <Productnav />
      <Account />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, { load_user, checkAuthenticated })(
  AccountPage
)
