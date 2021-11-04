import React from 'react'
import { connect } from 'react-redux'
import {
  // Productnav,
  Account,
  Services,
  Footer,
  NewsLetter,
  
} from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const AccountPage = () => {
   React.useEffect(() => {
      let title = 'URJA | Account'
      document.title = title;
    });

  return (
    <div style={{ marginTop: '5rem' }}>
      <ProductNavSearch />
      <Account />
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
export default connect(mapStateToProps, {})(AccountPage)
