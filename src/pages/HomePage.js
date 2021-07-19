import React  from 'react'
import {
  Services,
  Navbar,
  // Productnav,
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
    <React.Fragment>
      <Navbar></Navbar>
      <Banner />

      <TrendingCarousal />
      <BestSellerCarousal />
      <RecentlyViewedCarousal />
      <Services></Services>
      <Reviews />
      <NewsLetter />
      <Footer></Footer>
    </React.Fragment>
  )
}

export default (HomePage)
