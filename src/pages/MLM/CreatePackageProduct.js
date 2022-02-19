import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
// import _ from "lodash";

const api = process.env.REACT_APP_API_URL

class CreatePackageProduct extends Component {
   
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      created_by: props.user.id,
      description: 'package product',
      is_published: false,
      has_key: false,
      price: 0,
      mrp: 0,
      product_type: 'package product',
      productCategories: [],
      points_to_city_distributer: 0,
      points_to_district_distributer:0,
      points_to_taluka_distributer:0,
      points_to_buyer:0,
      is_package_product: true,
      is_package: false,
      add_package_product: 0,
      quantity:0,
      packageProducts: [],
    }
  }

    levels = new Map()

  fetchCategories = async () => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${this.props.access}`,
      },
    }
    const product_type = await axios.get(`${api}/api/product_type/`, config)
    const product_categories = await axios.get(`${api}/api/categories/`, config)
    // const packageProducts = await axios.get(
    //   `${api}api/mbw-product/?is_package_product=True`,
    //   config
    // )

    
    this.setState({
      productType: product_type.data,
      productCategories: product_categories.data,
      // packageProducts: packageProducts.data
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

  handleRadioChange = (e) => {
    this.setState({
     product_type: e.target.value,
    })
  }
  handelLevels = (key,e) => {
    this.levels.set(key,e.target.value)
    this.creatLevelsObject()

    
  }
   creatLevelsObject = () => {
        const myLevels = []
        this.levels.forEach(function(value, key) {
        var obj = {}
        obj[ "level"] = key
        obj["points"] = parseInt(value)
        myLevels.push(obj)
      
    })
      return myLevels
   }    

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      loading: true,
    })
    let url = `${api}/api/mbw-product/`

    const body = {
      name: this.state.name,
      created_by: this.state.created_by,
      description: this.state.description,
      is_published: this.state.is_published,
      has_key: this.state.has_key,
      is_package_product: this.state.is_package_product,
      is_package: this.state.is_package,
      Price: this.state.price,
      add_package_product: this.state.add_package_product,
      quantity: this.state.quantity,
      product_type: this.state.product_type,
      points_to_buyer: this.state.points_to_buyer,
      points_to_city_distributer: this.state.points_to_city_distributer,
      points_to_taluka_distributer: this.state.points_to_taluka_distributer,
      points_to_district_distributer: this.state.points_to_district_distributer,
      MRP: this.state.mrp,
      levels: this.creatLevelsObject(),
    }
 console.log("body",body)
  axios.post(url, body, {
        headers: {
          'content-type': 'application/json',
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
        this.setState({
          loading:false
        })
      })

     this.setState({
       name: '',
       description: '',
       is_published: false,
       has_key: true,
       points_to_seller: '',
       points_to_distributer: '',
       points_to_buyer: '',
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
      <div className='App' style={{ padding: '2rem' }}>
        <h4>Add Package Product</h4>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className='form-label'>Name * </label>
            <input
              type='text'
              className='form-control'
              placeholder='Product name'
              style={{ width: '40rem' }}
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className='mt-3 '>
            <input
              type='checkbox'
              id='has_key'
              min='0'
              defaultChecked={this.state.has_key}
              onChange={this.handleChange}
            />
            <label className='form-label'>&nbsp;Has Key </label>
          </div>

          <button className='btn btn-warning mt-3' type='submit'>
            Save
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
})(CreatePackageProduct)

