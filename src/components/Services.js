import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import verified from '../assets/verified.svg'
import customersupport from '../assets/customersupport.svg'

const Services = () => {
  return (
    <ServicesContainer>
      <div className='col-12'>
        <div className='row'>
          <div className='container'>
            <img className='container__image' src={verified} />
            <div className='container__text'>
              <h5>Verified Sellers</h5>
              <p>Buy products from verified sellers from all over the world</p>
            </div>
          </div>
          <div className='container'>
            <img className='container__image' src={logo} />
            <div className='container__text'>
              <h5>Advertise with us</h5>
              <p>Increase your sell by allowing us to promote your products</p>
            </div>
          </div>
          <div className='container'>
            <img className='container__image' src={customersupport} />
            <div className='container__text'>
              <h5>Customer Support</h5>
              <p>Need help? Inform us!</p>
            </div>
          </div>
        </div>
      </div>
    </ServicesContainer>
  )
}

const ServicesContainer = styled.section`
  color: black;
  h5 {
    font-size: 1.7rem;
    font-weight: 700;
  }
  p {
    font-size: 1.2rem;
  }
  .row {
    margin-top: 5rem;
  }
  .container {
    padding: 1rem;
    max-width: 28rem;
    display: flex;
    &__image {
      margin-right: 1rem;
      object-fit: contain;
      align-self: flex-start;
    }
    &__text {
      flex: 1 1 auto;
    }
  }

  overflow: hidden;

  @media (min-width: 776px) {
    h5 {
      font-size: 2rem;
      font-weight: 700;
    }
    .container {
      max-width: 31rem;
      display: flex;
      &__image {
        margin-right: 1rem;
        object-fit: contain;
        align-self: flex-start;
      }
      &__text {
        flex: 1 1 auto;
      }
    }
  }
`

export default Services
