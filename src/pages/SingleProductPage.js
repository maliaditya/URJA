import React from 'react'

import {
  // Productnav,
  // ScrollMenu,
  // Reviews,
  NewsLetter,
  Footer,
  Productinfo,
  Productdetailinfo,
  Services,
  RecentlyViewedCarousal,
  // SimilarProducts,
  BestSellerCarousal,
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const SingleProductPage = () => {
  React.useEffect(() => {
      let title = 'URJA | Product '
      document.title = title;
    });
  return (
    <React.Fragment>
      <ProductNavSearch />
      {/* <ScrollMenu /> */}
      <br />
      <br />
      <br />
      <br />
      <Productdetailinfo></Productdetailinfo>
      <Productinfo />
      <BestSellerCarousal />
      {/* <SimilarProducts></SimilarProducts> */}
      <RecentlyViewedCarousal />
      <Services />
      {/* <Reviews /> */}
      <NewsLetter />
      <Footer />
    </React.Fragment>
  )
}

export default SingleProductPage
