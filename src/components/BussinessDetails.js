import React from 'react'
import styled from 'styled-components'

const BussinessDetails = () => {
  return (
    <Wrapper className='container'>
      <p>Bussiness Details</p>
      <div className='formcontent'>
        <form action=''>
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
              Company/Bussiness/Shop Name
            </label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              placeholder='Company/Bussiness/Shop Name'
              aria-describedby='emailHelp'
            ></input>
          </div>
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
              Company Details
            </label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              placeholder='Company Details'
              aria-describedby='emailHelp'
            ></input>
          </div>

          <button className='btn btn-warning'>Next</button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .social {
    display: flex;
  }
  .btn {
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.8rem;
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
  }
  input {
    background-color: #dedede;
    width: 10rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
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
    height: 100vh;
    border-radius: 0rem 1rem 1rem 0rem;
  }
  .right {
    height: 100vh;
  }

  @media (min-width: 720px) {
    .left {
      display: flex;
      background-color: #ffc232;
      height: 100vh;
      border-radius: 0rem 1rem 1rem 0rem;
    }
    .right {
      height: 100vh;
    }
  }

  @media (min-width: 1300px) {
    .social {
      display: flex;
    }
    .social .btn {
      margin-right: 1rem;
      margin-top: 1rem;
      margin-bottom: 0.8rem;
    }
    form .btn {
      background-color: #ffc232;
      margin-top: 1rem;
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
      color: black;
    }
    input {
      width: 15rem;
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

export default BussinessDetails
