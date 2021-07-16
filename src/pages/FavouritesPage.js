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
    <div>
      <Productnav />
      <div className='content'>
        <ProductCard />
      </div>
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}


const mapStateToProps = state => {
  return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps, {})(FavouritesPage)
