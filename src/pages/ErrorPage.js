import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  React.useEffect(() => {
      let title = 'URJA | Error'
      document.title = title;
    });
  return(

    <Wrapper>

    <h4>Error Page</h4>
    <Link to='\'> Back. </Link>
    </Wrapper>
    )
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage
