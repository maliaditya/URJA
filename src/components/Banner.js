import React from 'react'
import styled from 'styled-components'

const Banner = () => {
  return (
    <Wrapper>
      <center>
        <div className='banner'>
          <p className='luntag'>Let us Know what you need..</p>
          <p className='slang'>
            More than 10,000 companies trust our bussiness
          </p>
        </div>
        <div className='input-group rounded'>
          <button className='btn btn-warning'>
            All
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-chevron-down'
              viewBox='0 0 16 16'
            >
              <path
                fill-rule='evenodd'
                d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
              />
            </svg>
          </button>
          <span> &nbsp; &nbsp; </span>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <span classNameName='input-group-text border-0' id='search-addon'>
            <tab3 />
            <button className='btn btn-secondary  '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='16'
                fill='currentColor'
                className='bi bi-search'
                viewBox='0 0 20 16'
              >
                <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
              </svg>
            </button>
          </span>
        </div>
      </center>
    </Wrapper>
  )
}

const Wrapper = styled.article`


    padding-bottom:8rem;
input{
  height: 3rem;
}

 .luntag {
        font-size: 3vh;
        color: black;
        font-weight: 700;
        /* text-align: center; */
        margin-top: 2rem;
      }
      .slang {
        font-size: 1vh;
        /* text-align: center; */
        margin-right: 6rem;
      }
      .input-group {
        width: 40vh;
        height:2rem;
        padding-bottom: 3rem;
      }
 
  .banner {
    padding-top: 2rem;
    align-items: center;
    align-content: center;
    margin: 0 auto;
  }
  
    @media (min-width: 1200px) {
       .luntag {
    font-size: 6vh;
    color: black;
    font-weight: 700;
    /* text-align: center; */
    margin-top: 2rem;
  }
  .slang {
    font-size: 3vh;
    /* text-align: center; */
    margin-right: 6rem;
  }

  .input-group {
    width: 80vh;

    
  }
     
      .banner {
        padding-top: 2rem;
        align-items: center;
        align-content: center;

        margin: 0 auto;
      }
    }
  }
    @media (min-width: 1200px) {
      
      .input-group {
    width: 100vh;
  }
    }
`

export default Banner
