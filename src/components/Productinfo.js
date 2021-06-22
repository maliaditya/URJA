import React from 'react'
import styled from 'styled-components'
import message1 from '../assets/message.svg'
import Rating from './Rating'

const Productinfo = () => {
  return (
    <Reviewwrap className='content'>
      <div className='container'>
        <p className='ttag'>Product Details</p>
        <div className='text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          voluptatem deleniti temporibus illo tenetur amet nam est, ratione
          obcaecati iure cupiditate, numquam quis delectus unde pariatur
          corrupti. Eligendi eius distinctio molestiae, placeat dignissimos ab,
          cum aliquam amet eos sequi aperiam accusamus adipisci, mollitia ut
          fugit quam. Consequuntur soluta aut consectetur!
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

    font-size: 1.7rem;
    color: black;
    font-weight: 700;
  }
  .text {
    text-indent: 10rem;
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

export default Productinfo
