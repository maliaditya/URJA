import React, { useState } from 'react'
import styled from 'styled-components'
import BussinessDetails from './BussinessDetails'
import CreateProduct from './CreateProduct'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SellerAccount = ({ user }) => {
  const [value, setValue] = useState()

  user = JSON.parse(localStorage.getItem('user') || '[]')

  return (
    <Wrapper className='content'>
      <div className='col-md-12'>
        <h4>Create your seller account</h4>
        <div className='row'>
          <div className='col-md-4 contain-fluid vl'>
            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  <div className='card-title'>
                    <p>
                      Welcome, {user.first_name} {user.last_name}
                    </p>
                  </div>
                  {user.company_details.length === 0 ? (
                    <div className='card-text'>
                      <div>
                        <button onClick={() => setValue(<BussinessDetails />)}>
                          Add Bussiness Details
                        </button>
                      </div>
                      <br />
                      <Link to=''>Help</Link>
                    </div>
                  ) : (
                    <div className='card-text'>
                      {/* <div>
                      
                      <button onClick={() => setValue(<BussinessDetails />)}>
                        Add Bussiness Details
                      </button>
                    </div> */}
                      <div>
                        <button onClick={() => setValue(<CreateProduct />)}>
                          Add Products
                        </button>
                      </div>
                      <br />
                      <Link to=''>Help</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8'>{value}</div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.card-text button{
  background-color:white;
  border:none;
}
.active{
  color:#ffc232;
}

.vl {
  border-right: 1px solid black;
  height: 500px;
}
a{
    color:black;
}

.card-text button:hover{
    color:#ffc232;
}


a:hover{
    color:#ffc232;
}

br{
    margin-bottom:1rem;

}
  overflow: hidden;

  hr {
    border: 0.1rem solid black;
}
  svg {
    margin-top: 2.5rem;
  }
  .col-md-8{
     float:left;
  }
   .contain {
          &__image {
              margin-top: 2rem;
              margin-bottom: 2rem;
              width: 100px;
              height: 100px;
              background-size: cover;
              display: block;
              border-radius: 1rem;
              margin-left:2rem;
              border: 2px solid grey;
          
            }
        }


  .col-md-12 {
    margin: 1rem;
    border-right: 1px solid grey:
  }
  @media(min-width:720px){
    svg{
        display:none;
    }
      .contain {
          &__image {
              margin-top: 2rem;
              margin-bottom: 2rem;
              width: 100px;
              height: 100px;
              background-size: cover;
              display: block;
              border-radius: 100px;
              border: 2px solid grey;
              
              -webkit-border-radius: 100px;
              -moz-border-radius: 100px;
            }
        }
    }
     @media(min-width:1300px){

      .contain {
          display:flex;
          &__image {
              margin-top: 2rem;
              margin-bottom: 2rem;
              width: 100px;
              height: 100px;
              background-size: cover;
              display: block;
              border-radius: 100px;
              border: 2px solid grey;
              
              -webkit-border-radius: 100px;
              -moz-border-radius: 100px;
            }
        }
    }

  .card {
    width: 15rem;
    margin-left: 2rem;
    margin-top: 2rem;
    border: none;
  }
  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
  }

  hr {
    border: 2px solid black;
  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearched: state.auth.itemSearched,
  }
}

export default connect(mapStateToProps, {})(SellerAccount)
