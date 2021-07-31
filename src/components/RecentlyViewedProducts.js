import React from 'react'
import { connect } from 'react-redux'
import { current_item_added } from '../actions/auth'
import styled from 'styled-components'
import { HashLink } from 'react-router-hash-link'
const RecentlyViewedProducts = ({ recentlyViewed, current_item_added }) => {
  if (recentlyViewed.length !== 0) {
    return (
      <Wrapper className='rc-content'>
        <h4 className='rc-title mt-5'>Your recently viewed items</h4>
        <section className='recently-viewed-products'>
          {recentlyViewed.map((item, index) => {
            return (
              <article key={index} className='rc-product'>
                {console.log(item)}
                <HashLink to='/product#productpage'>
                  <img
                    onClick={() => current_item_added(item)}
                    src={item.front_image}
                    alt='Club Card'
                  />
                  <h5
                    onClick={() => current_item_added(item)}
                    style={{
                      color: 'black',
                      marginTop: '0.7rem',
                      fontWeight: '700',
                    }}
                    className='ptitle'
                  >
                    {item.name}
                  </h5>
                  <p style={{ fontSize: '1rem', marginTop: '-0.7rem' }}>
                    {item.category.category_name}
                  </p>
                </HashLink>{' '}
              </article>
            )
          })}
        </section>
      </Wrapper>
    )
  } else {
    return (
      <div className='rc-content'>
        <h4 className='rc-title'>Recently Viewed</h4>
        <section>
          <center>
            <h3>No Recently Viewed Products</h3>
          </center>
        </section>
      </div>
    )
  }
}

const Wrapper = styled.div`
  padding: 5rem;
  margin-top: 1rem;

  .rc-title {
    font-weight: 700;
    margin-top: 0.5rem;
  }

  article .rc-category {
    margin-top: -0.5rem;
    font-size: 0.7rem;
    width: 12rem;
  }

  .details {
    margin-top: 1rem;
    text-align: center;
  }

  .recently-viewed-products article .rc-title {
    font-size: 0.9rem;
    margin-top: 0.1rem;
    width: 12rem;
  }
  article .rc-company {
    font-weight: 700;
    margin-top: 0.8rem;
    width: 12rem;
  }
  img {
    border-radius: 1rem;
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;
    width: 193px;
    height: 221px;
    display: block;
    border-radius: 0.5rem;
  }
  article:hover img {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
  }
  .recently-viewed-products {
    display: grid;
    gap: 2rem;
    margin: 5rem auto;
  }

  @media screen and (min-width: 768px) {
    .recently-viewed-products {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    recentlyViewed: state.auth.recentlyViewed,
  }
}

export default connect(mapStateToProps, { current_item_added })(
  RecentlyViewedProducts
)
