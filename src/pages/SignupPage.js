import React from 'react'
import styled from 'styled-components'

const SignupPage = () => {
  return (
    <Wrapper>
      <div className='col-md-12 '>
        <div className='row'>
          <div className='col-md-6 left'>
            <h1>LOGO</h1>
          </div>
          <div className='col-md-6 right'>
            <div className='container'>
              <p>Sign up </p>
              <div className='formcontent'>
                <form action=''>
                  <label for='First Name1' class='form-label'>
                    First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Last
                    Name
                  </label>
                  <div className='name'>
                    <input
                      type='email'
                      class='form-control'
                      id='exampleInputEmail1'
                      placeholder='First Name'
                      aria-describedby='emailHelp'
                    ></input>

                    <input
                      type='email'
                      class='form-control'
                      id='exampleInputEmail1'
                      placeholder='Last Name'
                      aria-describedby='emailHelp'
                    ></input>
                  </div>
                  <label for='First Name1' class='form-label'>
                    Email Address
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp;Mobile Number
                  </label>
                  <div className='name'>
                    <input
                      type='email'
                      class='form-control'
                      id='exampleInputEmail1'
                      placeholder='Email Address'
                      aria-describedby='emailHelp'
                    ></input>

                    <input
                      type='email'
                      class='form-control'
                      id='exampleInputEmail1'
                      placeholder='Mobile Number'
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
                  <div className='password'>
                    <label for='First Name1' class='form-label'>
                      Confirm Password
                    </label>
                    <input
                      type='email'
                      class='form-control'
                      id='exampleInputEmail1'
                      placeholder='Confirm Password'
                      aria-describedby='emailHelp'
                    ></input>
                  </div>

                  <label className='check'>
                    <input type='checkbox' checked='checked' name='remember' />{' '}
                    I've read and accepted <a href=''>Terms and services</a>
                    <span>&nbsp;</span> and<a href=''> Privacy Policy</a>
                  </label>
                  <br />
                  <button className='btn btn-warning'>Create Account</button>
                </form>
                <div className='social'>
                  <button className='btn btn-primary'>Facebook</button>
                  <button className='btn btn-danger'>Google</button>
                </div>
                <p>
                  Already have an account ? <a href=''>Log in</a>
                </p>
              </div>
            </div>
          </div>
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
    padding-top: 0.5rem;
  }
  background-color: #2d2c2c;

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
      padding-top: 1rem;
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
      width: 31rem;
    }
    .name {
      display: flex;
    }
    label {
      margin-top: 5px;
      color: white;
    }
    input {
      width: 15rem;
      margin-right: 1rem;
    }
    .formcontent {
      font-size: 1rem;
    }
    p {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    .container {
      padding-top: 0.5rem;
    }
    background-color: #2d2c2c;

    h1 {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 20%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .container {
      padding-top: 1rem;
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
export default SignupPage
