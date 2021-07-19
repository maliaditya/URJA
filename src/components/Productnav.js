import React from 'react'
import { connect } from 'react-redux'
import {logout} from '../actions/auth'
import Demo from './ProductNavDemo'
// import  Sidebar  from './Sidebar';
// import  Submenu  from './Submenu';

const Productnav = ({ logout}) => {

  return (
  <div>
      {/* <Sidebar />
      <Submenu /> */}
      <Demo logout={logout} ></Demo>
  </div>
  )
}

const mapStateToProps = state => {
  return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps, {logout})(Productnav)
