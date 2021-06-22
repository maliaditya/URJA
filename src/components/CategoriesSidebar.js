import React from 'react'
import styled from 'styled-components'

const CategoriesSidebar = () => {
  return (
    <div class='sidenav'>
      <a href='#about'>About</a>
      <a href='#services'>Services</a>
      <a href='#clients'>Clients</a>
      <a href='#contact'>Contact</a>
    </div>
  )
}
const Wrapper = styled.div`
  .sidenav {
    width: 130px;
    position: fixed;
    z-index: 1;
    top: 20px;
    left: 10px;
    background: #eee;
    overflow-x: hidden;
    padding: 8px 0;
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
    margin-left: 140px; /* Same width as the sidebar + left position in px */
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
export default CategoriesSidebar
