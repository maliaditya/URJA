import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'

const api = process.env.REACT_APP_API_URL

class GenerateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      total: 0,
      product_type: 'member',
      bonus: '',
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

    let url = `${api}/api/seller_dashboard/?user=${this.props.user.seller_account[0].member_id}`
    axios
      .get(url, config)
      .then((res) => {
        this.setState({ bonus: res.data.bonus_points })
      })
      .catch((err) => {
        console.log(err)
      })

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
  handleRadioChange = (e) => {
    this.setState({
      product_type: e.target.value,
    })
  }
  handleGenerateProducts = async (e, price, product, product_id) => {
    e.preventDefault()
    console.log('papsp', product_id, product, price)
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
      total_amount: price,
      is_paid: true,
      is_generated: true,
      status: 'Completed',
      delivery: 'Generated',
      order_detail: [
        {
          product: product,
          price: price,
          product_id: product_id,
          is_generated: true,
          order_by: this.props.user.seller_account[0].member_id,
          quantity: 0,
          quantity_delivered: 0,
          generated: 1,
        },
      ],
    }

    console.log('body', body)
    await axios
      .post(url, body, config)
      .then((result) => {
        console.log(result.data)
        alert('Product Generated Successfully')
      })
      .catch((err) => {
        console.log(err)
        alert('Failed to generate your product. please try again later')
      })

    await axios
      .patch(
        `${api}/api/active_seller/${this.props.user.seller_account[0].member_id}/`,
        {
          bonus_points: this.state.bonus - price,
        },
        config
      )
      .then((result) => {
        axios
          .get(
            `${api}/api/seller_dashboard/?user=${this.props.user.seller_account[0].member_id}`,
            config
          )
          .then((res) => {
            this.setState({ bonus: res.data.bonus_points })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
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

    if (this.props.user.seller_account[0].is_admin) {
      return (
        <div className='mt-4 ml-1'>
          <h4>Admin Generate Products</h4>
          <hr />
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
          <br />
          <div className='row-fluid'>
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
                      Action
                    </h6>
                  </th>
                </tr>

                {this.state.products
                  .filter(
                    (item) =>
                      !item.is_package_product &&
                      item.product_type === this.state.product_type
                  )
                  .map((item, index) => {
                    return (
                      <tr className='mt-2'>
                        <td>
                          {item.name} (₹{item.Price})
                        </td>
                        <td>
                          <h5>
                            <button
                              onClick={(e) =>
                                this.handleGenerateProducts(
                                  e,
                                  item.Price,
                                  item.name,
                                  item.id
                                )
                              }
                              className='btn btn-secondary'
                            >
                              Generate
                            </button>
                          </h5>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      )
    }
    if (this.props.user.seller_account[0].active_city[0].is_active) {
      return (
        <div className='mt-4 ml-1'>
          <h4>Balance Bonus points : {this.state.bonus}</h4>
          <hr />
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
            </tr>
          </tbody>
          <br />
          <div className='row-fluid'>
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
                      Action
                    </h6>
                  </th>
                </tr>

                {this.state.products
                  .filter(
                    (item) =>
                      !item.is_package_product &&
                      item.product_type === this.state.product_type
                  )
                  .map((item, index) => {
                    return (
                      <tr className='mt-2' key={index}>
                        <td>
                          {item.name} (₹{item.Price})
                        </td>
                        <td>
                          <h5>
                            {parseInt(item.Price) >
                            parseInt(this.state.bonus) ? (
                              <button
                                disabled
                                onClick={(e) =>
                                  this.handleGenerateProducts(
                                    e,
                                    item.Price,
                                    item.name,
                                    item.id
                                  )
                                }
                                className='btn btn-secondary'
                              >
                                Generate
                              </button>
                            ) : (
                              <button
                                onClick={(e) =>
                                  this.handleGenerateProducts(
                                    e,
                                    item.Price,
                                    item.name,
                                    item.id
                                  )
                                }
                                className='btn btn-secondary'
                              >
                                Generate
                              </button>
                            )}
                          </h5>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      )
    }
    return (
      <div className='mt-4 ml-1'>
        <h4>Balance Bonus points : {this.state.bonus}</h4>
        <br />
        <label
          className='mb-2  '
          style={{ marginRight: '30vh', fontWeight: '700' }}
        >
          Product Type
        </label>
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
        <br />
        <div className='row-fluid'>
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
                    Action
                  </h6>
                </th>
              </tr>

              {this.state.products
                .filter(
                  (item) =>
                    item.is_published &&
                    !item.is_package_product &&
                    item.product_type === this.state.product_type
                )
                .map((item, index) => {
                  return (
                    <tr className='mt-2'>
                      <td>
                        {item.name} (₹{item.Price})
                      </td>
                      <td>
                        <h5>
                          {parseInt(item.Price) > parseInt(this.state.bonus) ? (
                            <button
                              disabled
                              onClick={(e) =>
                                this.handleGenerateProducts(
                                  e,
                                  item.Price,
                                  item.name,
                                  item.id
                                )
                              }
                              className='btn btn-secondary'
                            >
                              Generate
                            </button>
                          ) : (
                            <button
                              onClick={(e) =>
                                this.handleGenerateProducts(
                                  e,
                                  item.Price,
                                  item.name,
                                  item.id
                                )
                              }
                              className='btn btn-secondary'
                            >
                              Generate
                            </button>
                          )}
                        </h5>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <br />
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
})(GenerateProduct)

