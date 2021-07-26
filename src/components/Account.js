import React, { useState } from 'react'
import styled from 'styled-components'
import PersonalInfo from './PersonalInfo'
import ManageContact from './ManageContact'
import CompanyInfo from './CompanyInfo'
import MyProducts from './MyProducts'
import { connect } from 'react-redux'
import EnquiryTable from './EnquiryTable'

const Account = ({ user }) => {
  user = JSON.parse(localStorage.getItem('user') || '[]')
  const [value, setValue] = useState()
  const [menuColor, setMenuColor] = useState()

  const setMenuValues = (component) => {
    setValue(component)
    setMenuColor('#fcc232')
  }

  React.useEffect(() => {
    user.company_details.length !== 0
      ? setValue(<MyProducts />)
      : setValue(<PersonalInfo />)
  }, [user.company_details.length])
  return (
    <Wrapper className='content'>
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-3 vl contain-fluid'>
            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  {' '}
                  <div className='card-title'>
                    <p>
                      Welcome, {user.first_name} {user.last_name}
                    </p>
                  </div>
                  <div className='card-title'> Account Settings</div>
                  <div className='card-text'>
                    {user.company_details.length !== 0 ? (
                      <div>
                        <button onClick={() => setMenuValues(<PersonalInfo />)}>
                          Personal Information
                        </button>
                        <br />
                        <button onClick={() => setMenuValues(<CompanyInfo />)}>
                          {' '}
                          Company Information
                          <br />
                        </button>
                        <button
                          onClick={() => setMenuValues(<ManageContact />)}
                        >
                          Manage Contact
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => setMenuValues(<PersonalInfo />)}>
                          Personal Information
                        </button>
                        <button
                          className='boxClickCss'
                          style={{ color: `${menuColor}` }}
                          onClick={() => setMenuValues(<ManageContact />)}
                        >
                          Manage Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='contain'>
              <div className='review '>
                <div className='card '>
                  {user.company_details.length !== 0 ? (
                    <div>
                      <div className='card-title'> My Stuff</div>
                      <div className='card-text'>
                        <button onClick={() => setValue(<MyProducts />)}>
                          My Products
                        </button>
                        <br />
                        <button onClick={() => setValue(<EnquiryTable />)}>
                          My Enquires
                        </button>
                        <br />
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8 '>{value}</div>
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, {})(Account)
