import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
const api = process.env.REACT_APP_API_URL

class CreateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      details: '',
      price: '',
      discount: '',
      front_image: null,
      created_by: props.user.id,
      back_image: '',
      extra_image: '',
      category: null,
      product_type: null,
      rating: 0,
      total_ratings: 0,
      company: props.user.company_details[0].id,
      productType: [],
      productCategories: [],
      // approved: 'Pending',
      in_stock: true,
      loading: false,
    }
  }

  fetchCategories = async () => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${this.props.access}`,
      },
    }
    const product_type = await axios.get(`${api}/api/product_type/`, config)
    const product_categories = await axios.get(`${api}/api/categories/`, config)
    this.setState({
      productType: product_type.data,
      productCategories: product_categories.data,
    })
    console.log(this.state)
  }

  componentDidMount() {
    this.fetchCategories()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleImageChange = (e) => {
    this.setState({
      front_image: e.target.files[0],
    })
  }

  handleBackImageChange = (e) => {
    this.setState({
      back_image: e.target.files[0],
    })
  }
handleExtraImageChange = (e) => {
    this.setState({
      extra_image: e.target.files[0],
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    let form_data = new FormData()
    form_data.append(
      'front_image',
      this.state.front_image,
      this.state.front_image.name
    )
    form_data.append('name', this.state.name)
    form_data.append('price', this.state.price)
    form_data.append('discount', this.state.discount)
    form_data.append('details', this.state.details)
    form_data.append('created_by', this.state.created_by)
    form_data.append('category', this.state.category)
    form_data.append('back_image', this.state.back_image)
    form_data.append('extra_image', this.state.extra_image)
    form_data.append('product_type', this.state.product_type)
    form_data.append('company', this.state.company)
    form_data.append('rating', this.state.rating)
    form_data.append('total_ratings', this.state.total_ratings)
    form_data.append('in_stock', this.state.in_stock)
    // form_data.append('approved', this.state.approved)

    this.setState({
      loading: true,
    })
    let url = `${api}/api/products/`
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${this.props.access}`,
        },
      })
      .then((res) => {
        console.log(res.data)

        this.props.checkAuthenticated()
        this.props.load_user()
        this.setState({
          loading: false,
        })
        alert('Your Product Is Uploaded!')
      })
      .catch((err) => {
        console.log(err)
        alert('PRODUCT UPLOAD FAILED!, PLEASE TRY AGAIN AFTER SOMETIME!')
      })

    this.setState({
      name: '',
      details: '',
      price: '',
      discount:'',
      front_image: '',
      back_image: '',
      extra_image:'',
      category: '',
      product_type: '',
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
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label className='form-label'>Seller Type (Mandatory) *</label>
            <select
              className='form-select'
              onChange={(e) => this.setState({ product_type: e.target.value })}
            >
              <option>Select Seller Type </option>
              {this.state.productType.map((item) => {
                return (
                  <option
                    key={item.id}
                    id='product_type'
                    onChange={(e) => this.setState({ product_type: item.id })}
                    value={item.id}
                  >
                    {' '}
                    {item.product_type}
                  </option>
                )
              })}
            </select>
          </p>
          <p>
            <label className='form-label'>Product Category (Mandatory) *</label>
            <select
              className='form-select'
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option>Select Categories</option>
              {this.state.productCategories.map((item) => {
                return (
                  <option
                    key={item.id}
                    required
                    id='category'
                    value={item.id}
                    onChange={(e) => this.setState({ category: item.id })}
                  >
                    {' '}
                    {item.category_name}
                  </option>
                )
              })}
            </select>
          </p>

          <p>
            <label className='form-label'>Product name * </label>
            <input
              type='text'
              className='form-control'
              placeholder='Product name'
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <label className='form-label'>Product price (₹) *</label>

            <input
              type='number'
              className='form-control'
              placeholder='Product Price/ MRP '
              id='price'
              min='0'
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </p>
           <p>
            <label className='form-label'>Discount ( Will be taken in '%' ) * </label>

            <input
              type='number'
              className='form-control'
              placeholder='(Enter 0 for no discount), Enter Discount eg : 10 '
              id='discount'      
              min='0'
              max='100'
              value={this.state.discount}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <label className='form-label'>Product details *</label>

            <textarea
              type='text'
              className='form-control'
              placeholder='Product details'
              id='details'
              value={this.state.details}
              onChange={this.handleChange}
              required
            />
          </p>

          <p>
              <label className='form-label'>Front Image: * &nbsp;</label>
            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              onChange={this.handleImageChange}
              required
            />
          </p>
          <p>
              <label className='form-label'>Back Image:  &nbsp; &nbsp;</label>

            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              onChange={this.handleBackImageChange}
              
            />
          </p>
          <p>
              <label className='form-label'>Extra Image:  &nbsp; &nbsp;</label>

            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              onChange={this.handleExtraImageChange}
              
            />
          </p>
          <button className='btn btn-primary' type='submit'>
            Upload Product
          </button>
        </form>
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
})(CreateProduct)
