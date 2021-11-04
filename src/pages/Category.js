import React from 'react'
import { connect } from 'react-redux'
import { Footer, NewsLetter } from '../components'
import ProductNavSearch from '../components/ProductNavSearch'
import CategoryCarousalSidebar from '../components/CategoryCarousalSidebar'
const Category = ({ itemSearchedCategoryWiseResult, searchKeyword }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
   React.useEffect(() => {
      let title = 'URJA | Category'
      document.title = title;
    });
  return (
    <React.Fragment>
      <ProductNavSearch></ProductNavSearch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className='text-center'>{searchKeyword} Products</h3>
      <hr />
      <br />
      <CategoryCarousalSidebar></CategoryCarousalSidebar>
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

export default connect(mapStateToProps, {})(Category)
