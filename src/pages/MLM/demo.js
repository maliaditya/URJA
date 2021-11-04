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

class NewOrder extends Component {
   
  constructor(props) {
    super(props)

    this.state = {
      products:[],
      total:0,
      MyCart :[]
    }
    
  }
  levels = new Map()
   

  fetchCategories = async () => {
    let url = `${api}/api/mbw-product/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
         
    await axios.get(url, config).then((result)=>{
      this.setState({products:result.data.results})
      console.log(result.data.results)

    }).catch((err)=>{
      console.log(err)
    })
   
  }

  componentDidMount() {
    this.fetchCategories()

  }

  getTotal=(arr)=>{
      let total = 0
      let a = [...new Map(  arr.map(item =>[item['product'], item])).values()]
      a.map((item)=>{
          if (isNaN(item.quantity))
          total = total+item.price *0
          else
          total = total+item.price *item.quantity

        })
        this.setState({
            MyCart:a
        })
        console.log("myarr",arr, total)
    return total
  }

    productCart = new Map()
    

  handleClick=()=>{
    // allTotal=this.getTotal(this.state.MyCart)
    // this.setState({total:allTotal})
    
  }
  handleQuantity = (name,key,id,e) => {
    const prod = this.state.products
    this.productCart.set(name, e.target.value)
    
    this.levels.set(id,e.target.value)
      var obj = {}
        console.log("in func")
      if(!this.state.MyCart.length){
            console.log("in if", this.state.MyCart)
            obj[ "product"] = name
            obj[ "price"] = key
            obj["quantity"] = parseInt(e.target.value)
            this.state.MyCart.push(obj)
              
        }else{
            for (var i = 0; i < this.state.MyCart.length; i++) {
                   if(this.state.MyCart[i].product===name){
                     this.setState({
                       MyCart:[...this.state.MyCart,this.state.MyCart[i].quantity=parseInt(e.target.value) ]
                     })
                        
                    }
                    else{
                        obj[ "product"] = name
                        obj[ "price"] = key
                        obj["quantity"] = parseInt(e.target.value)
                        this.state.MyCart.push(obj)
                        break
                    }
         
        }
  
    this.setState({total:this.getTotal(this.state.MyCart)})
      
    
  }
  }


  sellerDetails = this.props.user.seller_account[0]



  handleSubmit = async(e) => {
    e.preventDefault()

    
    let url = `${api}/api/order/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = {
    "ordered_from": "URJA7F75B8",
    "orded_by": this.props.user.seller_account[0].member_id,
    "total_amount":this.getTotal( [...new Map(  this.state.MyCart.map(item =>[item['product'], item])).values()]),
    "is_paid": false,
    "order_detail": [...new Map(  this.state.MyCart.map(item =>[item['product'], item])).values()]
    }
    console.log(body)
    await axios.post(url,body, config).then((result)=>{
      console.log(result.data)     
       alert("Your order request has been submited")

    }).catch((err)=>{
      console.log(err)
      alert("Failed to create your order. please try again later")
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
        <div className='mt-5 ml-1'>
         <div className="row-fluid">
			<table>
                <tbody><tr>
                        <th><h6 style={{marginRight:"30vh"}}>Product</h6></th>
                        <th><h6 style={{marginRight:"30vh"}}>Price</h6></th>
                        <th><h6>Quantity</h6></th>
                        </tr>
                        {this.state.products.map((item, index)=>{
                            return	<tr className='mt-2'>
						<td>{item.name}</td>
						<td><h5>₹{item.Price}</h5></td>
						<td><input type="number" name="quantity" onClick={this.handleClick}   min='0' onChange={(e)=>this.handleQuantity(item.name,item.Price,item.id,e)}/></td>
					</tr>
                        })}
				<hr />
					
					<tr className='mt-2'>
					<td>Total</td>
					<td>₹ {this.state.total}</td>
				</tr>
			</tbody>
				</table>
		</div>
        <br />
            <button type='submit' onClick={this.handleSubmit} className='btn btn-secondary'> Submit </button>
        
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
