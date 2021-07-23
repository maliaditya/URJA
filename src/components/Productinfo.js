import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Productinfo = ({ currentItem, currentCompany }) => {
  currentItem = JSON.parse(localStorage.getItem('currentItem') || '[]')
  currentCompany = JSON.parse(localStorage.getItem('currentCompany') || '[]')

  return (
    <Reviewwrap className='content'>
      <div id='product' className='container'>
        <p className='ttag'>Product Details</p>
        <div className='text'>{currentItem.details}</div>
      </div>

      <div className='container'>
        <p className='ttag'>Company Details</p>
        <div className='text'>{currentCompany.company_details}</div>
      </div>
      <br />
    </Reviewwrap>
  )
}

const Reviewwrap = styled.section`
  .container {
    padding-top: 0.5rem;
  }

  .ttag {
    padding-top: 5rem;

    font-size: 1.54rem;
    color: black;
    font-weight: 700;
  }
  .text {
    text-indent: 5rem;
  }
  .seller {
    padding-left: 5rem;
  }

  @media (min-width: 1400px) {
    .content {
      max-width: 1300px;
      margin: auto;
      background: white;
      padding: 10px;
    }
  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult: state.auth.itemSearchedResult,
    currentCompany: state.auth.currentCompany,
  }
}

export default connect(mapStateToProps, {})(Productinfo)
