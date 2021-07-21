import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../actions/auth'
const api = process.env.REACT_APP_API_URL
const ManageContact = ({user,access,checkAuthenticated,load_user}) => {

   console.log(access)
  const [formData, setFormData] = React.useState({
    email: '',
    phone: '',
  })

  const { email, phone} = formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()
    updatePhone(email,phone)
  }


  console.log('phone',phone)
  const updatePhone = async (email,phone) =>{
          alert('Your Data is being updated')
    const config = {headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${access}`,
              }}
          const body = {
            "phone": phone,
            "email":email
          } 
            
          await axios.patch(
            `${api}/auth/users/me/`,
            body,
            config 
            ).then((res)=>{
              console.log('Updated Successfully',res)
               alert('Updated Successfully')
                 checkAuthenticated()
                  load_user()
            }).catch((err)=>{
              console.log(err)
                alert(err,'Please try again later')

            })
          

  }



  return (
    <Wrapper>
      <h4 className='title'>Manage Contact</h4>
      <form onSubmit={(e) => onSubmit(e)}>
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
            defaultValue= {user.email}
          ></input>
        </div>
        <div className='password'>
          <label for='First Name1' class='form-label'>
            Mobile Number
          </label>
          <input
            type='phone'
            class='form-control'
            id='exampleInputEmail1'
            placeholder=' Please Enter Your Mobile Number'
            aria-describedby='emailHelp'
            name='phone'
            required
            onChange={(e) => onChange(e)}
            defaultValue= {user.phone}
          ></input>
        </div>

        <button className='btn btn-warning'>Update</button>
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


const mapStateToProps=(state)=>{
 

  return{
    access:state.auth.access,
    user:state.auth.user,
  }
}


export default connect(mapStateToProps,{load_user, checkAuthenticated})(ManageContact)

