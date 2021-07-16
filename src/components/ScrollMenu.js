import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom' 

const ScrollMenu = () => {
 

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
      items: 5,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 2,
    },
  }
  return (
    <Wrapper>
      <div className='container content'>
        <Carousel responsive={responsive}>
          <Link to=''> Item Item </Link>
       
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
  padding-top: 3rem;
  a {
    font-size: 1rem;
    padding-left: 5rem;
    color: black;
  }
`

export default ScrollMenu
