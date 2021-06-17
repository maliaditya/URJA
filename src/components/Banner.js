import React from 'react'
import styled from 'styled-components'

const Banner = () => {
  return (
    <Wrapper>
      <div className='banner'>
        <p className='luntag'>Let us no what you need..</p>
        <p className='slang'>More than 10,000 companies trust our bussiness</p>
        <div className='input-group rounded'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <span classNameName='input-group-text border-0' id='search-addon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-search'
              viewBox='0 0 16 16'
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </span>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .luntag {
    font-family: sans-serif;
    font-size: 2.3rem;
    color: black;
    font-weight: 700;
    /* text-align: center; */
    margin-top: 2rem;
  }
  .slang {
    font-family: sans-serif;
    font-size: 1rem;
    /* text-align: center; */
    margin-right: 6rem;
  }
  .input-group {
    width: 50vh;
  }
  .banner {
    padding-bottom: 5rem;
    padding-top: 2rem;
    align-items: center;
    align-content: center;

    margin: 0 auto;
  }
  @media (min-width: 776px) {
    .input-group {
      width: 80vh;
    }
    .banner {
      padding-left: 30vh;

      padding-bottom: 5rem;
      padding-top: 2rem;
      align-items: center;
      align-content: center;

      margin: 0 auto;
    }
  }
`

export default Banner
