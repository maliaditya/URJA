import React from 'react'
import styled from 'styled-components'
import Rating from './Rating'
import { MdFavoriteBorder } from 'react-icons/md'

const ProductCard = () => {
  return (
    <Wrapper className='content'>
      <div className='containercard'>
        <img
          className='containercard__image'
          src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
        />
        <div className='header'>
          <p className='head-title'>
            <h4>Agri Hub</h4>
            <MdFavoriteBorder className='fav' size={25} />
          </p>
          <div className='desc'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
              corrupti.
            </p>
            <p className='rating'>
              <Rating />
              &nbsp; &nbsp; 2.0 &nbsp; | &nbsp; 48 ratings
            </p>
            <p> ₹ 80/kg</p>
          </div>
          {/* <button className='btn btn-warning'>Send enquiry </button>

          <button className='btn btn-secondary'>View number</button> */}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
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
    margin-bottom: 0.5rem;
    color: var(--clr-grey-3);
  }
  .containercard {
    margin-top: 1rem;
    margin-left: 3rem;

    background-color: rgba(236, 236, 236, 1);
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

export default ProductCard
