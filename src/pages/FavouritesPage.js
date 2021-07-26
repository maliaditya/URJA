import React from 'react'
import { connect } from 'react-redux'

import {
  Productnav,
  Footer,
  NewsLetter,
  Services,
  ProductCard,
} from '../components'
const FavouritesPage = () => {
  return (
    <div style={{ marginTop: '5rem' }}>
      <Productnav style={{ zIndex: 1000 }} />
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
  return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps, {})(FavouritesPage)
