import React, { Component } from 'react'
// import styled from 'styled-components'
// import ImageUpload from './ImageUpload'
// import BackImage from './BackImage'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user, checkAuthenticated } from '../../actions/auth'
import { LoopCircleLoading } from 'react-loadingg'
import _ from "lodash";

const api = process.env.REACT_APP_API_URL

class AddProduct extends Component {
   
  constructor(props) {
    super(props)

    this.state = {
        name: '',
        created_by: props.user.id,
        description: '',
        is_published: true,
        price: '',
        mrp: '',
        product_type: 'member',
        productCategories: [],
        points_to_city_distributer:'',
        points_to_district_distributer:'',
        points_to_taluka_distributer:'',
        points_to_buyer:'',
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
    "name": this.state.name,
    "created_by":this.state.created_by,
    "description": this.state.description,
    "is_published": this.state.is_published,
    "Price":this.state.price,
    "product_type":this.state.product_type,
    "points_to_buyer": this.state.points_to_buyer,
    "points_to_city_distributer": this.state.points_to_city_distributer,
    "points_to_taluka_distributer": this.state.points_to_taluka_distributer,
    "points_to_district_distributer": this.state.points_to_district_distributer,
    "MRP": this.state.mrp,
    "levels": this.creatLevelsObject()


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
        created_by: '',
        description: '',
        is_published: true,
         points_to_seller:'',
        points_to_distributer:'',
        points_to_buyer:'',
        price: '',
        mrp: '',
        
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
      <div className='App' style={{padding:'2rem'}}>
        <form onSubmit={this.handleSubmit}>
         

          <div>
            <label className='form-label'>Name * </label>
            <input
              type='text'
              className='form-control'
              placeholder='Product name'
              style={{width:'40rem'}}
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          
         
          <div className='mt-2'>
            <label className='form-label'>Description *</label>

            <textarea
              type='text'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Product details'
              id='description'
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>
        <div className='mt-2'>
            <label className='form-label'> Price (₹) *</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Product MRP '
              id='price'
              min='0'
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='mt-2'>
            <label className='form-label'> MRP (₹) *</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Product MRP '
              id='mrp'
              min='0'
              value={this.state.mrp}
              onChange={this.handleChange}
              required
            />
          </div>
           <div className='mt-2'>
           <label className='form-label'> Points To Distributer*</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Points To City Distributer '
              id='points_to_city_distributer'
              min='0'
              value={this.state.points_to_city_distributer}
              onChange={this.handleChange}
              required
            />
          </div>
            <div className='mt-2'>
           <label className='form-label'> Points To Taluka Distributer*</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Points To Taluka Distributer '
              id='points_to_taluka_distributer'
              min='0'
              value={this.state.points_to_taluka_distributer}
              onChange={this.handleChange}
              required
            />
          </div>
            <div className='mt-2'>
           <label className='form-label'> Points To District Distributer*</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Points To District Distributer '
              id='points_to_district_distributer'
              min='0'
              value={this.state.points_to_district_distributer}
              onChange={this.handleChange}
              required
            />
          </div>
           <div className='mt-2'>
            <label className='form-label'> Points To Sponser*</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='Points To Sponser '
              id='points_to_buyer'
              min='0'
              value={this.state.points_to_buyer}
              onChange={this.handleChange}
              required
            />
          </div>
          
          <div className='mt-3 '>
            <input
              type='checkbox'
                id='level'
              min='0'
              defaultChecked={this.state.is_published} 
              onChange={this.handleChange}
              required
            />
            <label className='form-label'>&nbsp;Published </label>
          </div>
           <div className='mt-2 mb-2'>
            <label className='form-label'>No Of Levels</label>
            <input
              type='number'
              className='form-control'
              style={{width:'40rem'}}
              placeholder='No Of Levels'
              id='level'
              min='0'
              value={this.state.level}
              onChange={this.handleChange}
              required
            />
          </div>
            { _.times(this.state.level,String).map(item =>    <div >
            <label className='form-label'>Points for level {parseInt(item)+1}</label> &nbsp;
            <input
              type='number'
              className=''
              style={{width:'10rem'}}
              id='price'
              min='0'
              onChange={(e) => this.handelLevels(parseInt(item)+1, e)}
              required
            />
          </div>)}
          <label className='mb-2 '>Product Type</label>

          <tbody>
            <tr>
                <td className='ml-10'>
                    <div className="radio">
                          <label>
                            <input type="radio" value="member"  id="member" onChange={this.handleRadioChange} checked={this.state.product_type === 'member'} />
                       &nbsp; Member
                          </label>
                        </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td className='ml-10'  style={{marginLeft:'20rem'}}>
                  <div className="radio">
                        <label>
                          <input type="radio" value="seller"  id="seller" onChange={this.handleRadioChange} checked={this.state.product_type === 'seller'} />
                       &nbsp; Seller
                        </label>
                      </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

                <td className='ml-10'  style={{marginLeft:'5rem'}}>
                          <div className="radio">
                            <label>
                              <input type="radio" value="distributer" id="distributer" onChange={this.handleRadioChange} checked={this.state.product_type === 'distributer'} />
                           &nbsp; Distributer
                            </label>
                          </div>
                </td>
              </tr>
              </tbody>
             
    
    
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
})(AddProduct)
