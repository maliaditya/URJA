import React from 'react'
import { connect } from 'react-redux'
import {
  // Productnav,
  Services,
  Footer,
  NewsLetter,
  RecentlyViewedProducts,
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const RecentlyViewedPage = () => {
   React.useEffect(() => {
      let title = 'URJA | Recently Viewed'
      document.title = title;
    });
  return (
    <div className='recently-viewed'>
      <ProductNavSearch />
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
