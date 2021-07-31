import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SignupInfo } from '../pages'
import ModalLogin from './Modal'
const Signup = ({ signup, props, accountCreated }) => {
  const [modalLoginShow, setModalLoginShow] = React.useState(false)
  const [showPassword, setshowPassword] = useState('password')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    re_password: '',
    hide: '',
  })

  const { first_name, last_name, email, phone, password, re_password } =
    formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(first_name, last_name, phone, email, password, re_password)
    if (password.length > 8) {
      if (password === re_password) {
        setFormData({ ...formData, hide: props.onHide })
        signup(first_name, last_name, phone, email, password, re_password)
      } else {
        alert("Password don't match")
      }
    } else {
      alert(
        'Password must have aleast 8 characters, one uppercase & special Character '
      )
    }
  }
  const setLogin = () => {
    setModalLoginShow(true)
  }

  if (accountCreated) {
    return <SignupInfo />
  }

  return (
    <Wrapper>
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />
      <div>
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
            <label className='form-label'>First Name</label>
            <div className='name'>
              <input
                type='text'
                className='form-control'
                placeholder='First Name'
                name='first_name'
                value={first_name}
                onChange={(e) => onChange(e)}
                required
              ></input>

              <input
                type='text'
                className='form-control'
                placeholder='Last Name'
                name='last_name'
                value={last_name}
                onChange={(e) => onChange(e)}
                required
              ></input>
            </div>
            <label className='form-label'>Email Address</label>
            <div className='name'>
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

              <input
                maxLength={10}
                pattern='\d{10}'
                type='number'
                className='form-control'
                placeholder='Phone No.'
                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
                required
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
                required
              ></input>
            </div>

            <div className='password'>
              <label className='form-label'>Confirm Password</label>
              <input
                type={showPassword}
                className='form-control'
                placeholder='Confirm Password'
                name='re_password'
                value={re_password}
                onChange={(e) => onChange(e)}
                required
              ></input>
            </div>
            {showPassword === 'password' ? (
              <div
                onClick={() => {
                  setshowPassword('re')
                }}
              >
                show password&nbsp;
                <AiFillEye />
              </div>
            ) : (
              <div
                onClick={() => {
                  setshowPassword('password')
                }}
              >
                hide password&nbsp;
                <AiFillEyeInvisible />
              </div>
            )}

            <label className='check'>
              <input type='checkbox' name='remember' required /> I've read and
              accepted <Link to=''>Terms and services</Link>
              <span>&nbsp;</span> and<Link to=''> Privacy Policy</Link>
            </label>
            <br />
            <button type='submit' className='btn btn-warning'>
              Create Account
            </button>
          </form>
          <br />
          <a href='#!' style={{ fontSize: '1rem' }} onClick={() => setLogin()}>
            {' '}
            Already have an account? Login
          </a>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .social {
    display: flex;
  }
  .social .btn {
    width: 10rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.8rem;
  }
  form .btn {
    background-color: #ffc232;
    margin-top: 1rem;
    width: 21rem;
  }
  .check input {
    width: 1rem;
    margin-top: 1rem;
  }
  .name {
    display: flex;
  }
  label {
    margin-top: 5px;
    color: black;
  }
  .password input {
    width: 18rem;
  }
  input {
    width: 8rem;
    margin-right: 1rem;
  }
  .formcontent {
    font-size: 12px;
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
  overflow: hidden;
  .left {
    display: none;
    background-color: #ffc232;
    height: 100vh;
    border-radius: 0rem 1rem 1rem 0rem;
  }
  .right {
    background-color: #2d2c2c;
    height: 100vh;
  }

  @media (min-width: 720px) {
    .password input {
      width: 31rem;
    }
    input {
      width: 20rem;
      margin-right: 1rem;
    }

    .left {
      display: flex;
      background-color: #ffc232;
      height: 100vh;
      border-radius: 0rem 1rem 1rem 0rem;
    }
    .right {
      background-color: #2d2c2c;
      height: 100vh;
    }
  }

  @media (min-width: 1300px) {
    .password input {
      width: 31rem;
    }
    input {
      width: 20rem;
      margin-right: 1rem;
    }
    .social {
      display: flex;
    }
    .social .btn {
      width: 15rem;
      margin-right: 1rem;
      margin-top: 1rem;
      margin-bottom: 0.8rem;
    }
    form .btn {
      background-color: #ffc232;
      margin-top: 1rem;
      width: 31rem;
    }
    .check input {
      width: 1rem;
      margin-top: 1rem;
    }
    .password input {
      width: 28rem;
    }
    .name {
      display: flex;
    }
    label {
      margin-top: 5px;
      color: black;
    }
    input {
      width: 13rem;
      margin-right: 1rem;
    }
    .formcontent {
      font-size: 1rem;
    }
    p {
      color: black;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }

    h1 {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 20%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    .left {
      display: flex;
      background-color: #ffc232;
      height: 100vh;
      border-radius: 0rem 1rem 1rem 0rem;
    }
    .right {
      background-color: #2d2c2c;
      height: 100vh;
    }
  }
`

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  signupErrors: state.auth.signupErrors,
})

export default connect(mapStateToProps, { signup })(Signup)
