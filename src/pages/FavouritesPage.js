import React from 'react'
import { connect } from 'react-redux'
import {checkAuthenticated, load_user} from '../actions/auth'

import {
  Productnav,
  Footer,
  NewsLetter,
  Services,
  ProductCard,
} from '../components'
const FavouritesPage = () => {


React.useEffect(()=>{
    checkAuthenticated()
    load_user()
})


  return (
    <div>
      <Productnav style={{zIndex: 1000}} />
      <div className='content'>
        <ProductCard  style={{zIndex: 900}} />
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

export default connect(mapStateToProps, {checkAuthenticated,load_user})(FavouritesPage)
