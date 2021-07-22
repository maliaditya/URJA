import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import { FcGoogle } from 'react-icons/fc'
// import { AiFillFacebook } from 'react-icons/ai'
import { login } from '../actions/auth'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'

const LoginPage = ({ login, props,isAuthenticated }) => {
  
  const [showPassword, setshowPassword] = useState('password');
            
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  if(isAuthenticated){
    return(
      <Redirect to='/' />
    )
  }

  return (
 
    <Wrapper>
      <section className='container'>
        <h3 className='title'>Log in</h3>
        <hr />
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='password'>
              <label  className='form-label'>
                Email
              </label>
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
              <label  className='form-label'>
                Password
              </label>
              <input
                type={showPassword}
                className='form-control'
                
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
{showPassword==='password'?
            <a className='showpass' href="#!" onClick={()=>{setshowPassword('re')}}>show password&nbsp;<AiFillEye /></a>
            :<a className='showpass' href="#!" onClick={()=>{setshowPassword('password')}}>hide password&nbsp;<AiFillEyeInvisible/></a>
            }
<br />
            <br />
              <button   className='btn btn-primary' type='submit'>
              Login
            </button>
          </form>
        </div>
        <br />
            <Link to='/'  style={{ fontSize: '1rem' }} >Need Account? </Link>
        <p>
            <Link   style={{ fontSize: '1rem' }} to='reset_password'>Forgot password ? </Link>
        </p>
      </section>
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
const Wrapper = styled.section`

.container{
  margin-top:2rem;
  padding:2vh;
  border:1px solid grey;
  border-radius:0.5rem;
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
    margin-top:1.3rem;

  }
  .check{
        margin-top:0.5rem;
        margin-bottom:0.5rem;
  }
  .showpass{
        margin-top:1rem;
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
    .container{
      margin-top:2rem;
      padding:10vh;
      border:1px solid grey;
      border-radius:0.5rem;
    }
}
  overflow: hidden;
`
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    
});

export default connect(mapStateToProps, { login })(LoginPage)

