import React from 'react'

import {
  Productnav,
  // ScrollMenu,
  Reviews,
  NewsLetter,
  Footer,
  Productinfo,
  Productdetailinfo,
  Services,
  RecentlyViewedCarousal,
  // SimilarProducts,
  BestSellerCarousal
} from '../components'

const SingleProductPage = () => {
  return (
    <React.Fragment>
      <Productnav />
      {/* <ScrollMenu /> */}
      <br /><br /><br />
      <Productdetailinfo></Productdetailinfo>
      <Productinfo />
      <BestSellerCarousal />
      {/* <SimilarProducts></SimilarProducts> */}
      <RecentlyViewedCarousal />
      <Services />
      <Reviews />
      <NewsLetter />
      <Footer />
    </React.Fragment>
  )
}



export default SingleProductPage
