import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signup,addUserEmail } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'

import axios from 'axios'

const api = process.env.REACT_APP_API_URL
const ChangePassword = ({user, signup, props }) => {
  const [loading, setLoading] = useState(false)
  const [changepass, setchangepass] = useState({
    new_pass:'',
    c_new_pass: '',
    old_pass: '',
  })
  

    
  const onLocChange = (e) =>
    setchangepass({
      ...changepass,
      [e.target.name]: e.target.value,
    })

    

   const createNewMember=()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Accept':'application/json',
      },
    }
  
    const body = {
   
    "new_password":changepass.new_pass,
    "re_new_password": changepass.c_new_pass,
      "current_password": changepass.old_pass
}
    axios
      .post(`${api}/auth/users/set_password/`, body ,config)
      .then((res) => {
        console.log(res)
        alert("Your  account password has been successfully changed")
        setLoading(false)
      })
      .catch((err) => {
                setLoading(false)
        console.log(err)
        if (err !== null) {
            if( err.response.data['new_password'])
                alert(err.response.data['new_password'])


          if(err.response.data['non_field_errors'])
                alert(err.response.data['non_field_errors'])

          if(err.response.data['current_password'])
             alert(err.response.data['current_password'])

      }
      })
   
  }

  const onSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
   createNewMember()
  }



if (loading) {
     return (
        <div style={{ padding: '10rem' }}>
          <center>
            <LoopCircleLoading />
          </center>
        </div>
      )
  }

 
  return (
    <Wrapper>
     
      <div>
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
              
                   <div className='password mt-1' >
              <label className='form-label'>New Password</label>
              <input
              type='password'
                className='form-control shadow-none'
                placeholder='New Password'
                name='new_pass'
                value={changepass.new_pass}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div>
               <div className='password mt-1' >
              <label className='form-label'>Confirm New Password</label>
              <input
                            type='password'
                className='form-control shadow-none'
                placeholder='Confirm New Password'
                name='c_new_pass'
                value={changepass.c_new_pass}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div>
               <div className='password mt-1' >
              <label className='form-label'>Old Password</label>
              <input
                            type='password'
                className='form-control shadow-none'
                placeholder='Old Password'
                name='old_pass'
                value={changepass.old_pass}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div>
            <br />
            <button type='submit' className='btn btn-warning'>
              Save
            </button>
          </form>
         
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
  .passmeter {
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
    .passmeter {
      width: 28rem;
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
    .passmeter {
      width: 28rem;
    }
    input {
      width: 20rem;
      margin-right: 1rem;
    }
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
    user: JSON.parse(localStorage.getItem('user') || '[]'),
  signupErrors: state.auth.signupErrors,
})

export default connect(mapStateToProps, { signup ,addUserEmail})(ChangePassword)
