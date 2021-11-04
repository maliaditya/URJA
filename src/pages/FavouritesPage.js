import React from 'react'
import { connect } from 'react-redux'

import {
  // Productnav,
  Footer,
  NewsLetter,
  Services,
  ProductCard,
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const FavouritesPage = () => {
    React.useEffect(() => {
      let title = 'URJA | Favourites'
      document.title = title;
    });
  return (
    <div style={{ marginTop: '5rem' }}>
      <ProductNavSearch style={{ zIndex: 1000 }} />
      <div className='content'>
        <ProductCard style={{ zIndex: 900 }} />
      </div>
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    itemSearchedResult: state.auth.itemSearchedResult,
  }
}

export default connect(mapStateToProps, {})(FavouritesPage)
