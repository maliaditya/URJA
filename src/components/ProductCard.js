import React from 'react'
import styled from 'styled-components'
import Rating from './Rating'
const ProductCard = () => {
  return (
    <Wrapper>
      <div className='containercard'>
        <img
          className='containercard__image'
          src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
        />

        <div className='review '>
          <div className='card '>
            <div className='card-title'> Agriclubs</div>
            <div className='card-text'>Mexican Seasoning Masala 10gm</div>
            <p className='rating'>
              <Rating />
              <p className='num'>&nbsp; &nbsp; 2.0 &nbsp; | &nbsp; 48 </p>
            </p>
            ₹ 80/kg
            <a href=''>View more</a>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  svg {
    display: inline;
  }

  .num {
    margin-top: 2.5rem;
  }
  .price {
    font-size: 1.5rem;
  }
  .rating {
    display: flex;
    margin-top: -33px;
    margin-bottom: 0px;
  }
  .review .card {
    width: 15rem;
    margin-top: 2 rem;
  }
  .containercard {
    margin-top: 1rem;
    width: 20rem;
    height: 30rem;
    border-radius: 1rem;
    border: 1px solid #c4c4c480;
    -webkit-box-shadow: 0 8px 6px 0px #c4c4c480;
    -moz-box-shadow: 0 8px 6px 0px #c4c4c480;
    box-shadow: 0 8px 6px 0px #c4c4c480;
    &__image {
      border-radius: 1rem 1rem 0rem 0rem;
      width: 20rem;
      background-size: cover;
      display: block;
    }
  }
  @media (min-width: 720px) {
    padding: 1rem;

    .num {
      margin-top: 2.5rem;
    }
    .price {
      font-size: 1.5rem;
    }
    .rating {
      display: flex;
      margin-top: -33px;
      margin-bottom: 0px;
    }
    .review .card {
      width: 15rem;
      margin-left: 2rem;
      margin-top: 0rem;
    }
    .containercard {
      width: 28rem;
      height: 12rem;
      border-radius: 1rem;
      border: 1px solid #c4c4c480;
      -webkit-box-shadow: 0 8px 6px 0px #c4c4c480;
      -moz-box-shadow: 0 8px 6px 0px #c4c4c480;
      box-shadow: 0 8px 6px 0px #c4c4c480;
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
    padding: 1rem;
    a {
      float: right;
      margin-left: 26rem;
    }

    .num {
      margin-top: 2.5rem;
    }
    .price {
      font-size: 1.5rem;
    }
    .rating {
      display: flex;
      margin-top: -33px;
      margin-bottom: 0px;
    }
    .review .card {
      width: 32rem;
      margin-left: 2rem;
      margin-top: 2rem;
    }
    .containercard {
      width: 50rem;
      height: 15rem;
      border-radius: 1rem;
      border: 1px solid #c4c4c480;
      -webkit-box-shadow: 0 8px 6px 0px #c4c4c480;
      -moz-box-shadow: 0 8px 6px 0px #c4c4c480;
      box-shadow: 0 8px 6px 0px #c4c4c480;
      display: flex;
      &__image {
        border-radius: 1rem 0rem 0rem 1rem;
        width: 15rem;
        background-size: cover;
        display: block;
      }
    }
  }
`

export default ProductCard
