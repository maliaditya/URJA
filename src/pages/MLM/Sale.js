import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
const api = process.env.REACT_APP_API_URL

class Sales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      product: '',
      sale: false,
      category: null,
      product_type: 'member',
      userName: '',
      userID: '',
      userBOOL: true,
      productCategories: [],
      loading: false,
    }
  }

  fetchCategories = async () => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.access}`,
      },
    }
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const product_categories = await axios.get(
      `${api}/api/stock/?member=${user.seller_account[0].member_id}`,
      config
    )
    this.setState({
      productCategories: product_categories.data,
    })
  }

  componentDidMount() {
    this.fetchCategories()
  }

  handleChange = (e) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.access}`,
      },
    }
    this.setState({
      [e.target.id]: e.target.value,
    })

    this.setState({ userName: e.target.value })
    if (this.state.userBOOL) {
      let url = `${api}/api/name/?member=${e.target.value}`
      axios
        .get(url, config)
        .then((res) => {
          this.setState({
            userName: res.data.member_name,
            userID: res.data.member_id,
            userBOOL: false,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  clearForm = () => {
    if (!this.state.userBOOL) {
      this.setState({ userName: '', userID: '', userBOOL: true })
    }
  }
  handleRadioChange = (e) => {
    this.setState({
      product_type: e.target.value,
    })
  }
  handleConfirmation = () => {
    axios
      .get(`${api}/api/mbw-product/${this.state.category}/`)
      .then((res) => {
        this.setState({ product: res.data.name, sale: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)

    this.setState({
      loading: true,
      sale: false,
    })
    let url = `${api}/api/sale/`

    const body = {
      member: this.state.userID,
      product: parseInt(this.state.category),
      seller: this.props.user.seller_account[0].member_id,
    }

    axios
      .post(url, body, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.props.access}`,
        },
      })
      .then((res) => {
        console.log(res.data)

        this.props.checkAuthenticated()
        this.props.load_user()
        this.setState({
          loading: false,
        })
        alert('Product sold!')
      })
      .catch((err) => {
        console.log(err.response)
        this.setState({
          loading: false,
        })

        alert(err.response.data['message'])
      })

    this.setState({
      name: '',
      category: '',
      userName: '',
      sale: false,
      category: null,
      userID: '',
      userBOOL: true,
      loading: false,
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ padding: '10rem' }}>
          <center>
            <LoopCircleLoading />
          </center>
        </div>
      )
    }
    if (this.props.user.seller_account[0].active_city[0].is_active) {
      return (
        <div className='App mt-3 ml-2'>
          <h4>Service Office Sale </h4>
          <hr />

          {!this.state.sale ? (
            <div>
              <div className='mb-2 mt-4 ml-5'>
                <label className='mb-2 '>Product Type</label>
                <tbody>
                  <tr>
                    <td className='ml-10'>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='member'
                            id='member'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'member'}
                          />
                          &nbsp; User
                        </label>
                      </div>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className='ml-10' style={{ marginLeft: '20rem' }}>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='seller'
                            id='seller'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'seller'}
                          />
                          &nbsp; Leader
                        </label>
                      </div>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className='ml-10' style={{ marginLeft: '5rem' }}>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='other'
                            id='other'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'other'}
                          />
                          &nbsp;other
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <br />
                <label className='form-label'>Products *</label>
                <select
                  style={{ width: '40vh' }}
                  className='form-select'
                  onChange={(e) => this.setState({ category: e.target.value })}
                >
                  <option>---Select ---</option>
                  {this.state.productCategories
                    .filter(
                      (item) =>
                        item.stock > 0 &&
                        item.product_type === this.state.product_type
                    )
                    .map((item, index) => {
                      console.log('itemmy', item)
                      return (
                        <option
                          key={index}
                          required
                          id='category'
                          value={item.product_id}
                          onChange={(e) => this.setState({ category: item.id })}
                        >
                          {' '}
                          {item.product}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div className=' ml-5'>
                <label className='form-label'> User Code </label>
                {this.state.userBOOL ? (
                  <input
                    style={{ width: '40vh' }}
                    type='text'
                    className='form-control'
                    placeholder='Eg: URJA8BE073'
                    id='name'
                    autoComplete='ofaf'
                    value={this.state.userName}
                    onChange={this.handleChange}
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
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                  />
                )}
              </div>

              <button
                type='submit'
                className='btn btn-primary mt-3  ml-5'
                onClick={this.handleConfirmation}
              >
                Sale
              </button>

              <button
                onClick={this.clearForm}
                className='btn btn-secondary mt-3  ml-2'
              >
                clear form
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '1.4rem' }}>
                Are you sure you want to sell {this.state.product} to{' '}
                {this.state.userName}?
              </p>
              <button
                type='submit'
                className='btn btn-warning mt-3 '
                onClick={this.handleSubmit}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  this.setState({ sale: false })
                }}
                className='btn btn-danger mt-3  ml-2'
              >
                No
              </button>
            </div>
          )}
        </div>
      )
    }
    if (this.props.user.seller_account[0].is_admin) {
      return (
        <div className='App mt-3 ml-2'>
          <h4>Admin Sale </h4>
          <hr />
          {!this.state.sale ? (
            <div>
              <div className='mb-2 mt-4 ml-5'>
                <label className='mb-2 '>Product Type</label>
                <tbody>
                  <tr>
                    <td className='ml-10'>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='member'
                            id='member'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'member'}
                          />
                          &nbsp; User
                        </label>
                      </div>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className='ml-10' style={{ marginLeft: '20rem' }}>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='seller'
                            id='seller'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'seller'}
                          />
                          &nbsp; Leader
                        </label>
                      </div>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

                    <td className='ml-10' style={{ marginLeft: '5rem' }}>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='distributer'
                            id='distributer'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'distributer'}
                          />
                          &nbsp; Service Office
                        </label>
                      </div>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className='ml-10' style={{ marginLeft: '5rem' }}>
                      <div className='radio'>
                        <label>
                          <input
                            type='radio'
                            value='other'
                            id='other'
                            onChange={this.handleRadioChange}
                            checked={this.state.product_type === 'other'}
                          />
                          &nbsp;other
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>

                <label className='form-label'>Products *</label>
                <select
                  style={{ width: '40vh' }}
                  className='form-select'
                  onChange={(e) => this.setState({ category: e.target.value })}
                >
                  <option>---Select ---</option>
                  {this.state.productCategories
                    .filter(
                      (item) =>
                        item.stock > 0 &&
                        item.product_type === this.state.product_type
                    )
                    .map((item, index) => {
                      console.log('itemmy', item)
                      return (
                        <option
                          key={index}
                          required
                          id='category'
                          value={item.product_id}
                          onChange={(e) => this.setState({ category: item.id })}
                        >
                          {' '}
                          {item.product}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div className=' ml-5'>
                <label className='form-label'> User Code </label>
                {this.state.userBOOL ? (
                  <input
                    style={{ width: '40vh' }}
                    type='text'
                    className='form-control'
                    placeholder='Eg: URJA8BE073'
                    id='name'
                    autoComplete='off'
                    value={this.state.userName}
                    onChange={this.handleChange}
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
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                  />
                )}
              </div>

              <button
                type='submit'
                className='btn btn-primary mt-3  ml-5'
                onClick={this.handleConfirmation}
              >
                Sale
              </button>

              <button
                onClick={this.clearForm}
                className='btn btn-secondary mt-3  ml-2'
              >
                clear form
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '1.4rem' }}>
                Are you sure you want to sell {this.state.product} to{' '}
                {this.state.userName}?
              </p>
              <button
                type='submit'
                className='btn btn-warning mt-3 '
                onClick={this.handleSubmit}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  this.setState({ sale: false })
                }}
                className='btn btn-danger mt-3  ml-2'
              >
                No
              </button>
            </div>
          )}
        </div>
      )
    }
    return (
      <div className='App mt-3 ml-2'>
        <h4>Sale </h4>
        <hr />
        {!this.state.sale ? (
          <div>
            <label className='mb-2   '>Product Type</label>
            <tbody>
              <tr>
                <td className='ml-10'>
                  <div className='radio'>
                    <label>
                      <input
                        type='radio'
                        value='member'
                        id='member'
                        onChange={this.handleRadioChange}
                        checked={this.state.product_type === 'member'}
                      />
                      &nbsp; User
                    </label>
                  </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

                <td className='ml-10' style={{ marginLeft: '5rem' }}>
                  <div className='radio'>
                    <label>
                      <input
                        type='radio'
                        value='other'
                        id='other'
                        onChange={this.handleRadioChange}
                        checked={this.state.product_type === 'other'}
                      />
                      &nbsp;other
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
            <div className='mb-2 mt-4'>
              <label className='form-label'>Products *</label>
              <select
                style={{ width: '40vh' }}
                className='form-select'
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <option>---Select ---</option>
                {this.state.productCategories
                  .filter(
                    (item) =>
                      item.stock > 0 &&
                      item.product_type === this.state.product_type
                  )
                  .map((item, index) => {
                    console.log('itemmy', item)
                    return (
                      <option
                        key={index}
                        required
                        id='category'
                        value={item.product_id}
                        onChange={(e) => this.setState({ category: item.id })}
                      >
                        {' '}
                        {item.product}
                      </option>
                    )
                  })}
              </select>
            </div>

            <div className=' '>
              <label className='form-label'> User Code </label>
              {this.state.userBOOL ? (
                <input
                  style={{ width: '40vh' }}
                  type='text'
                  className='form-control'
                  placeholder='Eg: URJA8BE073'
                  autoComplete='off'
                  id='name'
                  value={this.state.userName}
                  onChange={this.handleChange}
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
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
              )}
            </div>

            <button
              type='submit'
              className='btn btn-primary mt-3 '
              onClick={this.handleConfirmation}
            >
              Sale
            </button>

            <button
              onClick={this.clearForm}
              className='btn btn-secondary mt-3  ml-2'
            >
              clear form
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.4rem' }}>
              Are you sure you want to sell {this.state.product} to{' '}
              {this.state.userName}?
            </p>
            <button
              type='submit'
              className='btn btn-warning mt-3 '
              onClick={this.handleSubmit}
            >
              Yes
            </button>
            <button
              onClick={() => {
                this.setState({ sale: false })
              }}
              className='btn btn-danger mt-3  ml-2'
            >
              No
            </button>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: JSON.parse(localStorage.getItem('user') || '[]'),
  }
}

export default connect(mapStateToProps, {
  load_user,
  checkAuthenticated,
})(Sales)
