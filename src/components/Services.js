import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import verified from '../assets/verified.svg'
import customersupport from '../assets/customersupport.svg'

const Services = () => {
  return (
    <ServicesContainer>
      <div class='col-12'>
        <div class='row'>
          <div className='card col-md-4 mb-4' style={{ maxWidth: '540px' }}>
            <div className='row g-0'>
              <div className='col-md-3'>
                <img src={verified} alt='...' />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>Verified Sellers</h5>
                  <p className='card-text'>
                    Buy products from verified sellers from all over the world
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='card col-md-4 mb-4' style={{ maxWidth: '540px' }}>
            <div className='row g-0'>
              <div className='col-md-3'>
                <img src={logo} alt='...' />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>Advertise with us</h5>
                  <p className='card-text'>
                    Increase your sell by allowing us to promote your products
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='card col-md-4 mb-4' style={{ maxWidth: '540px' }}>
            <div className='row g-0'>
              <div className='col-md-3'>
                <img src={customersupport} alt='...' />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>Customer Support</h5>
                  <p className='card-text'>Need help? Inform us!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicesContainer>
  )
}

const ServicesContainer = styled.section`
  overflow: hidden;

  padding-left: 2rem;

  .card-title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .card {
    border: none;
    padding-top: 2rem;
    padding-left: 5rem;
  }
  @media (min-width: 776px) {
    padding-left: 5rem;
    .seller {
      padding-left: 5rem;
    }
    .card {
      border: none;
      padding-top: 5rem;
      padding-bottom: 5rem;
      padding-left: 1rem;
    }
  }
`

export default Services
