import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import axios from 'axios'
import { connect } from 'react-redux'
import { current_item_added } from '../actions/auth'
const api = process.env.REACT_APP_API_URL
const BestSellerCarousal = ({ access, current_item_added }) => {
  const [bestSellerItems, setBestSellerItems] = React.useState([])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1300, min: 720 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    },
  }

  React.useEffect(() => {
    let isMounted = true
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // ''Authorization'': `Bearer ${access}`
      },
    }
    axios
      .get(`${api}/api/product_enquires/`, config)
      .then((res) => {
        console.log(res)
        if (isMounted) setBestSellerItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const uniqueObjects = []

  const uniqueItems = []

  bestSellerItems.map((item) => {
    if (!uniqueItems.includes(item.product.id)) {
      uniqueItems.push(item.product.id)
      uniqueObjects.push(item)
    }
    return 0
  })

  return (
    <Wrapper className='content'>
      <div className='trending'>
        <span className=' underline-right'>
          <h4 style={{ fontWeight: '700' }}> Best Seller</h4>
        </span>
      </div>

      <div className='trending'>
        <Carousel responsive={responsive}>
          {uniqueObjects
            .filter((item) => item.product.approved === 'Approved ')
            .map((item, index) => {
              return (
                <article key={index}>
                  <HashLink to='/product#productpage'>
                    <img
                      alt='best seller'
                      src={item.product.front_image}
                      onClick={() => current_item_added(item.product)}
                    />
                    <h5
                      onClick={() => current_item_added(item.product)}
                      style={{
                        color: 'black',
                        marginTop: '0.7rem',
                      }}
                    >
                      {item.product.name}
                    </h5>
                    <p style={{ fontSize: '1rem', marginTop: '-0.7rem' }}>
                      {item.product.category.category_name}
                    </p>
                  </HashLink>
                </article>
              )
            })}
        </Carousel>
        <hr />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ptitle {
    font-weight: 700;
    font-size: 1.1rem;
  }
  p {
    margin: 0px;
  }
  a {
    padding: 0px;
  }
  padding-top: 1rem;
  h5 {
    font-size: 1.1rem;
    font-weight: 700;
  }
  article {
    background-color: white;
    border-radius: 0.5rem;

    margin: 5px;
    display: inline-block;
  }
  article a {
    padding: 5px;
    display: inline-block;
  }
  article a img {
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;
    width: 180px;
    height: 198px;
    display: block;
    border-radius: 0.5rem;
  }
  article a:hover img {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
  }
  .ttag {
    font-size: 1.54rem;
    color: black;
    font-weight: 700;
    padding-bottom: 2rem;
  }
  .ttag:hover {
    text-transform: capitalize;
  }

  @media (min-width: 776px) {
    .trending {
      padding-left: 5rem;
    }
  }

  span {
    margin-bottom: 15px !important;
    font-size: 16px !important;
    display: inline-block !important;
  }

  .columns {
    width: 33%;
    float: left;
  }

  .underline-right:after {
    position: absolute;
    z-index: -1;
  }

  .underline-right:after {
    content: '';
    width: 5px;
    height: 5px;
    left: 0;
    bottom: 0;
  }

  .underline-right:focus:after,
  .underline-right:hover:after {
    width: 100%;
    height: 3px;
  }

  .animated,
  .btn-nav {
    z-index: 9999;
  }

  .effect-demo,
  span {
    font-size: 1.54rem;
    font-weight: 700;
    position: relative;
    z-index: 2;
    text-decoration: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    padding: 10px;
    white-space: nowrap;
    overflow: hidden;
  }

  span {
    text-transform: uppercase;
    display: inline;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: color 1s ease;
  }

  span:focus,
  span:hover {
    outline: 0;
    color: #1b98e0;
    -webkit-transition: color 1s ease;
    -moz-transition: color 1s ease;
    -ms-transition: color 1s ease;
    -o-transition: color 1s ease;
    transition: color 1s ease;
    cursor: pointer;
  }

  span:after,
  span:before {
    -webkit-transition: all 1s ease 0s;
    -moz-transition: all 1s ease 0s;
    -ms-transition: all 1s ease 0s;
    -o-transition: all 1s ease 0s;
    transition: all 1s ease 0s;
  }

  span:focus:after,
  span:focus:before,
  span:hover:after,
  span:hover:before {
    outline: 0;
    background-color: #1b98e0;
    -webkit-transition: all 1s ease 0s;
    -moz-transition: all 1s ease 0s;
    -ms-transition: all 1s ease 0s;
    -o-transition: all 1s ease 0s;
    transition: all 1s ease 0s;
  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
  }
}

export default connect(mapStateToProps, { current_item_added })(
  BestSellerCarousal
)
