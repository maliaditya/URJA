import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'

const ScrollMenu = () => {
  const colorchange = () => {
    const linkColor = '#ffc232'
    return linkColor
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 9,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 7,
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
    <Wrapper>
      <div className='container'>
        <Carousel responsive={responsive}>
          <a onClick={colorchange} href='#'>
            Item Item
          </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
          <a href='#'> Item Item </a>
        </Carousel>
      </div>
      <hr />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid black;
    margin-top: 3rem;
    padding: 0;
  }
  a:hover {
    color: #ffc232;
  }
  padding: 3rem;
  a {
    font-size: 1rem;
    padding-left: 5rem;

    color: black;
  }
`

export default ScrollMenu
