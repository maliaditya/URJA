import React , {useState} from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { Link } from 'react-router-dom'


const Signup = ({ signup,isAuthenticated , props}) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [showPassword, setshowPassword] = useState('password');
   const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    email: '',
    phone: '',
    password: '',
    re_password: '',
    address_line1:'',
    address_line2:'',
    city:'',
    state:'',
    pin_code:''
  })

  const {first_name, last_name,email,phone, password,re_password,address_line1,
address_line2,
city,
state,
pin_code,
 } = formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(first_name, last_name,phone,email, password,re_password,address_line1,
address_line2,
city,
state,
pin_code)
    if(password === re_password){
      setAccountCreated(true)
        signup(first_name, last_name,phone,email, password,re_password,address_line1,
address_line2,
city,
state,
pin_code)
    }
  }

  if (accountCreated) {
        return <Redirect to='/signup_info' />
    }


  return (
    <Wrapper>
      <div>
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
            <label  className='form-label'>
              First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; Last Name
            </label>
            <div className='name'>
              <input
                type='first_name'
                className='form-control'
                
                placeholder='First Name'
                name='first_name'
                value={first_name}
                onChange={(e) => onChange(e)}
                required
                
              ></input>

              <input
                type='last_name'
                className='form-control'
                
                placeholder='Last Name'
                name='last_name'
                value={last_name}
                onChange={(e) => onChange(e)}
                required
                
              ></input>
            </div>
            <label  className='form-label'>
              Email Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; Mobile Number
            </label>
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
                type='phone'
                className='form-control'
                
                placeholder='Phone No.'
                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
                required
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
                required

              ></input>
            </div>
            <div className='password'>
              <label  className='form-label'>
                Confirm Password
              </label>
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
            {showPassword==='password'?
            <div onClick={()=>{setshowPassword('re')}}>show password&nbsp;<AiFillEye /></div>
            :<div onClick={()=>{setshowPassword('password')}}>hide password&nbsp;<AiFillEyeInvisible/></div>
            }

            <label className='check'>
              <input type='checkbox'  name='remember' /> I've
              read and accepted <Link to='' >Terms and services</Link>
              <span>&nbsp;</span> and<Link to=''> Privacy Policy</Link>
            </label>
            <br />
            <button onClick={props.onHide}type='submit'className='btn btn-warning'>Create Account</button>
          </form>
          <br />
        <Link to='/login'> Already have an account? Login</Link>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup)

