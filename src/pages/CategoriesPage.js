import React from 'react'
import styled from 'styled-components'
import { Footer, Productnav, NewsLetter, Categorywise } from '../components'
const CategoriesPage = () => {
  return (
    <>
      <Productnav></Productnav>
      <Categorywise />
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </>
  )
}

const Wrapper = styled.div``

export default CategoriesPage
