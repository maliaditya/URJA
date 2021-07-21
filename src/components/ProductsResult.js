import React from 'react'
import styled from 'styled-components'
import Rating from './Rating'
import { MdFavoriteBorder } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {current_item_added,itemSearchedClear} from '../actions/auth'
const ProductResult=({itemSearchedResult,current_item_added,itemSearchedClear}) => {
        console.log('itemSearchedResult',itemSearchedResult)

    if(itemSearchedResult.length===0){
      return <center><h1>No Results Found</h1></center>
    }
else{

  return (
    <Link to='/product' target='_blank'>
      <Wrapper className='content'>
      {itemSearchedResult.map((item)=>{
        return(

          <div className='containercard border'>
          <img
            alt='result'
            className='containercard__image'
            src={item.front_image}
            />
          <div className='header'>
            <p className='head-title'>
              <h5>{item.name}</h5>
              <MdFavoriteBorder className='fav' size={25} />
            </p>
            <div className='desc'>
              <p>{item.details.slice(0,100)}</p>
              <p className='rating'>
                <Rating />
                &nbsp; &nbsp; 2.0 &nbsp; | &nbsp; 48 ratings
              </p>
              <p> ₹ {item.price}</p>
            </div>
            {/* <button className='btn btn-warning'>Send enquiry </button>

<button className='btn btn-secondary'>View number</button> */}
          </div>
        </div>
          )})}
      </Wrapper>
    </Link>
  )
}

}
const Wrapper = styled.a`
  h5 {
    font-weight: 700;
  }
  left: 50%;
  .fav {
    margin-left: 10rem;
  }
  .head-title {
    display: flex;
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
    display: flex;
  }
  p {
    margin-bottom: 1px;
    color: var(--clr-grey-3);
  }
  .containercard {
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;
    margin-top: 1rem;
    margin-left: 3rem;

    width: 20rem;
    height: 30rem;
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
      margin-left: 10rem;

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


 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult:state.auth.itemSearchedResult
  }
}

  


export default connect(mapStateToProps, {current_item_added,itemSearchedClear})(ProductResult)


