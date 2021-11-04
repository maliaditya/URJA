import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import { load_user, checkAuthenticated } from '../actions/auth'
import axios from 'axios'
// import { Link, Redirect } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL
class UpdateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      details: '',
      price: '',
      discount: '',
      front_image: '',
      created_by: props.user.id,
      back_image: '',
      category: '',
      product_type: '',
      company: props.user.company_details[0].id,
      productType: [],
      productCategories: [],
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

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    let form_data = new FormData()
    // form_data.append('front_image', this.state.front_image, this.state.front_image.name);
    form_data.append('name', this.state.name)
    form_data.append('price', this.state.price)
    form_data.append('discount', this.state.discount)
    form_data.append('details', this.state.details)
    form_data.append('created_by', this.state.created_by)
    form_data.append('category', this.state.category)
    // form_data.append('back_image', this.state.back_image);
    form_data.append('product_type', this.state.product_type)
    form_data.append('company', this.state.company)
    let url = `${api}/api/products/${this.props.currentItem.id}/`
    console.log('form_data', form_data)
    axios
      .put(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${this.props.access}`,
        },
      })
      .then((res) => {
           this.props.checkAuthenticated()
        this.props.load_user()
        console.log('form_data', res.data)
        alert('Product Updated Successfully!')
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  componentDidMount() {
    this.fetchCategories()
    const currentItem = JSON.parse(localStorage.getItem('currentItem') || '[]')
    this.setState({
      name: currentItem.name,
      details: currentItem.details,
      price: currentItem.price,
      discount: currentItem.discount,
      front_image: currentItem.front_image,
      created_by: currentItem.created_by,
      back_image: currentItem.back_image,
      category: currentItem.category,
      product_type: currentItem.product_type,
      company: currentItem.company,
    })
  }

  render() {
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label className='form-label'>Seller </label>
            <select
              className='form-select'
              onChange={(e) => this.setState({ product_type: e.target.value })}
            >
              <option>Select Seller Type</option>
              {this.state.productType.map((item) => {
                return (
                  <option
                    key={item.id}
                    id='product_type'
                    onChange={(e) => this.setState({ product_type: item.id })}
                    value={item.id || ''}
                  >
                    {' '}
                    {item.product_type}
                  </option>
                )
              })}
            </select>
          </p>
          <p>
            <label className='form-label'>Product Category</label>
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
                    value={item.id || ''}
                    onChange={(e) => this.setState({ category: item.id })}
                  >
                    {item.category_name}
                  </option>
                )
              })}
            </select>
          </p>

          <p>
            <label className='form-label'>Product name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Product name'
              id='name'
              value={this.state.name || ''}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <label className='form-label'>Product Price (₹) *</label>

            <input
              type='text'
              className='form-control'
              placeholder='Product price'
              id='price'
              value={this.state.price || ''}
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
              value={this.state.discount || ''}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <label className='form-label'>Product details</label>

            <textarea
              type='number'
              className='form-control'
              placeholder='Product details'
              id='details'
              value={this.state.details || ''}
              onChange={this.handleChange}
              required
            />
          </p>
          {/* {console.log("frontimage",this.state.front_image)} */}

          {/* <p>
            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              onChange={this.handleImageChange}
              required
            />
          </p>
          <p>
            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              onChange={this.handleBackImageChange}
              required
            />
          </p> */}
          <button className='btn btn-primary' type='submit'>
            Update Product
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
    currentItem: JSON.parse(localStorage.getItem('currentItem') || '[]'),
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, {  load_user,
  checkAuthenticated,})(UpdateProduct)
