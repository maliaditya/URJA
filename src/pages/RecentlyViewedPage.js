import React from 'react'
import { connect } from 'react-redux'
import {
  Productnav,
  Services,
  Footer,
  NewsLetter,
  RecentlyViewedProducts,
} from '../components'

const RecentlyViewedPage = () => {
  return (
    <div className='recently-viewed'>
      <Productnav />
      <RecentlyViewedProducts />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, {})(RecentlyViewedPage)
