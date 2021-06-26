import React from 'react'
import styled from 'styled-components'

const PersonalInfo = () => {
  return (
    <Wrapper>
      <h5>Personal Information</h5>
      <form action=''>
        <label for='First Name1' class='form-label'>
          First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Last Name
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

        <div className='password'>
          <label for='First Name1' class='form-label'>
            Address
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='Please Enter Your Address'
            aria-describedby='emailHelp'
          ></input>
        </div>
        <div className='password'>
          <label for='First Name1' class='form-label'>
            Designation
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='Please Enter Your Designation'
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

export default PersonalInfo
