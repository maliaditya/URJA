import React from 'react'
import { connect } from 'react-redux'


const Maintenance = () => {
 
  return (
    <div className="container" >
      <h1
        style={{
            
          margin: 'auto',
          width: '80%',
          border: '3px solid red',
          padding: '40vh',
        }}
      >
        Temporarily under maintenance
      </h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, {})(Maintenance)

