import React from 'react'
import styled from 'styled-components'
import { AiOutlineHome, AiOutlineHistory } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
const Productnav = () => {
  return (
    <NavContainer>
      <div className='topnav content'>
        <ul>
          <li className='home'>
            <Link to='/'>
              <AiOutlineHome className='icon' size={30} />
            </Link>
          </li>
          <li className='imlocation'>
            <Link to='/'>
              <AiOutlineHistory className='icon' size={30} />
            </Link>
          </li>
          <li className='location'>
            <Link to='/favourites'>
              <MdFavoriteBorder className='icon' size={30} />
            </Link>
          </li>
          <li>
            <Link to='/account'>
              <RiAccountCircleLine className='icon' size={30} />
            </Link>
          </li>

          <li className='drop'>
            <svg
              className='icon'
              width='20'
              height='12'
              viewBox='0 0 20 12'
              fill='green'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M19.5928 2.46286L10.6788 11.7078C10.3036 12.0974 9.69738 12.0974 9.32117 11.7078L0.407154 2.46286C-0.135718 1.90053 -0.135718 0.985625 0.407154 0.422297C0.950026 -0.140034 1.8311 -0.140034 2.37397 0.422297L10.0005 8.33087L17.6251 0.422297C18.1689 -0.140034 19.05 -0.140034 19.5928 0.422297C20.1357 0.985625 20.1357 1.90053 19.5928 2.46286Z'
                fill='#2D2C2C'
              />
            </svg>
          </li>

          <li>
            <div className='search-container sb-example-3'>
              <div className='search__container '>
                <button className='btn btn-warning'>
                  {' '}
                  All{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='black'
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
                  className='search__input'
                  type='text'
                  placeholder='Search'
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  .icon {
    fill: black;
  }
  svg {
    color: black;
  }
  .icon:hover {
    fill: #ffc232;
    background-color: white;
  }

  ul {
    margin-right: auto;
    list-style-type: none;
    margin: 0;
    padding: 18px;
    text-align: right;
    padding-top: 0px;
  }

  li {
    display: inline;
    padding-right: 2rem;
  }

  .topnav {
    overflow: hidden;
  }

  .topnav ul {
    float: right;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }

  .topnav a.active {
    background-color: #2196f3;
    color: white;
  }

  .sb-example-3 .search__title {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    color: #ff8b88;
  }

  .sb-example-3 .search__input {
    padding: 10px 24px;
    width: 207px;
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
    background-color: rgba(196, 196, 196, 0.5);
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 5px;
    border: none;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .sb-example-3 .search__input::placeholder {
    color: rgba(87, 87, 86, 0.8);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .sb-example-3 .search__input:hover,
  .search__input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }

  .topnav .search-container {
    float: left;
  }
  .search-container {
    padding-top: 2rem;
    padding-right: 2rem;
  }
  .btn {
    margin-left: 0px;
  }
  @media (min-width: 720px) {
    .search-container {
      padding-top: 0rem;
      padding-right: 2rem;
    }
    .btn {
      margin-left: 0px;
    }
    ul {
      margin-right: auto;
      list-style-type: none;
      margin: 0;
      padding: 18px;
      text-align: right;
      padding-top: 0px;
    }

    li {
      display: inline;
      padding-right: 2rem;
    }

    .sb-example-3 .search__input {
      width: 20rem;
    }
  }
  @media (min-width: 1300px) {
    .search-container {
      padding-top: 0rem;
      padding-right: 2rem;
    }
    .btn {
      margin-left: 0px;
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
      padding-right: 2rem;
    }

    .sb-example-3 .search__input {
      width: 40rem;
    }
    .search-container {
      padding-right: 5rem;
    }
  }
`

export default Productnav
