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

  const [sponser, setSponser] = React.useState()
  const [taluka, setTaluka] = React.useState()
  const [district, setDistrict] = React.useState()
  const [city, setCity] = React.useState()
  const [redirecter, setRedirecter] = React.useState(false)

  const createNewMember = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = {
      sponser_id: sponser,
      taluka: taluka,
      user: user.id,
      district: district,
      city: city,
      is_admin: false,
      active_taluka: {
        is_active: false,
      },
      active_city: {
        is_active: false,
        city: city,
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

  const onChange = (e) => {
    setSponser(e.target.value)
  }

  const onTalukaChange = (e) => {
    setTaluka(e.target.value)
  }

  const onDistrictChange = (e) => {
    setDistrict(e.target.value)
  }

  const onCityChange = (e) => {
    setCity(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createNewMember()
    setTaluka('')
    setSponser('')
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
        <label htmlFor='sponser'>&nbsp;Sponser ID</label>
        <input
          name='sponser'
          value={sponser}
          onChange={(e) => onChange(e)}
          required
          type='text'
          className='form-control shadow-none mt-1'
          placeholder='Please Enter Sponser ID'
        />
        <label className='mt-2' htmlFor='sponser'>
          &nbsp;District
        </label>
        <input
          name='district'
          value={district}
          onChange={(e) => onDistrictChange(e)}
          required
          type='text'
          className='form-control shadow-none mt-1'
          placeholder='Please Enter Your District'
        />
        <label className='mt-2' htmlFor='sponser'>
          &nbsp;Taluka
        </label>

        <input
          name='taluka'
          value={taluka}
          onChange={(e) => onTalukaChange(e)}
          required
          type='text'
          className='form-control shadow-none mt-1'
          placeholder='Please Enter Your Taluka'
        />
        <label className='mt-2' htmlFor='sponser'>
          &nbsp;City
        </label>
        <input
          name='city'
          value={city}
          onChange={(e) => onCityChange(e)}
          required
          type='text'
          className='form-control shadow-none mt-1'
          placeholder='Please Enter Your City'
        />
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
