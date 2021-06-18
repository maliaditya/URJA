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
      <div className='col-md-10  '>
        <div className='row'>
          <div className='col-md-1  '></div>
          <div className='col-md-2  '>
            <img
              alt=''
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
            />
          </div>

          <div className='col-md-6 review '>
            <div className='card'>
              <div className='card-title'> Aditya Mali</div>
              <Rating />
              <div className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur autem ullam odio. Laboriosam harum, neque sapiente
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-12  '>
        <div className='row'>
          <div className='col-md-4  '></div>
          <div className='col-md-2  '>
            <img
              alt=''
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
            />
          </div>

          <div className='col-md-6 review '>
            <div className='card'>
              <div className='card-title'> Aditya Mali</div>
              <Rating />

              <div className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur autem ullam odio. Laboriosam harum, neque sapiente
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reviewwrap>
  )
}

const Reviewwrap = styled.section`
  overflow: hidden;
  .card {
    width: 30rem;
    margin-left: 5rem;
    margin-top: 2rem;
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .ttag {
    margin-top: 5rem;
    font-family: sans-serif;
    font-size: 1.5rem;
    color: black;
    font-weight: 700;
  }
  .col-md-8 {
    padding: 3rem;
  }
  img {
    margin-top: 2rem;
    margin-left: 3rem;
    width: 140px;
    height: 140px;
    background-size: cover;
    display: block;
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
  }

  h4 {
    padding-left: 8rem;
    padding-top: 2rem;
  }
  @media (min-width: 1300px) {
    img {
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
    .review {
      background-image: url(${message1});
      background-repeat: no-repeat;
    }
    h4 {
      padding-left: 8rem;
      padding-top: 2rem;
    }
  }
  @media (min-width: 776px) {
    .seller {
      padding-left: 5rem;
    }
  }
`

export default Reviews
