import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { checkAuthenticated, load_user } from '../actions/auth'
import { FaRegEdit } from 'react-icons/fa'

// import CreateProduct from './CreateProduct'
const api = process.env.REACT_APP_API_URL

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      company_details: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      pin_code: '',
      user: JSON.parse(localStorage.getItem('user') || '[]'),
      edit: false,
      editAddress: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  postBussinessDetails = async () => {
    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }

    console.log('body', body)
    alert(' Details are being Updated Please Wait! ')
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.access}`,
      },
    }
    try {
      await axios.patch(`${api}/auth/users/me/`, body, config)
      alert('Your details have been uploaded Successfully! ')

      this.props.checkAuthenticated()
      this.props.load_user()
    } catch (err) {
      alert('Unable to save the details please try again ! ')
      console.log(err)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    console.log(this.state)

    event.preventDefault()
    this.postBussinessDetails()
  }
  postAddressDetails = async () => {
    alert('Your details are being uploaded please wait! ')
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.access}`,
      },
    }
    const addressbody = {
      address_line1: this.state.address_line1,
      address_line2: this.state.address_line2,
      city: this.state.city,
      state: this.state.state,
      pin_code: this.state.pin_code,
      user: this.state.user.id,
    }
    await axios
      .post(`${api}/api/address/`, addressbody, config)
      .then((res) => {
        alert('Your details have been uploaded Successfully! ')
        console.log(res)
        this.props.checkAuthenticated()
        this.props.load_user()
      })
      .catch((err) => {
        alert('Unable to save the details please try again ! ')
        console.log(err)
      })
  }
  patchAddressDetails = async () => {
    alert('Your details are being uploaded please wait! ')
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.access}`,
      },
    }
    const addressbody = {
      address_line1: this.state.address_line1,
      address_line2: this.state.address_line2,
      city: this.state.city,
      state: this.state.state,
      pin_code: this.state.pin_code,
      user: this.state.user.id,
    }
    await axios
      .patch(
        `${api}/api/address/${this.state.user.address[0].id}/`,
        addressbody,
        config
      )
      .then((res) => {
        alert('Your details have been uploaded Successfully! ')
        console.log(res)
        this.props.checkAuthenticated()
        this.props.load_user()
      })
      .catch((err) => {
        alert('Unable to save the details please try again ! ')
        console.log(err)
      })
  }

  handleSubmitAddress(event) {
    console.log(this.state)
    event.preventDefault()
    this.postAddressDetails()
  }
  handleSubmitUpdateAddress(event) {
    console.log(this.state)
    event.preventDefault()
    this.patchAddressDetails()
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    this.state.user.address.length === 0
      ? this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          // address_line1: user.address[0].address_line1,
          // address_line2: user.address[0].address_line2,
          // city: user.address[0].city,
          // state: user.address[0].state,
          // pin_code: user.address[0].pin_code,
        })
      : this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          address_line1: user.address[0].address_line1,
          address_line2: user.address[0].address_line2,
          city: user.address[0].city,
          state: user.address[0].state,
          pin_code: user.address[0].pin_code,
        })

    console.log('state', this.state)
  }
  render() {
    return (
      <Wrapper className='container'>
        <br />
        <br />
        {this.state.edit ? (
          <React.Fragment>
            <h5 style={{ fontWeight: '700' }}>
              Personal Information &nbsp;&nbsp;{' '}
            </h5>
            <br />
            <div className='formcontent'>
              <form onSubmit={this.handleSubmit}>
                <label className='form-label'>
                  First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Last
                  Name
                </label>
                <div className='name'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='First Name'
                    aria-describedby='emailHelp'
                    name='first_name'
                    value={this.state.first_name || ''}
                    required
                    onChange={this.handleChange}
                  ></input>

                  <input
                    type='text'
                    className='form-control'
                    placeholder='Last Name'
                    aria-describedby='emailHelp'
                    name='last_name'
                    value={this.state.last_name || ''}
                    required
                    onChange={this.handleChange}
                  ></input>
                </div>
                <button type='submit' className='btn btn-warning'>
                  Update&nbsp;
                </button>
                <button
                  onClick={() => this.setState({ edit: false })}
                  type='submit'
                  className='btn btn-secondary'
                >
                  Cancel
                </button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5 style={{ fontWeight: '700' }}> Personal Information</h5>
            <br />
            <h5>
              Name: {this.state.first_name} {this.state.last_name}&nbsp;&nbsp;{' '}
              <FaRegEdit onClick={() => this.setState({ edit: true })} />
            </h5>
          </React.Fragment>
        )}
        <br />

        {this.state.editAddress ? (
          <React.Fragment>
            <h5 style={{ fontWeight: '700' }}>Address Details</h5>
            <div className='formcontent'>
              <form>
                <div className='password'>
                  <label className='form-label'>Address Line 1</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Please Enter Your Street Address'
                    name='address_line1'
                    value={this.state.address_line1 || ''}
                    required
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className='password'>
                  <label className='form-label'>Address Line 2</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Please Enter Your Street Address'
                    name='address_line2'
                    value={this.state.address_line2 || ''}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <label className='form-label'>
                  City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; State
                </label>
                <div className='name'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Eg.Satara'
                    name='city'
                    value={this.state.city || ''}
                    required
                    onChange={this.handleChange}
                  ></input>

                  <input
                    type='text'
                    className='form-control'
                    placeholder='Eg. Maharashtra'
                    name='state'
                    value={this.state.state || ''}
                    required
                    onChange={this.handleChange}
                  ></input>
                </div>
                <label className='form-label'>Zip Code</label>
                <div className='name'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='6 digit Code  '
                    name='pin_code'
                    value={this.state.pin_code || ''}
                    required
                    onChange={this.handleChange}
                  ></input>
                </div>
                {this.state.user.address.length === 0 ? (
                  <>
                    <button
                      onClick={(e) => this.handleSubmitAddress(e)}
                      type='submit'
                      className='btn btn-warning'
                    >
                      Save
                    </button>

                    <button
                      onClick={() => this.setState({ editAddress: false })}
                      type='submit'
                      className='btn btn-secondary'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => this.handleSubmitUpdateAddress(e)}
                      type='submit'
                      className='btn btn-warning'
                    >
                      update&nbsp;
                    </button>
                    <button
                      onClick={() => this.setState({ editAddress: false })}
                      type='submit'
                      className='btn btn-secondary'
                    >
                      Cancel
                    </button>
                  </>
                )}
              </form>
            </div>
          </React.Fragment>
        ) : (
          <>
            <h5 style={{ fontWeight: '700' }}>
              Address Details&nbsp;&nbsp;{' '}
              <FaRegEdit onClick={() => this.setState({ editAddress: true })} />
            </h5>
            <br />
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1rem' }}>Address Line 1:</p>
              <p style={{ fontSize: '1rem' }}>
                &nbsp;&nbsp;&nbsp; {this.state.address_line1}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1rem' }}>Address Line 2: </p>
              <p style={{ fontSize: '1rem' }}>
                &nbsp;&nbsp;&nbsp;{this.state.address_line2}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1rem' }}> City:</p>
              <p style={{ fontSize: '1rem' }}>
                {' '}
                &nbsp;&nbsp;&nbsp;{this.state.city}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1rem' }}>State:</p>
              <p style={{ fontSize: '1rem' }}>
                &nbsp;&nbsp;&nbsp;{this.state.state}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1rem' }}>Zip code:</p>
              <p style={{ fontSize: '1rem' }}>
                &nbsp;&nbsp;&nbsp; {this.state.pin_code}
              </p>
            </div>
          </>
        )}
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
  }
}

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  PersonalInfo
)
