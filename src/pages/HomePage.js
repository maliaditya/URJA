import React from 'react'
import {
  Navbar,
  Footer,
  TrendingCarousal,
  Banner,
  BestSellerCarousal,
  RecentlyViewedCarousal,
} from '../components'

const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Banner />

      <TrendingCarousal />
      <BestSellerCarousal />
      <RecentlyViewedCarousal />
      <Footer></Footer>
    </>
  )
}

export default HomePage
