import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import { MdFavoriteBorder } from 'react-icons/md'
const UsersInfo = () => {
  return (
    <Wrapper className='content'>
      <div className='col-md-12 center  '>
        <ProductCard />
        <ProductCard />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  overflow: hidden;

  hr {
    border: 0.1rem solid black;
}
  svg {
    margin-top: 2.5rem;
  }
  .col-md-8{
     float:left;
  }
   .contain {
          &__image {
              margin-top: 2rem;
              margin-bottom: 2rem;
              width: 100px;
              height: 100px;
              background-size: cover;
              display: block;
              border-radius: 1rem;
              margin-left:2rem;
              border: 2px solid grey;
          
            }
        }


  .col-md-12 {
    margin: 1rem;
    border-right: 1px solid grey:
  }
 

  .card {
    width: 15rem;
    margin-left: 2rem;
    margin-top: 2rem;
    border: none;
  }
  .card-title {
    font-size: 1.3rem;
    font-weight: 700;
  }

  hr {
    border: 2px solid black;
  }
`
export default UsersInfo
