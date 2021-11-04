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
      let title = 'URJA | Who are we '
      document.title = title;
    });
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
       <h3 className='text-center'>Who we are</h3>
       <hr />
      <center
        className='container'
        style={{
          padding: '7rem',
          backgroundColor: '#eee',
          borderRadius: '1rem',
        }}
      >
        <p style={{fontSize:'1.5rem'}}>Urja was started in 2021 to offer the Global Business Community a single platform to promote their products and services. Today, it provides a single platform to all the businesses for the online promotion of their products and services. Its portal is an ideal forum for buyers and sellers from across the globe, who can interact with each other and conduct the business smoothly, securely and effectively.

</p>
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
