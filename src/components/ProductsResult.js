import React from 'react'
import styled from 'styled-components'
import { MdFavoriteBorder,MdFavorite } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {current_item_added,
        itemSearchedClear, 
        addToFavourites, 
        removeFromFavourites,
        checkAuthenticated,
        load_user
      } from '../actions/auth'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'

const ProductResult=({itemSearchedResult,
                      current_item_added,
                      itemSearchedClear,
                      addToFavourites,
                      removeFromFavourites,
                      checkAuthenticated,
                      load_user,
                      user     }) => {



const userFavouriteProductsId = []
user.user_favourites.map((item)=>{
  userFavouriteProductsId.push(item.product.id)
  return userFavouriteProductsId
})
var userFavouriteProductsIdAndProductID = {}
 user.user_favourites.map((item)=>{
   userFavouriteProductsIdAndProductID[item.product.id] = item.id 
   return userFavouriteProductsIdAndProductID
})

// const setAddtoFavAction=(itemId, userId)=>{
//   if(render){
//     setRender(false)
//     addToFavourites(itemId,userId)
//   }else{
//     setRender(true)
//     addToFavourites(itemId,userId)
//   }
// }


// const setRemoveFromFavAction=(itemId)=>{
//   if(render){
//     setRender(false)
//     removeFromFavourites(userFavouriteProductsIdAndProductID[itemId])

//   }else{
//     setRender(true)
//     removeFromFavourites(userFavouriteProductsIdAndProductID[itemId])

//   }
  
// }

// React.useEffect(()=>{
//   checkAuthenticated()
//   load_user()
// },[])

if(itemSearchedResult.length===0){
      return (
        <h4 style={{ textAlign: 'center', color: 'black' }} className='title'>
        No results found.
      </h4>
      )
}else{
  return (
    <React.Fragment>
      <br />
      <h4 style={{ textAlign: 'left',marginLeft:'9rem', color: 'black' }} className='title'>
        About  {itemSearchedResult.length} results found.
      </h4>
      <br />
   {itemSearchedResult.map((item,index)=>{
     return(
      <Wrapper key={index}  className='content'>
        <div  className='containercard border'>
          <img
          alt='product_image'
            className='containercard__image'
            src={item.front_image}
            />
          <div className='header'>
            <div className='head-title'>
              <h5>{item.name}</h5>
              {userFavouriteProductsId.includes(item.id)?
            <MdFavorite onClick={()=>removeFromFavourites(userFavouriteProductsIdAndProductID[item.id])} className="fav"  size={25} />
            :<MdFavoriteBorder onClick={()=>addToFavourites(item.id,user.id)} className="fav"  size={25} />
            }
            </div>
            <div className='desc'>
              <p>{item.details.slice(0, 90)}...</p>
              <div className='rating'>
                <Box component='fieldset' mb={0.3}  borderColor='transparent'>
                      <Rating name='read-only' value={item.reviews.map((sub)=>sub.rating)[0]} readOnly />
              </Box>
                &nbsp; &nbsp; {item.reviews.map((sub)=>sub.rating)}.0 &nbsp; | &nbsp; {item.reviews.length} ratings
              </div>
              <div  className='price'>

              <p> ₹ {item.price}</p>    
               {item.in_stock?
                    <p  className='instock' style={{fontSize:'0.8rem', color:'green'}}> In stock</p>:
                    <p  className='instock' style={{fontSize:'0.8rem', color:'red'}}> Out of stock</p>
                 }
                 <h6 onClick={()=>current_item_added(item)}>
                   <Link to='/product'> View more </Link>
                   </h6>
          </div>
            </div>

          </div>
        </div>
        <br />
        <br />
        <br />
      </Wrapper>
        )})}
    </React.Fragment>
  )
}
}
const Wrapper = styled.div`

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

 const mapStateToProps = state => {
       return {
    
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult:state.auth.itemSearchedResult
  }
}

export default connect(mapStateToProps, {checkAuthenticated, load_user ,current_item_added,itemSearchedClear,addToFavourites,removeFromFavourites})(ProductResult)
  




