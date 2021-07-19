import React, { useState } from 'react'
import styled from 'styled-components'
import BussinessDetails from './BussinessDetails'
import CreateProduct from './CreateProduct'
import { Link } from 'react-router-dom'

const SellerAccount = () => {
  const [value, setValue] = useState(<BussinessDetails />)

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
                    <p>Welcome, Vaibhav Shinde</p>
                  </div>
                  <div className='card-text'>
                    <p>
                      <button onClick={() => setValue(<BussinessDetails />)}>
                        Bussiness Detail
                      </button>
                    </p>
                    <p>
                      <button onClick={() => setValue(<CreateProduct />)}>
                        Add Products
                      </button>
                    </p>

                    <Link to=''>Help</Link>
                  </div>
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

export default SellerAccount
