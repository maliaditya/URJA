import React from 'react'
import styled from 'styled-components'
import message1 from '../assets/message.svg'
import Rating from './Rating'

const Reviews = () => {
  return (
    <Reviewwrap>
      <div className='seller'>
        <p className='ttag'>Top reviews from India</p>
      </div>
      <div className='container'>
        <img
          className='container__image'
          src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
        />

        <div className='col-md-6 review '>
          <div className='card '>
            <div className='card-title'> Aditya Mali</div>
            <Rating />
            <div className='card-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur autem ullam odio. Laboriosam harum, neque sapiente
            </div>
          </div>
        </div>
      </div>
    </Reviewwrap>
  )
}

const Reviewwrap = styled.section`
  .container {
    height: 18rem;
    display: inline;
    &__image {
      margin-right: 2rem;
      margin-left: 3rem;
      width: 70px;
      height: 70px;
      background-size: cover;
      display: block;
      border-radius: 100px;
      -webkit-border-radius: 100px;
      -moz-border-radius: 100px;
    }
  }

  .card {
    width: 20rem;
    margin-left: 3rem;
    margin-top: 1rem;
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .ttag {
    margin-top: 5rem;
    font-size: 2rem;
    color: black;
    font-weight: 700;
  }

  @media (min-width: 900px) {
    .container {
      height: 18rem;
      display: flex;
      &__image {
        margin-top: 2rem;
        margin-bottom: 2rem;
        margin-left: 3rem;
        width: 140px;
        height: 140px;
        background-size: cover;
        display: block;
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
      }
    }

    .card {
      width: 30rem;
      margin-left: 2rem;
      margin-top: 2rem;
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }
    .ttag {
      margin-top: 5rem;
      font-size: 2rem;
      color: black;
      font-weight: 700;
    }

    .seller {
      padding-left: 5rem;
    }
  }

  @media (min-width: 1300px) {
    .container {
      height: 18rem;
      display: flex;
      &__image {
        margin-top: 2rem;
        margin-bottom: 2rem;
        margin-left: 3rem;
        width: 140px;
        height: 140px;
        background-size: cover;
        display: block;
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
      }
    }

    .card {
      width: 25rem;
      margin-left: 7rem;
      margin-top: 2rem;
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }
    .ttag {
      margin-top: 5rem;
      font-size: 2rem;
      color: black;
      font-weight: 700;
    }
    .review {
      background-image: url(${message1});
      background-repeat: no-repeat;
      background-size: 35rem;
    }
    .seller {
      padding-left: 5rem;
    }
  }
`

export default Reviews
