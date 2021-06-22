import React from 'react'
import styled from 'styled-components'

const NewsLetter = () => {
  return (
    <Newscont>
      <hr />
      <center>
        <p className='ttag'>
          {' '}
          Suscribe to our news letter and never miss exciting offers!
        </p>
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
overflow:hidden;

  input {
    height: 2.7rem;
  }

  .ttag {
    margin-top: 5rem;
    font-size: 0.72rem;
    color: black;
    font-weight: 700;
  }

 
  @media (min-width:720px){

  .ttag {
    margin-top: 5rem;
    font-size: 1rem;
    color: black;
    font-weight: 700;
  }

  .input-group  {
    width: 29rem;;
  }

  }

  @media (min-width:1300px){

  .ttag {
    margin-top: 5rem;
    font-size: 1.54rem;
    color: black;
    font-weight: 700;
  }

  .input-group  {
    width: 45rem;;
  }
    .seller {
      padding-left: 5rem;
    }
  }

  } .container {
    padding-bottom: 3rem;
  }

  hr {
    border: 2px solid black;
  }


`

export default NewsLetter
