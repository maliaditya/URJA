import React from 'react'
import styled from 'styled-components'
import ModalLogin from './Modal'
import ModalSignup from './ModalSignup'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { Link } from 'react-router-dom'
const Nav = ({ logout, isAuthenticated }) => {
  const [modalLoginShow, setModalLoginShow] = React.useState(false)
  const [modalSignupShow, setModalSignupShow] = React.useState(false)
  if(isAuthenticated){
     return (
    <NavContainer>
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />      
      <ModalSignup
        show={modalSignupShow}
        onHide={() => setModalSignupShow(false)}
      />
      <div className='content'>
        <ul>
          <li className='imlocation container'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='currentColor'
              className='bi bi-geo-alt-fill'
              viewBox='0 0 20 20'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
            </svg>
            <a className='location' href='#news' style={{ color: 'black' }}>
              Pune, India
            </a>
          </li>

          <li>
   
            <button
            className='buttonlogin'
            onClick={logout}
            >

               Log out
            </button>
           
          </li>
       
        </ul>
      </div>
    </NavContainer>
  )
  }
  return (
    <NavContainer>
      
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />
      <ModalSignup
        show={modalSignupShow}
        onHide={() => setModalSignupShow(false)}
      />
      <div className='content'>
        <ul>
          <li className='imlocation container'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='currentColor'
              className='bi bi-geo-alt-fill'
              viewBox='0 0 20 20'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
            </svg>
            <a className='location' href='#news' style={{ color: 'black' }}>
              Pune, India
            </a>
          </li>

          <li>
            <Link to='/login'>
         <button
            className='buttonlogin'

            >
                 Log in
            </button>
                </Link>
          </li>
          <li className='orbar'>
            <a href='#news' style={{ color: 'black' }}>
              {' '}
              |{' '}
            </a>
          </li>
          <li></li>
          <li>
            <button
              className='buttonsignup'
              onClick={() => setModalSignupShow(true)}
            >
              Sign up
            </button>
          </li>
        </ul>
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
    
  nav {
    background: #f8f8f8;
    box-shadow: var(--light-shadow);
  }

  ul {
    list-style-type: none;
      margin: 0;
 
    text-align: left;
  }

  li {
    display: inline;
    padding: 5px;
  }

  .imlocation {
    color: #ffc232;
    font-size: 1.5rem;
    margin-right:-8px;
    margin-bottom:-10px;
  }
  .location {
    font-size: 1.1rem;
    color: black;
  }
  .orbar {
    display:none;
    font-size: 30px;
    margin-right: -10px;
  }
  .drop {
    font-size: 35px;
  }
}

.buttonlogin {
  background-color: #ffc232; /* Green */
  border: none;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 8px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  width: 69px;
  height: 36px;
}
.buttonsignup {
  background-color: #2d2c2c; /* Green */
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  width: 69px;
  height: 36px;
  font-weight: 700;

  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
}


  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 722px) {

.buttonlogin {
  background-color: #ffc232; /* Green */
  border: none;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 8px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  width: 89px;
  height: 36px;
}
.buttonsignup {
  background-color: #2d2c2c; /* Green */
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  width: 89px;
  height: 36px;
  font-weight: 700;

  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}


  ul {
    margin-right: auto;
    list-style-type: none;
    margin: 0;
    padding: 18px;
    margin-left: 5rem;
    text-align: right;
    padding-top: 0px;
  }

  li {
    display: inline;
    padding: 5px;
  }

     .imlocation {
    color: #ffc232;
    font-size: 1.5rem;
    margin-right:-8px;
    margin-bottom:-10px;
  }
  .location {
    font-size: 1.1rem;
    color: black;
  }
  .orbar {
    display:inline;
    font-size: 30px;
    margin-right: -10px;
  }
  .drop {
    font-size: 35px;
  }
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

const mapStateToProps = state => {
  return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps, { logout })(Nav)
