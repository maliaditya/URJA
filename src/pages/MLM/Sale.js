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

class Sales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      category: null,
      productCategories: [],
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
      const user = JSON.parse(localStorage.getItem('user') || '[]')
    const product_categories = await axios.get(`${api}/api/stock/?member=${user.seller_account[0].member_id}`, config)
    this.setState({
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


  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  

    this.setState({
      loading: true,
    })
    let url = `${api}/api/sale/`

    const body ={
    "member": this.state.name,
    "product": parseInt(this.state.category),
    "seller": this.props.user.seller_account[0].member_id
}
  console.log("body",body,this.props.user.seller_account[0].member_id)
    axios
      .post(url, body, {
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
        alert('Product sold!')
      })
      .catch((err) => {
        console.log(err)
          this.setState({
          loading: false,
        })
        alert('PRODUCT sold FAILED!, PLEASE TRY AGAIN AFTER SOMETIME!')
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
          <h2>Sale </h2>
          <hr />
        <form onSubmit={this.handleSubmit}>
          <div className='mb-2 mt-4 ml-5'>
            <label className='form-label'>Products *</label>
            <select
               style={{width:'40vh'}}
              className='form-select'
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option>Select Product</option>
              {this.state.productCategories.map((item,index) => {
                return (
                  <option
                    key={item.product_id}
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
            <label className='form-label'> Member Code </label>
            <input
              style={{width:'40vh'}}
              type='text'
              className='form-control'
              placeholder='Eg: URJA8BE073'
              id='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
      
         
          <button className='btn btn-primary mt-3  ml-5' type='submit'>
            Sale
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
})(Sales)


