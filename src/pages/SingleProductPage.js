import React from 'react'

import styled from 'styled-components'
import {
  Productnav,
  ScrollMenu,
  Reviews,
  NewsLetter,
  Footer,
  Productinfo,
  Productdetailinfo,
  Services,
  RecentlyViewedCarousal,
  SimilarProducts,
} from '../components'

const SingleProductPage = () => {
  return (
    <>
      <Productnav />
      <ScrollMenu />
      <Productdetailinfo></Productdetailinfo>
      <Productinfo />
      <SimilarProducts></SimilarProducts>
      <RecentlyViewedCarousal />
      <Services />
      <Reviews />
      <NewsLetter />
      <Footer />
    </>
  )
}

const Wrapper = styled.main``

export default SingleProductPage
