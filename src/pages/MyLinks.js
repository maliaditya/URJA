import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signup, addUserEmail } from '../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL
const MyLinks = ({ user, signup, props }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  // const [newMemberId, setNewMemberID] = useState('')
  const [userName, setUserName] = useState('')
  const [userID, setUserID] = useState('')
  // const [location, setLocation] = useState([])
  // const [talukaarr, setTalukaarr] = useState([])
  // const [cityarr, setCityarr] = useState([])
  const [userBool, setUserBool] = useState(true)
  const [accountCreated, setaccountCreated] = useState(false)
  const [accountCreatedCheck, setaccountCreatedCheck] = useState(true)
  // const [district, setDistrict] = useState('')
  // const [taluka, setTaluka] = useState('')
  // const [city, setCity] = useState('')
  const [pinCode, setPinCode] = React.useState()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: `Mbw@12345678`,
    re_password: `Mbw@12345678`,
    hide: '',
  })

  // React.useEffect(() => {
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       Authorization: `Bearer ${localStorage.getItem('access')}`,
  //     },
  //   }

  //   let url = `${api}/api/district/`
  //   axios
  //     .get(url, config)
  //     .then((res) => {
  //       setLocation(res.data)
  //       console.log('MyLocation', res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  // const handleLocation = (e) => {
  //   setDistrict(location[e.target.value].district)

  //   let talukaarra = location[e.target.value].district_taluka

  //   setTalukaarr(talukaarra)
  // }
  // const handleTaluka = (e) => {
  //   setTaluka(talukaarr[e.target.value].taluka)
  //   let cityarra = talukaarr[e.target.value].taluka_city
  //   setCityarr(cityarra)
  // }
  // const handleCity = (e) => {
  //   setCity(cityarr[e.target.value].city)
  //   console.log('city', city)
  // }

  const handleChange = (e) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    setUserName(e.target.value)
    if (userBool) {
      let url = `${api}/api/name/?member=${e.target.value}`
      axios
        .get(url, config)
        .then((res) => {
          setUserName(res.data.member_name)
          setUserID(res.data.member_id)
          setUserBool(false)
        })
        .catch((err) => {
        alert('invalid link')

        })
    }
  }
  React.useEffect(() => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const fetch = async () => {
      let url = `${api}/api/name/?member=${id}`
      await axios
       .get(url, config)
  .then((res) => {
    setUserName(res.data.member_name)
    setUserID(res.data.member_id)
    setUserBool(false)
  })
  .catch((err) => {
    alert('invalid link')
    
  })
    }
fetch()
    
  }, [id])

  const { first_name, last_name, email, phone, password, re_password } =
    formData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const createNewMember = (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const body = {
      sponser_id: userID,
      taluka: '',
      user: id,
      district: '',
      city: '',
      pin_code: pinCode,
      is_admin: false,
      active_taluka: {
        is_active: false,
      },
      active_city: {
        is_active: false,
        city: '',
        pin_code: pinCode,
      },
      active_district: {
        is_active: false,
      },
      active_seller: {
        is_active: false,
      },
      active_member: {
        is_active: false,
      },
    }
    console.log('body', body)
    axios
      .post(`${api}/api/member/`, body, config)
      .then((res) => {
        console.log('user_response', res.data.member_id)
        // setNewMemberID(res.data.member_id)
        alert('Your member account has been successfully created')
        setLoading(false)

        if (accountCreatedCheck) setaccountCreated(true)
      })
      .catch((err) => {
        setLoading(false)
        alert('user Registeration failed')
        console.log(err)
      })
  }
  const handleSignUp = async (
    first_name,
    last_name,
    phone,
    email,
    password,
    re_password
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const body = JSON.stringify({
      first_name,
      last_name,
      phone,
      email,
      password,
      re_password,
    })

    await axios
      .post(`${api}/auth/users/`, body, config)
      .then((res) => {
        console.log(res.data)
        createNewMember(res.data.id)
      })
      .catch(async (err) => {
        await axios.get(`${api}/api/me/?email=${email}`, config).then((res) => {
          createNewMember(res.data.data.id)
        })
      })
  }

  const onSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(first_name, last_name, phone, email, password, re_password)

    if (password.length > 8) {
      if (password === re_password) {
        handleSignUp(first_name, last_name, phone, email, password, re_password)
        addUserEmail(formData.email)
      } else {
        alert("Password don't match")
      }
    } else {
      alert(
        'Password must have aleast 8 characters, one uppercase & special Character '
      )
    }
  }

  const resendActivationEmail = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      email: `${formData.email}`,
    }

    axios
      .post(`${api}/auth/users/resend_activation/`, body, config)
      .then((res) => {
        console.log(res)
        alert('Email has been send successfully!')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  if (!accountCreatedCheck) {
    return (
      <section className='container' style={{ padding: '10vh' }}>
        <div className='jumbotron'>
          <h4>Thank you for signing up for a URJA account!</h4>
          <hr />
          User: {email}
        </div>

        <button
          className='btn btn-warning'
          onClick={() => {
            setaccountCreated(false)
            setaccountCreatedCheck(true)
          }}
        >
          back
        </button>
      </section>
    )
  }

  if (accountCreated) {
    return (
      <section className='container' style={{ padding: '10vh' }}>
        <div className='jumbotron'>
          <h4>Thank you for signing up for a URJA account!</h4>
          <hr />
          <p style={{ fontSize: '1.5rem' }}>
            Please <b> Verify Your Email </b> by clicking on the link you have
            received on <b>{formData.email} </b>in order to access your URJA
            account.{' '}
          </p>
          <h4>username:{formData.email}</h4>
          <h4>Password: {formData.password}</h4>
        </div>
        <button
          onClick={() => resendActivationEmail()}
          className='btn btn-info'
        >
          Resend Activation Email
        </button>
        <br />
        <br />
        <button
          className='btn btn-warning'
          onClick={() => setaccountCreated(false)}
        >
          back
        </button>
      </section>
    )
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
      <br />
      <section
        className='container'
        style={{ paddingLeft: '5vh', paddingTop: '0vh' }}
      >
        <br />
        <h4>Register New User</h4>
        <hr />
        <div className='formcontent'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className=' ml-1'>
              <label className='form-label'> Sponser Id </label>
              {userBool ? (
                <input
                  style={{ width: '40vh' }}
                  type='text'
                  className='form-control'
                  placeholder='Eg: URJA8BE073'
                  id='name'
                  disabled
                  value={userName}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  style={{ width: '40vh' }}
                  type='text'
                  className='form-control'
                  placeholder='Eg: URJA8BE073'
                  id='name'
                  disabled
                  value={userName}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            {/* <div className='password mt-1'>
              <label className='form-label'>Spnonser</label>
              <input
                className='form-control  '
                placeholder='sponser id'
                // disabled
                name='sponser'
                value={selleAccount.sponser}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div> */}
            <br />
            <label className='form-label'>First Name</label>
            <div className='name'>
              <input
                type='text'
                className='form-control shadow-none'
                placeholder='First Name'
                name='first_name'
                value={first_name}
                onChange={(e) => onChange(e)}
                required
              ></input>

              <input
                type='text'
                className='form-control shadow-none'
                placeholder='Last Name'
                name='last_name'
                value={last_name}
                onChange={(e) => onChange(e)}
                required
              ></input>
            </div>
            <label className='form-label mt-1'>Email Address</label>
            <div className='password'>
              <input
                type='email'
                className='form-control shadow-none'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
                aria-describedby='emailHelp'
              ></input>
            </div>
            <label className='form-label mt-1'>Phone</label>
            <div className='password'>
              <input
                maxLength={10}
                pattern='\d{10}'
                type='number'
                className='form-control shadow-none'
                placeholder='Phone No.'
                name='phone'
                value={phone}
                onChange={(e) => onChange(e)}
                required
              ></input>
            </div>
            {/* 
            <div className=''>
              <label className='form-label'>District *</label>
              <select
                style={{ width: '40vh' }}
                className='form-select'
                onChange={(e) => handleLocation(e)}
              >
                <option>---Select ---</option>
                {location.map((item, index) => {
                  console.log('itemmy', item)
                  return (
                    <option
                      key={index}
                      required
                      id='category'
                      value={index}
                      onChange={(e) => handleLocation(e)}
                    >
                      {' '}
                      {item.district}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className=''>
              <label className='form-label'>Taluka *</label>
              <select
                style={{ width: '40vh' }}
                className='form-select'
                onChange={(e) => handleTaluka(e)}
              >
                <option>---Select ---</option>
                {talukaarr.map((item, index) => {
                  console.log('itemmy', item)
                  return (
                    <option
                      key={index}
                      required
                      id='category'
                      value={index}
                      onChange={(e) => handleTaluka(e)}
                    >
                      {' '}
                      {item.taluka}
                    </option>
                  )
                })}
              </select>
            </div>
            {console.log(cityarr)}
            <div className=''>
              <label className='form-label'>City *</label>
              <select
                style={{ width: '40vh' }}
                className='form-select'
                onChange={(e) => handleCity(e)}
              >
                <option>---Select ---</option>
                {cityarr.map((item, index) => {
                  console.log('itemmy', item)
                  return (
                    <option
                      key={index}
                      required
                      id='category'
                      value={index}
                      onChange={(e) => handleCity(e)}
                    >
                      {' '}
                      {item.city}
                    </option>
                  )
                })}
              </select>
            </div> */}
            <div className='mt-2'>
              <label className='form-label'> Pin Code</label>
              <input
                type='number'
                className='form-control'
                style={{ width: '40vh' }}
                placeholder='Pin Code'
                id='Pin Code'
                min='0'
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
            {/* <div className='password mt-1'>
              <label className='form-label'>District</label>
              <input
                type='text'
                className='form-control shadow-none'
                placeholder='District'
                name='district'
                value={district}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div>
            <div className='password mt-1'>
              <label className='form-label'>Taluka</label>
              <input
                className='form-control shadow-none'
                placeholder='Taluka'
                name='taluka'
                value={selleAccount.taluka}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div>
            <div className='password mt-1'>
              <label className='form-label'>City</label>
              <input
                className='form-control shadow-none'
                placeholder='City'
                name='city'
                value={selleAccount.city}
                onChange={(e) => onLocChange(e)}
                required
              ></input>
            </div> */}
            {userBool ? (
              <button type='submit' disabled className='btn btn-warning'>
                Register
              </button>
            ) : (
              <button type='submit' className='btn btn-warning'>
                Register
              </button>
            )}
          </form>
        </div>
      </section>
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
export default connect(mapStateToProps, { signup, addUserEmail })(MyLinks)
