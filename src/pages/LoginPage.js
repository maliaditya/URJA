import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import loginSuccess from '../assets/login.png'
import { login } from '../actions/auth'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import ModalSignup from '../components/ModalSignup'
import youtube from '../assets/youtube.png'
import { ResetPassword } from '../pages'

const LoginPage = ({ login, isAuthenticated, user }) => {
  const [showPassword, setshowPassword] = useState('password')
  const [modalSignupShow, setModalSignupShow] = React.useState(false)
  const [showInfo, setShowInfo] = React.useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [forgotPassword, setForgotPassword] = useState(false)

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onClickForgotPassword = () => {
    if (forgotPassword) {
      setForgotPassword(false)
    } else {
      setForgotPassword(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  if (forgotPassword) {
    return (
      <div>
        <ResetPassword />
        <br />
        <a onClick={() => onClickForgotPassword()} href='#!'>
          
          back to login
        </a>
      </div>
    )
  }
  
  if (isAuthenticated) {
    if (showInfo) {
      return (
        <section>
          <center>
            <h4>
              Hello, Nice to meet you, {user.first_name} {user.last_name}
            </h4>
            <h6>Here are few vedio to help you get started with urja</h6>
            <img
              style={{
                padding: '5rem 15rem 5rem 15rem ',
                borderRadius: '1rem',
                backgroundColor: 'gray',
              }}
              src={youtube}
              alt='youtube'
            />
            <br />
            <a href='#!'>
              <svg
                width='172'
                height='13'
                viewBox='0 0 172 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='171.99'
                  y='12.0073'
                  width='76'
                  height='9'
                  rx='4.5'
                  transform='rotate(180 171.99 12.0073)'
                  fill='#2D2C2C'
                />
                <rect
                  onClick={() => setShowInfo(false)}
                  x='76.0117'
                  y='9.99268'
                  width='76'
                  height='9'
                  rx='4.5'
                  transform='rotate(180 76.0117 9.99268)'
                  fill='#C4C4C4'
                />
              </svg>
            </a>
          </center>
        </section>
      )
    }
    return (
      <section>
        <center>
          <h4 style={{ fontWeight: '700' }}>Success!...</h4>
          <img
            style={{ width: '400px', height: '250px' }}
            src={loginSuccess}
            alt='login'
          />
          <h5>You are successfully logged into our system</h5>
          <button className='btn btn-warning' onClick={() => setShowInfo(true)}>
            Next{' '}
          </button>
          <br />
          <br />
          <a href='#!'>
            <svg
              width='172'
              height='9'
              viewBox='0 0 172 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='76' height='9' rx='4.5' fill='#2D2C2C' />
              <rect
                onClick={() => setShowInfo(true)}
                x='96'
                width='76'
                height='9'
                rx='4.5'
                fill='#C4C4C4'
              />
            </svg>
          </a>
        </center>
      </section>
    )
  } else {
    return (
      <Wrapper>
        <ModalSignup
          show={modalSignupShow}
          onHide={() => setModalSignupShow(false)}
        />
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='password'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
                aria-describedby='emailHelp'
              ></input>
            </div>
            <div className='password'>
              <label className='form-label'>Password</label>
              <input
                type={showPassword}
                className='form-control'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            {showPassword === 'password' ? (
              <a
                className='showpass'
                href='#!'
                onClick={() => {
                  setshowPassword('re')
                }}
              >
                show password&nbsp;
                <AiFillEye />
              </a>
            ) : (
              <a
                className='showpass'
                href='#!'
                onClick={() => {
                  setshowPassword('password')
                }}
              >
                hide password&nbsp;
                <AiFillEyeInvisible />
              </a>
            )}
            <br />
            <br />
            <button className='btn btn-primary' type='submit'>
              Log in
            </button>
          </form>
        </div>
        <br />
        <a
          href='#!'
          onClick={() => setModalSignupShow(true)}
          style={{ fontSize: '1rem' }}
        >
          Need Account?{' '}
        </a>
        <p>
          <a
            href='#!'
            onClick={() => onClickForgotPassword()}
            style={{ fontSize: '1rem' }}
          >
            Forgot password ?{' '}
          </a>
        </p>
        {/* 
      <p className='middle'>&nbsp; or use &nbsp; </p>
      
      <div className='social'>
      <button className='btn'>
      {' '}
      <AiFillFacebook />
      &nbsp;Facebook
      </button>
      
      <button className='btn'>
      <FcGoogle />
      &nbsp; Google
      </button>
    </div> */}
      </Wrapper>
    )
  }
}
const Wrapper = styled.section`
  .container {
    padding: 2vh;
    border: 1px solid grey;
    border-radius: 0.5rem;
  }
  form .btn {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .middle {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
  }

  .middle:before,
  .middle:after {
    content: '';
    flex: 1 1;
    border-bottom: 2px solid #000;
    margin: auto;
  }

  .social {
    justify-content: space-around;
    font-size: 2rem;
    display: flex;
  }
  .social .btn {
    width: 10rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    border: 1px solid black;
  }

  .check input {
    width: 1rem;
    margin-top: 1rem;
  }
  .password input {
    width: 21rem;
  }
  .name {
    display: flex;
  }
  label {
    margin-top: 5px;
    color: black;
    margin-top: 1.3rem;
  }
  .check {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .showpass {
    margin-top: 1rem;
  }
  input {
    width: 10rem;
    margin-right: 1rem;
  }
  .formcontent {
    font-size: 1rem;
  }
  p {
    color: black;
    margin-bottom: 0.5rem;
  }

  h1 {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 20%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  @media (min-width: 720px) {
    .container {
      padding: 10vh;
      border: 1px solid grey;
      border-radius: 0.5rem;
    }
  }
  overflow: hidden;
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    currentCompany: state.auth.currentCompany,
    currentCompanyUser: state.auth.currentCompanyUser,
  }
}

export default connect(mapStateToProps, { login })(LoginPage)
