import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import verified from '../assets/verified.svg'

const UsersInfo = () => {
  return (
    <Wrapper className='content'>
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-4 contain-fluid'>
            <p>Welcome, Vaibhav Shinde</p>
            <div className='contain'>
              <img
                className='contain__image'
                src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              />

              <div className='review '>
                <div className='card '>
                  <div className='card-title'> Vaibhav Shinde</div>
                  <div className='card-text'>shindevaibhav08@gmail.com</div>
                </div>
              </div>
            </div>
            <hr />
            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  <div className='card-title'> Account Settings</div>
                  <div className='card-text'>
                    <p>
                      <a href=''>Personal Information</a>
                    </p>
                    <p>
                      <a href=''>Company Information</a>
                    </p>
                    <a href=''>Manage Contact</a>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  <div className='card-title'> My Stuff</div>
                  <div className='card-text'>
                    <p>
                      <a href=''>My Coupons</a>
                    </p>
                    <p>
                      <a href=''>My Reviews and ratings</a>
                    </p>
                    <a href=''>Manage Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
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
    font-size: 1.3rem;
    font-weight: 700;
  }

  hr {
    border: 2px solid black;
  }
`
export default UsersInfo
