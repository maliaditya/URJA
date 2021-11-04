import React from 'react'
import { connect } from 'react-redux'
import { Footer, NewsLetter } from '../components'
import ProductNavSearch from '../components/ProductNavSearch'
const TermsConditions = ({ itemSearchedCategoryWiseResult, searchKeyword }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <React.Fragment>
      <ProductNavSearch></ProductNavSearch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className='text-center'>Terms &amp; Conditions</h3>
      <hr />
      
      <br />

      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
  }
}

export default connect(mapStateToProps, {})(TermsConditions)
