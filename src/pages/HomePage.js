import React  from 'react'
import {
  Services,
  Navbar,
  Footer,
  TrendingCarousal,
  Banner,
  BestSellerCarousal,
  RecentlyViewedCarousal,
  NewsLetter,
  Reviews,
} from '../components'


const HomePage = () => {
 
  return (
    <>
      <Navbar></Navbar>
      <Banner />

      <TrendingCarousal />
      <BestSellerCarousal />
      <RecentlyViewedCarousal />
      <Services></Services>
      <Reviews />
      <NewsLetter />
      <Footer></Footer>
    </>
  )
}

export default (HomePage)
