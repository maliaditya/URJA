import React from 'react'
import styled from 'styled-components'

const ManageContact = () => {
  return (
    <Wrapper>
      <h4 className='title'>Manage Contact</h4>
      <form action=''>
        <div className='password'>
          <label for='First Name1' class='form-label'>
            Email Address
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='Please Enter Your Email Address'
            aria-describedby='emailHelp'
          ></input>
        </div>
        <div className='password'>
          <label for='First Name1' class='form-label'>
            Mobile Number
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            placeholder=' Please Enter Your Mobile Number'
            aria-describedby='emailHelp'
          ></input>
        </div>

        <button className='btn btn-warning'>Save</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form .btn {
    background-color: #ffc232;
    margin-top: 2rem;
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
    padding-top: 1rem;
    color: black;
  }
  input {
    width: 10rem;
    margin-right: 1rem;
  }
  .formcontent {
    font-size: 12px;
  }
  p {
    color: black;
    margin-bottom: 0.5rem;
  }
  .container {
    padding: 3rem;
  }
  @media (min-width: 1300px) {
    form .btn {
      background-color: #ffc232;
      margin-top: 2rem;
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
  }
`

export default ManageContact
