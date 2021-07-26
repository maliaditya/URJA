import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from '../actions/auth'
const api = process.env.REACT_APP_API_URL
const NewsLetter = ({
  user,
  access,
  isAuthenticated,
  currentUserNewsLetter,
  checkAuthenticated,
  load_user,
}) => {
  user = JSON.parse(localStorage.getItem('user') || '[]')
  const [formData, setFormData] = React.useState({
    email: '',
  })

  const onChange = (e) => {
    setFormData({
      email: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postEmaiToNewsletter()
    setFormData({
      email: '',
    })
  }

  const postEmaiToNewsletter = async () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    }
    const body = {
      email: formData.email,
      user: user.id,
    }

    console.log('newsletter', body)
    await axios
      .post(`${api}/api/news_letter/`, body, config)
      .then((res) => {
        console.log('Suscribed Successfully', res)

        alert('Suscribed Successfully')
        checkAuthenticated()
        load_user()
      })
      .catch((err) => {
        console.log(err)
        alert(err, 'Please try again later')
      })
  }

  if (isAuthenticated && !currentUserNewsLetter) {
    return (
      <Newscont>
        <hr />
        <center>
          <p className='ttag'>
            {' '}
            Suscribe to our news letter and never miss exciting offers!
          </p>
        </center>
        <center>
          <form
            onSubmit={(e) => onSubmit(e)}
            className='input-group rounded container'
          >
            <input
              type='email'
              className='form-control rounded'
              placeholder='Enter your email address'
              aria-label='Search'
              aria-describedby='search-addon'
              onChange={(e) => onChange(e)}
              value={formData.email}
              required
            />
            <span> &nbsp; &nbsp; </span>
            <button className='btn btn-warning'>Suscribe</button>
          </form>
        </center>
      </Newscont>
    )
  } else {
    return <React.Fragment></React.Fragment>
  }
}

const Newscont = styled.section`
overflow:hidden;

input {
  height: 2.7rem;
}

.ttag {
  margin-top: 5rem;
    font-size: 0.72rem;
    color: black;
    font-weight: 700;
  }

 
  @media (min-width:720px){

  .ttag {
    margin-top: 5rem;
    font-size: 1rem;
    color: black;
    font-weight: 700;
  }

  .input-group  {
    width: 29rem;;
  }

  }

  @media (min-width:1300px){

  .ttag {
    margin-top: 5rem;
    font-size: 1.54rem;
    color: black;
    font-weight: 700;
  }

  .input-group  {
    width: 45rem;;
  }
    .seller {
      padding-left: 5rem;
    }
  }

  } .container {
    padding-bottom: 3rem;
  }

  hr {
    border: 2px solid black;
  }


`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentUserNewsLetter: state.auth.currentUserNewsLetter,
  }
}

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  NewsLetter
)
