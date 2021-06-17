import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'

const RecentlyViewedCarousal = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 2,
    },
  }
  return (
    <Wrapper>
      <div className='seller'>
        <p className='ttag'>Recently Viewed </p>
      </div>
      <div className='seller'>
        <Carousel responsive={responsive}>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>

          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '11rem' }}>
            <img
              style={{ borderRadius: '0.5rem' }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
        </Carousel>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .ttag {
    margin-top: 5rem;
    font-family: sans-serif;
    font-size: 1.5rem;
    color: black;
    font-weight: 700;
  }
  .card {
    border: none;
  }
  .card-title {
    color: black;
    font-size: 1.1rem;
    font-weight: 700;
  }
  @media (min-width: 776px) {
    .seller {
      padding-left: 5rem;
    }
  }
`

export default RecentlyViewedCarousal
