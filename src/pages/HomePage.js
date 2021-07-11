import React, { useEffect }  from 'react'
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
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from '../actions/auth'


const HomePage = (props) => {
  useEffect(()=>{
    props.checkAuthenticated()
    props.load_user()
  },[])
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

export default connect(null,{checkAuthenticated, load_user})(HomePage)
