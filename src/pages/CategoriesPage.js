import React from 'react'
import { Footer, Productnav, NewsLetter, Categorywise } from '../components'
const CategoriesPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  React.useEffect(() => {
      let title = 'URJA | Categories'
      document.title = title;
    });
  return (
    <React.Fragment>
      <Productnav></Productnav>
      <br />
      <br />
      <br />
      <br />
      <Categorywise />
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </React.Fragment>
  )
}

export default CategoriesPage
