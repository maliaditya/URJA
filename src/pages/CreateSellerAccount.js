import React from 'react'
import { Productnav, SellerAccount } from '../components'
import { connect } from 'react-redux'
const CreateSellerAccount = () => {
  return (
    <div style={{ marginTop: '7rem' }}>
      <Productnav />
      <SellerAccount></SellerAccount>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, {})(CreateSellerAccount)
