import React from 'react'
import { connect } from 'react-redux'
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
  CategoriesCarousal,
  // Reviews,
} from '../components'
import ModalHome from '../components/ModalHome'
const HomePage = ({ isAuthenticated }) => {
    React.useEffect(() => {
      let title = 'URJA | Home'
      document.title = title;
    });
  const [modalSignupShow, setModalSignupShow] = React.useState(false)
  const [value, setValue] = React.useState(true)
  React.useEffect(() => {
    if (value) {
      setModalSignupShow(true)
    }
    return setValue(false)
  }, [modalSignupShow, value])

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <div></div>
      ) : (
        <ModalHome
          show={modalSignupShow}
          onHide={() => setModalSignupShow(false)}
        />
      )}
      <Navbar></Navbar>
      <br />
      <br />
      <br />
      <Banner />
      <CategoriesCarousal />
      <TrendingCarousal />
      <BestSellerCarousal />
      <RecentlyViewedCarousal />
      <Services></Services>
      {/* <Reviews /> */}
      <NewsLetter />
      <Footer></Footer>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, {})(HomePage)
