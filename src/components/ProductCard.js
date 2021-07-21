import React from 'react'
import styled from 'styled-components'
import { MdFavoriteBorder } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import {current_item_added} from '../actions/auth'


const ProductCard = ({user,current_item_added}) => {
console.log('useruser',user)

  return (
    <Link to='/product'  >
      <br />
      <h4 style={{ textAlign: 'center', color: 'black' }} className='title'>
        My Favourites
      </h4>
      <br />
   {user.map((item)=>{
     return(
    
      <Wrapper   className='content'>
        <div onClick={()=>current_item_added(item.product)} className='containercard border'>
          <img
          alt='product_image'
            className='containercard__image'
            src={item.product.front_image}
            />
          <div className='header'>
            <p className='head-title'>
              <h5>{item.product.name}</h5>
              <MdFavoriteBorder className="fav"  size={25} />
            </p>
            <div className='desc'>
              <p>{item.product.details.slice(0, 90)}...</p>
              <p className='rating'>
                <Box component='fieldset' mb={0.3}  borderColor='transparent'>
                      <Rating name='read-only' value={item.product.reviews.map((sub)=>sub.rating)} readOnly />
              </Box>
                &nbsp; &nbsp; {item.product.reviews.map((sub)=>sub.rating)}.0 &nbsp; | &nbsp; {item.product.reviews.length} ratings
              </p >
              <div  className='price'>

              <p> ₹ {item.product.price}</p>    
               {item.product.in_stock?
                    <p  href="#!"  className='instock' style={{fontSize:'0.8rem', color:'green'}}> In stock</p>:
                    <p  href="#!" className='instock' style={{fontSize:'0.8rem', color:'red'}}> Out of stock</p>
                 }
          </div>
            </div>
            {/* <button className='btn btn-warning'>Send enquiry </button>

<button className='btn btn-secondary'>View number</button> */}
          </div>
        </div>
        <br />
        <br />
        <br />
      </Wrapper>
        )})}
    </Link>
  )
}

const Wrapper = styled.a`

.price{
  display:flex;
  justify-content:space-between;
}
  .fav {
    color: #ffc232;
  }
  h5 {
    font-weight: 700;
  }

  .fav {
    margin-left: 10rem;
  }
  .head-title {
    display: flex;
    justify-content:space-between
  }
  button {
    font-size: 10px;
    float: right;
    margin-right: 1rem;
  }
  .header {
    padding: 1rem;
  }
  .rating {
    margin-top:10px;
    display: flex;
  }
  p {
    margin-bottom: 1px;
    color: var(--clr-grey-3);
  }
  .containercard {
    margin: 0 auto;
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;

    width: 20rem;
    height: 33rem;
    border-radius: 1rem;

    &__image {
      border-radius: 1rem 1rem 0rem 0rem;
      width: 20rem;
      background-size: cover;
      display: block;
    }
  }
  @media (min-width: 720px) {
    .fav {
      margin-left: 12rem;
    }
    .containercard {
      width: 35rem;
      height: 12rem;
      border-radius: 1rem;

      display: flex;
      &__image {
        border-radius: 1rem 0rem 0rem 1rem;
        width: 10rem;
        background-size: cover;
        display: block;
      }
    }
  }
  @media (min-width: 1300px) {
    .fav {
      margin-left: 15rem;
    }
    .containercard {
      width: 40rem;
      height: 12rem;
      border-radius: 1rem;
      display: flex;
      &__image {
        border-radius: 1rem 0rem 0rem 1rem;
        width: 13rem;
        background-size: cover;
        display: block;
      }
    }
  }
`
const mapStateToProps=(state)=>{
 
 const  user = JSON.parse(localStorage.getItem("user") || "[]")

  return{
    access:state.auth.access,

    user:user.user_favourites
  }
}


export default connect(mapStateToProps,{current_item_added})(ProductCard)
