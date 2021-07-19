import React from 'react'
import { Footer, Productnav, NewsLetter, Categorywise } from '../components'
const CategoriesPage = () => {
  return (
    <React.Fragment>
      <Productnav></Productnav>
      <Categorywise />
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </React.Fragment>
  )
}


export default CategoriesPage
