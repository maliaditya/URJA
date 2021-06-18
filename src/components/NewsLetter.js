import React from 'react'
import styled from 'styled-components'

const NewsLetter = () => {
  return (
    <Newscont>
      <hr />
      <center>
        <p>Suscribe to our news letter and never miss exciting offers!</p>
      </center>
      <center>
        <div className='input-group rounded container'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Enter your email address'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <span> &nbsp; &nbsp; </span>
          <button className='btn btn-warning'>Suscribe</button>
        </div>
      </center>
    </Newscont>
  )
}

const Newscont = styled.section`

      .input-group {
    width: 50vh;
  }

  } .container {
    padding-bottom: 3rem;
  }
  p {
    font-size: 3vh;
    color:black;
    font-weight:700;
  }
  hr {
    border: 2px solid black;
  }
   @media (min-width: 776px) {
       .container{
    padding-left: 5rem;

       }
    .seller {
      padding-left: 5rem;
    }
    .card {
      border: none;
      padding-top: 5rem;
      padding-bottom: 5rem;
      padding-left: 1rem;
    }
    .input-group {
    width: 100vh;
  }
  }
`

export default NewsLetter
