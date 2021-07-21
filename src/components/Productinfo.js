import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Productinfo = ({currentItem}) => {
  currentItem = JSON.parse(localStorage.getItem("currentItem") || "[]");
  return (
    <Reviewwrap className='content'>
      <div className='container'>
        <p className='ttag'>Product Details</p>
        <div className='text'>
          {currentItem.details}
        </div>
      </div>

      <div className='container'>
        <p className='ttag'>Company Details</p>
        <div className='text'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          animi officia asperiores quam, provident iste labore totam explicabo
          dolores sequi esse accusamus in porro, deleniti perferendis veniam
          dicta! Numquam quaerat ipsum sequi obcaecati quasi animi, optio quae
          porro corrupti laborum modi cum unde consectetur aliquam doloremque
          nostrum illo enim quia asperiores pariatur, nesciunt ex. Dicta cumque
          dolor nostrum necessitatibus, quidem eum vel maxime aspernatur dolorem
          obcaecati, id sed doloremque dolores eveniet enim alias! Eveniet nisi
          placeat nulla dignissimos quas magnam quidem eligendi laboriosam in
          saepe necessitatibus rem debitis labore molestias, iste, officiis
          nostrum, ratione aut corrupti facilis quaerat? Iste, officiis!
        </div>
      </div>
    </Reviewwrap>
  )
}

const Reviewwrap = styled.section`
  .container {
    padding-top: 0.5rem;
  }

  .ttag {
    padding-top: 5rem;

    font-size: 1.54rem;
    color: black;
    font-weight: 700;
  }
  .text {
    text-indent: 5rem;
  }
  .seller {
    padding-left: 5rem;
  }

  @media (min-width: 1400px) {
    .content {
      max-width: 1300px;
      margin: auto;
      background: white;
      padding: 10px;
    }
  }
`


 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult:state.auth.itemSearchedResult
  }
}
  

export default connect(mapStateToProps, {})(Productinfo)



