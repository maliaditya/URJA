import React from 'react'
import { Productnav, SellerAccount } from '../components'
import { checkAuthenticated, load_user } from '../actions/auth'
import { connect } from 'react-redux'
const CreateSellerAccount = () => {
  React.useEffect(() => {
    checkAuthenticated()
    load_user()
  }, [])
  return (
    <React.Fragment>
      <Productnav />
      <SellerAccount></SellerAccount>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, { load_user, checkAuthenticated })(
  CreateSellerAccount
)
