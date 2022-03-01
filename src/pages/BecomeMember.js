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
  const [redirecter, setRedirecter] = React.useState(false)
  const [userName, setUserName] = React.useState('')
  const [userID, setUserID] = React.useState('')
  const [userBool, setUserBool] = React.useState(true)


  const handleChange = (e) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }

    setUserName(e.target.value)
    setUserID(e.target.value)
    if (userBool && (e.target.value).length==10) {
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
    else{
    setUserBool(true)
    }
  }

  const clearForm = () => {
    if (!userBool) {
      setUserName('')
      setUserID('')
      setUserBool(true)
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
        <form autocomplete='off' className=' ml-1'>
          <label className='form-label'> Sponser Id </label>
          <input
            style={{ width: '40vh' }}
            type='text'
            className='form-control'
            placeholder='Eg: URJA8BE073'
            autoComplete='off'
            id='name'
            value={userID}
            onChange={handleChange}
            required
          />
          <br />
          {userBool ? (
            ''
          ) : (
            <input
              style={{ width: '40vh' }}
              type='text'
              className='form-control'
              placeholder='Eg: URJA8BE073'
              id='name'
              disabled
              value={userName}
              // onChange={handleChange}
              required
            />
          )}
        </form>

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
        <br />
        {userBool ? (
          <button
            disabled
            type='submit'
            onClick={(e) => onSubmit(e)}
            className='btn btn-warning'
          >
            Register
          </button>
        ) : (
          <button
            type='submit'
            onClick={(e) => onSubmit(e)}
            className='btn btn-warning'
          >
            Register
          </button>
        )}
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
