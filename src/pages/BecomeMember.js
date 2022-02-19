import React from 'react'
import { connect } from 'react-redux'
import {
  // Productnav,
  Services,
  Footer,
  NewsLetter,
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'
import axios from 'axios'
import { checkAuthenticated, load_user } from '../actions/auth'
import { HashLink } from 'react-router-hash-link'
const api = process.env.REACT_APP_API_URL
const BecomeMember = ({ user, checkAuthenticated, load_user }) => {
  React.useEffect(() => {
    let title = 'URJA | Become a member'
    document.title = title
  })
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // const [taluka, setTaluka] = React.useState()
  // const [district, setDistrict] = React.useState()
  const [pinCode, setPinCode] = React.useState()
  // const [city, setCity] = React.useState()
  const [redirecter, setRedirecter] = React.useState(false)
  const [userName, setUserName] = React.useState('')
  const [userID, setUserID] = React.useState('')
  // const [location, setLocation] = React.useState([])
  // const [talukaarr, setTalukaarr] = React.useState([])
  // const [cityarr, setCityarr] = React.useState([])
  const [userBool, setUserBool] = React.useState(true)

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
        Authorization: `Bearer ${localStorage.getItem('access')}`,
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
          console.log(err)
        })
    }
  }

  const clearForm = () => {
    if (!userBool) {
      setUserName('')
      setUserID('')
      setUserBool(false)
    }
  }

  const createNewMember = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = {
      sponser_id: userID,
      taluka: '',
      user: user.id,
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
    axios
      .post(`${api}/api/member/`, body, config)
      .then((res) => {
        console.log(res)
        checkAuthenticated()
        load_user()
        alert('Your member account has been successfully created')
        setRedirecter(true)
      })
      .catch((err) => {
        console.log(err.response.data)
        alert(err.response.data['message'])
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createNewMember()
    // setTaluka('')
  }
  if (redirecter) {
    return (
      <section className='container' style={{ padding: '10vh' }}>
        <div className='jumbotron'>
          <h4>
            Your bussiness account with urja has been successfully created!
          </h4>
          <hr />
        </div>
        <HashLink to='/mbw'>
          <button className='btn btn-info'>Go to Bussiness Account</button>
        </HashLink>
        :
      </section>
    )
  }

  return (
    <div id='underConst' style={{ marginTop: '5rem' }}>
      <ProductNavSearch />
      <br />
      <br />
      <h1 className='text-center'>Become a member</h1>
      <br />
      <div
        className='container'
        style={{
          padding: '7rem',
          backgroundColor: '#eee',
          borderRadius: '1rem',
        }}
      >
        <div className=' ml-1'>
          <label className='form-label'> Sponser Id </label>
          {userBool ? (
            <input
              style={{ width: '40vh' }}
              type='text'
              className='form-control'
              placeholder='Eg: URJA8BE073'
              id='name'
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

        <button
          onClick={clearForm}
          className=' btn-secondary mt-1 ml-1'
          style={{
            borderRadius: '0.3rem',
            paddingLeft: '0.8rem',
            paddingRight: '0.8rem',
          }}
        >
          clear
        </button>
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
            onChange={(e)=>setPinCode(e.target.value)}
            required
          />
        </div>
        <br />
        <button
          type='submit'
          onClick={(e) => onSubmit(e)}
          className='btn btn-warning'
        >
          {' '}
          Submit{' '}
        </button>
      </div>
      <br />
      <br />
      <br />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    access: state.auth.access,
    user: state.auth.user,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  BecomeMember
)
