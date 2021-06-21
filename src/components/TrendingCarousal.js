import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'

const TrendingCarousal = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1300, min: 720 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 2,
    },
  }
  return (
    <Wrapper className='content'>
      <div className='trending'>
        <p className='ttag'>Trending Now</p>
      </div>
      <div className='trending'>
        <Carousel responsive={responsive}>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>

          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
          <div className='card' style={{ width: '163px' }}>
            <img
              style={{
                width: '163px',
                height: '163px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
          </div>
        </Carousel>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    -webkit-box-shadow: 0 8px 6px -6px black;
    -moz-box-shadow: 0 8px 6px -6px black;
    box-shadow: 0 8px 6px -6px black;
  }
  .ttag {
    font-size: 2rem;
    color: black;
    font-weight: 700;
    padding-bottom: 2rem;
  }
  .card {
    border: none;
    width: '11rem';
    height: '163px';
  }
  .card-title {
    color: black;
    font-size: 1.5rem;

    font-weight: 700;
  }
  @media (min-width: 776px) {
    .trending {
      padding-left: 5rem;
    }
  }
`

export default TrendingCarousal
