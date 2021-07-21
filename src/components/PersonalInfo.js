import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { checkAuthenticated, load_user } from '../actions/auth'
// import CreateProduct from './CreateProduct'
const api = process.env.REACT_APP_API_URL

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            first_name: '',
            last_name: '',
            company_details: '',
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            pin_code: null,
        
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  postBussinessDetails=async()=>{
    const body = {
      'first_name':this.state.first_name,
      'last_name':this.state.last_name,
      'address_line1':this.state.address_line1,
      'address_line2':this.state.address_line2,
      'city':this.state.city,
      'state':this.state.state,
      'pin_code':this.state.pin_code,

    }
    console.log("body",body)
       alert(' Details are being Updated Please Wait! ')
    const config = {headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.props.access}`,
    }}
    await axios.patch(`${api}/auth/users/me/`,
            body,
            config).then(res=>{
      alert(' Details are Updated successfully! ')
      this.props.checkAuthenticated()
      this.props.load_user()

      console.log(res)
    }).catch(err=>{
      alert('Unable to save the details please try again ! ')
      console.log(err)
    })
  }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      console.log(this.state)
      
      event.preventDefault()
      this.postBussinessDetails()
        
    }
  
  componentDidMount(){
      const user = JSON.parse(localStorage.getItem("user") || "[]");
      this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            address_line1:user.address_line1,
            address_line2: user.address_line2,
            city: user.city,
            state: user.state,
            pin_code: user.pin_code,
           
         })

   console.log("state", this.state )
  }
  render() {
    return (
    <Wrapper className='container'>
      <p>Personal Information</p>
      <div className='formcontent'>
        <form onSubmit={this.handleSubmit}>
           <label for='First Name1' class='form-label'>
          First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Last Name
        </label>
        <div className='name'>
          <input
            type='text'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='First Name'
            aria-describedby='emailHelp'
            name='first_name'
              value={this.state.first_name}
              required
                 onChange={this.handleChange}
          ></input>

          <input
            type='text'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='Last Name'
            aria-describedby='emailHelp'
            name='last_name'
              value={this.state.last_name}
              required
                 onChange={this.handleChange}
          ></input>
        </div>
          <div className='password'>
            <label for='First Name1' class='form-label'>
              Address Line 1
            </label>
            <input
              type='text'
              class='form-control'
              placeholder='Please Enter Your Street Address'
              name='address_line1'
              value={this.state.address_line1}
              required
              onChange={this.handleChange}
            ></input>
          </div>
           <div className='password'>
            <label for='First Name1' class='form-label'>
              Address Line 2
            </label>
            <input
              type='text'
              class='form-control'
              placeholder='Please Enter Your Street Address'
              name='address_line2'
              value={this.state.address_line2}
              onChange={this.handleChange}
            ></input>
          </div>
          <label for='First Name1' class='form-label'>
            City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; State
          </label>
          <div className='name'>
            <input
              type='text'
              class='form-control'
              placeholder='Eg.Satara'
              name='city'
              value={this.state.city}
              required
               onChange={this.handleChange}
            ></input>

            <input
              type='text'
              class='form-control'
              placeholder='Eg. Maharashtra'
              name='state'
              value={this.state.state}
              required
                onChange={this.handleChange}
            ></input>
          </div>
          <label for='First Name1' class='form-label'>
            Zip Code
          </label>
          <div className='name'>
            <input
              type='text'
              class='form-control'
              placeholder='6 digit Code  '
               name='pin_code'
              value={this.state.pin_code}
              required
               onChange={this.handleChange}
            ></input>
          </div>

          <button type='submit' className='btn btn-warning'>Update</button>
        </form>
      </div>
    </Wrapper>
  )
}
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


const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem}
}

export default connect(mapStateToProps, {checkAuthenticated,load_user})(PersonalInfo)
