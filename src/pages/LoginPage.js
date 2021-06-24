import React from 'react'
import styled from 'styled-components'

const LoginPage = () => {
  return (
    <Wrapper>
      <div className='container'>
        <p>Log In </p>
        <div className='formcontent'>
          <form action=''>
            <div className='password'>
              <label for='First Name1' class='form-label'>
                Email
              </label>
              <input
                type='email'
                class='form-control'
                id='exampleInputEmail1'
                placeholder='Email'
                aria-describedby='emailHelp'
              ></input>
            </div>
            <div className='password'>
              <label for='First Name1' class='form-label'>
                Password
              </label>
              <input
                type='email'
                class='form-control'
                id='exampleInputEmail1'
                placeholder='Password'
                aria-describedby='emailHelp'
              ></input>
            </div>

            <label className='check'>
              <input type='checkbox' checked='checked' name='remember' />{' '}
              Remember me
            </label>
            <br />
            <button className='btn btn-warning'>Login</button>
          </form>
          <div className='social'>
            <button className='btn btn-primary'>Facebook</button>
            <button className='btn btn-danger'>Google</button>
          </div>
          <p>
            Need an account ? <a href=''> Sign up</a>
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: #2d2c2c;
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
  .password input {
    width: 21rem;
  }
  .name {
    display: flex;
  }
  label {
    margin-top: 5px;
    color: white;
  }
  input {
    width: 10rem;
    margin-right: 1rem;
  }
  .formcontent {
    font-size: 12px;
  }
  p {
    color: white;
    margin-bottom: 0.5rem;
  }
  .container {
    padding: 3rem;
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
    .container {
      padding: 3rem;
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
    .social {
      display: flex;
    }
    .social .btn {
      width: 30vh;
      margin-right: 1rem;
      margin-top: 1rem;
      margin-bottom: 0.8rem;
      font-size: 2vh;
      height: 5vh;
    }
    form .btn {
      background-color: #ffc232;
      margin-top: 1rem;
      width: 60vh;
      height: 5vh;
      font-size: 2vh;
    }
    .check input {
      width: 1rem;
      margin-top: 1rem;
    }
    .password input {
      width: 60vh;
      height: 5vh;
      font-size: 2vh;
    }
    .name {
      display: flex;
    }
    label {
      margin-top: 5px;
      color: white;
    }
    input {
      width: 60vh;
      margin-right: 1rem;
    }
    .formcontent {
      font-size: 2.5vh;
    }
    p {
      margin-bottom: 0.5rem;
      font-size: 3vh;
    }
    .container {
      padding: 3rem;
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
      padding: 1rem;
    }
  }
`
export default LoginPage
