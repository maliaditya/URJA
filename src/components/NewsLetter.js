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
overflow:hidden;

      .input-group {
    width: 40vh;
  }

  } .container {
    padding-bottom: 3rem;
  }
  p {
    font-size: 1.5vh;
    color:black;
    font-weight:700;
  }
  hr {
    border: 2px solid black;
  }

   @media (min-width: 1000px) {
      p {
    font-size: 3vh;
    color:black;
    font-weight:700;
  }
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
    width: 110vh;
  }
  }
`

export default NewsLetter
