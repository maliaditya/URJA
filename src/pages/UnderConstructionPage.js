import React from 'react'
import { connect } from 'react-redux'
import {
  // Productnav,
  Services,
  Footer,
  NewsLetter,
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const UnderConstructionPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div id='underConst' style={{ marginTop: '5rem' }}>
      <ProductNavSearch />
      <br />
      <br />
      <br />
      <br />
      <center
        className='container'
        style={{
          padding: '7rem',
          backgroundColor: '#eee',
          borderRadius: '1rem',
        }}
      >
        <h1>Comming Soon...!</h1>
      </center>
      <br />
      <br />
      <br />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, {})(UnderConstructionPage)
