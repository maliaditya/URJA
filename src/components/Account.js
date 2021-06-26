import React, { useState } from 'react'
import styled from 'styled-components'
import PersonalInfo from './PersonalInfo'
import ManageContact from './ManageContact'
import CompanyInfo from './CompanyInfo'

const Account = () => {
  const [value, setValue] = useState(<PersonalInfo />)
  return (
    <Wrapper className='content'>
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-3 vl contain-fluid'>
            <p>Welcome, Vaibhav Shinde</p>

            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  <div className='card-title'> Account Settings</div>
                  <div className='card-text'>
                    <button onClick={() => setValue(<PersonalInfo />)}>
                      Personal Information
                    </button>
                    <br />
                    <button onClick={() => setValue(<CompanyInfo />)}>
                      {' '}
                      Company Information
                    </button>
                    <br />
                    <button onClick={() => setValue(<ManageContact />)}>
                      Manage Contact
                    </button>
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
                    <button>My Coupons</button>
                    <button>My Reviews and ratings</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8 container'>{value}</div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.card-title{
color:black;
}
.card-text button{
  background-color:white;
  border:none;
  margin-top:5px;   
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
export default Account
