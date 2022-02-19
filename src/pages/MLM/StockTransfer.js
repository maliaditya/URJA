import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
const api = process.env.REACT_APP_API_URL

//  fetchCategories = async () => {
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//         'Authorization': `Bearer ${this.props.access}`,
//       },
//     }
//     const product_categories = await axios.get(`${api}/api/stock/?user=URJAAAB061`, config)
//     product_categories.data.map((item)=>{(

//     this.setState({
//       productCategories: [...this.state.productCategories,item.product]
//     }))})
//     console.log(this.state.productCategories)
//   }

class StockTransfer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      price: '',
      admin: '',
      name: '',
      product: '',
      sale: false,
      category: null,
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
    console.log('productCategories', this.state)
    axios
      .get(`${api}/api/admin/`, config)
      .then((res) => {
        this.setState({ admin: res.data.admin })
        console.log('result.data', res.data.admin)
      })
      .catch((err) => {
        console.log(err)
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

  handleConfirmation = () => {
    axios
      .get(`${api}/api/mbw-product/${this.state.category}/`)
      .then((res) => {
        this.setState({
          product: res.data.name,
          sale: true,
          price: res.data.Price,
        })
        console.log('this.state.price', this.state)
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

    let url = `${api}/api/stock-transfer/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

      const body = {
        ordered_from: this.props.user.seller_account[0].member_id,
        orded_by: this.state.userID,
        total_amount: this.state.price,
        is_transfer: true,
        is_paid: true,
        status: 'Completed',
        delivery: 'Transfered',
        order_detail: [
          {
            product: this.state.product,
            price: this.state.price,
            product_id: this.state.category,
            order_by: this.state.userID,
            is_transfer: true,
            transfer_in: 1,
            quantity: 0,
            quantity_delivered: 0,
          },
        ],
      }

    console.log('body', body)
    axios
      .post(url, body, config)
      .then((result) => {
        this.props.checkAuthenticated()
        this.props.load_user()
        this.setState({
          loading: false,
        })
        console.log(result.data)
        alert('Product Transfer Successfully')
      })
      .catch((err) => {
        this.setState({
          loading: false,
        })
        console.log(err)
        alert(err.response.data['message'])
      })

    this.setState({
      name: '',
      category: '',
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

    return (
      <div className='App mt-3 ml-2'>
        <h4>Stock Transfer </h4>
        <hr />
        {!this.state.sale ? (
          <div>
            <div className='mb-2 mt-4 ml-5'>
              <label className='form-label'>Products *</label>
              <select
                style={{ width: '40vh' }}
                className='form-select'
                onChange={(e) =>
                  this.setState({
                    category: e.target.value,
                    product: e.target.value,
                  })
                }
              >
                <option>---Select ---</option>
                {this.state.productCategories.map((item, index) => {
                  return (
                    <option
                      key={item.product_id}
                      required
                      id='category'
                      value={item.product_id}
                      onChange={(e) =>
                        this.setState({
                          category: item.id,
                          product: item.product,
                        })
                      }
                    >
                      {' '}
                      {item.product}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className=' ml-5'>
              <label className='form-label'> Member Code </label>
              {this.state.userBOOL ? (
                <input
                  style={{ width: '40vh' }}
                  type='text'
                  className='form-control'
                  placeholder='Eg: URJA8BE073'
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
              className='btn btn-primary mt-3  ml-5'
              onClick={this.handleConfirmation}
            >
              Transfer
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
              Are you sure you want to transfer {this.state.product} to{' '}
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
})(StockTransfer)
