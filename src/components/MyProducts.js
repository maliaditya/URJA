import React from 'react'
import styled from 'styled-components'
import Rating from './Rating'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import ModalAddProduct from './ModalAddProduct'
import ModalEditProduct from './ModalEditProduct'
import ModalDeleteProduct from './ModalDeleteProduct'
import Button from 'react-bootstrap/Button'

const MyProducts = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [modalEditProductShow, setModalEditProductShow] = React.useState(false)
  const [modalDeleteProductShow, setModalDeleteProductShow] =
    React.useState(false)

  return (
    <Wrapper className='content'>
      <div className='title'>
        <h4>My Products &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>

        <Button variant='primary' onClick={() => setModalShow(true)}>
          {' '}
          <AiOutlineAppstoreAdd className='addnewicon' size={20} />
          &nbsp;&nbsp; Add Product
        </Button>
      </div>
      <ModalAddProduct show={modalShow} onHide={() => setModalShow(false)} />
      <ModalEditProduct
        show={modalEditProductShow}
        onHide={() => setModalEditProductShow(false)}
      />{' '}
      <ModalDeleteProduct
        show={modalDeleteProductShow}
        onHide={() => setModalDeleteProductShow(false)}
      />
      <br />
      <div className='containercard border '>
        <img
          className='containercard__image'
          src='https://images.unsplash.com/photo-1509222413196-40eb6b6b96e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=678&q=80'
        />
        <div className='header'>
          <p className='head-title'>
            <h4>Agri Hub</h4>
            <FaRegEdit
              onClick={() => setModalEditProductShow(true)}
              className='fav'
              size={25}
            />
            <RiDeleteBin5Line
              onClick={() => setModalDeleteProductShow(true)}
              size={25}
            />
          </p>
          <div className='desc'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
              corrupti.
            </p>
            <p className='rating'>
              <Rating />
              &nbsp; &nbsp; 2.0 &nbsp; | &nbsp; 48 ratings
            </p>
            <p> ₹ 80/kg</p>
          </div>
          {/* <button className='btn btn-warning'>Send enquiry </button>

          <button className='btn btn-secondary'>View number</button> */}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  button {
    float: right;
  }

  left: 50%;

  .addnew {
    display: flex;
  }

  .fav {
    margin-left: 6rem;
    float: right;
  }
  svg:hover {
    color: #ffc232;
  }
  .head-title {
    display: flex;
    justify-content: space-between;
  }

  .header {
    padding: 1rem;
  }
  .rating {
    display: flex;
  }
  p {
    margin-bottom: 0.5rem;
    color: var(--clr-grey-3);
  }

  .containercard {
    margin-top: 3rem;
    justify-content: space-around;

    width: 20rem;
    height: 30rem;
    border-radius: 1rem;
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;
    &__image {
      border-radius: 1rem 1rem 0rem 0rem;
      width: 20rem;
      background-size: cover;
      display: block;
    }
  }
  @media (min-width: 720px) {
    .fav {
      margin-left: 10rem;
    }
    .containercard {
      width: 35rem;
      height: 12rem;
      border-radius: 1rem;

      display: flex;
      &__image {
        border-radius: 1rem 0rem 0rem 1rem;
        width: 10rem;
        background-size: cover;
        display: block;
      }
    }
  }
  @media (min-width: 1300px) {
    .fav {
      margin-left: 13rem;
    }
    .containercard {
      margin-left: 1rem;

      width: 40rem;
      height: 12rem;
      border-radius: 1rem;
      display: flex;
      &__image {
        border-radius: 1rem 0rem 0rem 1rem;
        width: 13rem;
        background-size: cover;
        display: block;
      }
    }
  }
`

export default MyProducts
