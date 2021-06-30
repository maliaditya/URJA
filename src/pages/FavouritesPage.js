import React from 'react'
import {
  Productnav,
  Footer,
  NewsLetter,
  Services,
  ProductCard,
} from '../components'
const FavouritesPage = () => {
  return (
    <div>
      <Productnav />
      <ProductCard />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default FavouritesPage
