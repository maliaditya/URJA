import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Wrapper>
      <div id='wrapper'>
        <div id='footer'>
          <div class='footerFloat'>
            <h4>Header 1</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div class='footerFloat'>
            <h4>Header 2</h4>
            <ul>
              <li>Line 1</li>
              <li>Line 2</li>
              <li>Line 3</li>
              <li>Line 4</li>
            </ul>
          </div>
          <div class='footerFloat'>
            <h4>Header 3</h4>
            <ul>
              <li>Line 1</li>
              <li>Line 2</li>
              <li>Line 3</li>
              <li>Line 4</li>
            </ul>
          </div>
          <div class='footerFloat'>
            <h4>Header 4</h4>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  #footer {
    width: 100%;
    margin: auto;
  }
  .footerFloat {
    width: 100%;
  }
  @media all and (min-width: 950px) {
    #footer {
      width: 980px;
      margin: auto;
    }
    .footerFloat {
      width: 25%;
      float: left;
    }
  }

  a {
    color: white;
  }
  a:hover {
    color: #ffc232;
  }
  .card {
    border: none;
    background-color: #25211c;
  }
  .card-text {
    text-align: left;
    color: white;
  }

  .row {
    color: white;
  }
  background: #25211c;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
  }
`

export default Footer
