import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'

const api = process.env.REACT_APP_API_URL

class NewOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      total: 0,
      product_type: 'member',
      admin: '',
    }
  }
  MyCart = []

  fetchCategories = async () => {
    let url = `${api}/api/mbw-product/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    await axios
      .get(url, config)
      .then((result) => {
        this.setState({ products: result.data })
        console.log('result.data', result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchCategories()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    const url = `${api}/api/admin/`
    axios
      .get(url, config)
      .then((res) => {
        this.setState({ admin: res.data.admin })
        console.log('result.data', res.data.admin)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getTotal = (arr) => {
    let total = 0
    let a = [...new Map(arr.map((item) => [item['product'], item])).values()]
    a.map((item) => {
      if (isNaN(item.quantity)) total = total + item.price * 0
      else total = total + item.price * item.quantity
      return 0
    })
    this.setState({
      MyCart: a,
    })
    return total
  }

  // handleClick=()=>{
  //    this.setState({total:this.getTotal(this.MyCart)})
  // }
  // sellerDetails = this.props.user.seller_account[0]

  handleQuantity = (name, key, id, e) => {
    const sellerDetails = this.props.user.seller_account[0]
    var obj = {}
    if (!this.MyCart.length) {
      obj['product'] = name
      obj['price'] = key
      obj['product_id'] = id
      obj['order_by'] = sellerDetails.member_id
      obj['quantity'] = parseInt(e.target.value)
      this.MyCart.push(obj)
      this.setState({ total: this.getTotal(this.MyCart) })
    } else {
      this.MyCart = this.MyCart.filter(function (obj) {
        return obj.product_id !== id
      })
      obj['product'] = name
      obj['price'] = key
      obj['product_id'] = id
      obj['order_by'] = sellerDetails.member_id
      obj['quantity'] = parseInt(e.target.value)
      this.MyCart.push(obj)
      this.setState({ total: this.getTotal(this.MyCart) })
    }
  }
  handleRadioChange = (e) => {
    this.setState({
      product_type: e.target.value,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    let url = `${api}/api/order/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = {
      ordered_from: this.state.admin,
      orded_by: this.props.user.seller_account[0].member_id,
      total_amount: this.state.total,
      is_paid: false,
      order_detail: this.MyCart,
    }
    console.log('body', body)
    await axios
      .post(url, body, config)
      .then((result) => {
        console.log(result.data)
        alert('Your order request has been submited')
      })
      .catch((err) => {
        console.log(err)
        alert('Failed to create your order. please try again later')
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
      <div className='mt-4 ml-1'>
        <h4>Order Form</h4>
        <hr />
        <br />
        <div className='row-fluid'>
          <label
            className='mb-2 '
            style={{ marginRight: '30vh', fontWeight: '700' }}
          >
            Product Type
          </label>
          {this.props.user.seller_account[0].active_city[0].is_active ? (
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
                <td className='ml-10' style={{ marginLeft: '20rem' }}>
                  <div className='radio'>
                    <label>
                      <input
                        type='radio'
                        value='other'
                        id='other'
                        onChange={this.handleRadioChange}
                        checked={this.state.product_type === 'other'}
                      />
                      &nbsp; other
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
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
                        value='other'
                        id='other'
                        onChange={this.handleRadioChange}
                        checked={this.state.product_type === 'other'}
                      />
                      &nbsp; other
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          <br />
          <table>
            <tbody>
              <tr>
                <th>
                  <h6 style={{ marginRight: '30vh', fontWeight: '700' }}>
                    Product
                  </h6>
                </th>
                <th>
                  <h6 style={{ marginRight: '30vh', fontWeight: '700' }}>
                    Price
                  </h6>
                </th>
                <th>
                  <h6 style={{ fontWeight: '700' }}>Quantity</h6>
                </th>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              {this.state.products
                .filter(
                  (product) =>
                    !product.published &&
                    !product.is_package_product &&
                    product.product_type === this.state.product_type
                )
                .map((item, index) => {
                  return (
                    <tr className='mt-2'>
                      <td>{item.name}</td>
                      <td>
                        <h5>₹{item.Price}</h5>
                      </td>
                      <td>
                        <input
                          type='number'
                          name='quantity'
                          onClick={this.handleClick}
                          min='0'
                          onChange={(e) =>
                            this.handleQuantity(
                              item.name,
                              item.Price,
                              item.id,
                              e
                            )
                          }
                        />
                      </td>
                    </tr>
                  )
                })}
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>

              <tr>
                <td>Total</td>
                <td>₹ {this.state.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button
          type='submit'
          onClick={this.handleSubmit}
          className='btn btn-secondary'
        >
          {' '}
          Submit{' '}
        </button>
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
})(NewOrder)
