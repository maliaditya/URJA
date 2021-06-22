import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'

const SimilarProducts = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1300, min: 720 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    },
  }
  return (
    <Wrapper className='content'>
      <div className='seller'>
        <p className='ttag'>Explore Similar Products</p>
      </div>
      <div className='seller'>
        <Carousel responsive={responsive}>
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1547822686-8ba163e1122a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href='#'> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
              src='https://images.unsplash.com/photo-1623854968962-92f46521a280?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
              className='card-img-top'
              alt='...'
            />{' '}
            <div className='card-title'> Some Text </div>
            <div className='card-text'>
              Category Name <br />
              <a href=''> View more</a>
            </div>
          </div>
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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

          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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
          <div className='card' style={{ width: '240px' }}>
            <img
              style={{
                width: '200px',
                height: '218px',
                borderRadius: '0.9rem',
                marginBottom: '10px',
              }}
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
  img {
    -webkit-box-shadow: 0 8px 6px -6px black;
    -moz-box-shadow: 0 8px 6px -6px black;
    box-shadow: 0 8px 6px -6px black;
  }
  .ttag {
    margin-top: 5rem;
    font-size: 1.7rem;
    color: black;
    font-weight: 700;
  }
  .card {
    border: none;
  }
  .card-title {
    color: black;
    font-size: 1.2rem;
    font-weight: 700;
  }
  @media (min-width: 776px) {
    .seller {
      padding-left: 5rem;
    }
  }
`

export default SimilarProducts
