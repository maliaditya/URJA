import React from 'react'
import styled from 'styled-components'
import ProductResult from './ProductsResult'
const Categorywise = () => {
  return (
    <Wrapper>
      <div className='col-md-12 row'>
        <div class='sidenav col-md-4'>
          <p>sidebar</p>
        </div>
        <div class=' col-md-8'>
          <ProductResult />
          <ProductResult />
          <ProductResult />
          <ProductResult />
          <ProductResult />
          <ProductResult />
          <ProductResult />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  overflow: hidden;
  .sidenav {
    width: 200px;
    position: sticky;
    z-index: 1;
    top: 20px;
    left: 10px;
    background: #eee;
    overflow-x: hidden;
    padding: 8px 0;
    margin-top: 2rem;
    margin-bottom: 10rem;
    margin-left: 2rem;
  }

  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #2196f3;
    display: block;
  }

  .sidenav a:hover {
    color: #064579;
  }

  .main {
    margin-top: 2rem;
    margin-left: 100px; /* Same width as the sidebar + left position in px */
    font-size: 28px; /* Increased text to enable scrolling */
    padding: 0px 10px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`
export default Categorywise
