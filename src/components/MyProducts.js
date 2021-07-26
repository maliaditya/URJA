import React from 'react'
import styled from 'styled-components'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import ModalAddProduct from './ModalAddProduct'
import ModalEditProduct from './ModalEditProduct'
import ModalDeleteProduct from './ModalDeleteProduct'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdRefresh } from 'react-icons/md'
import { current_item_added } from '../actions/auth'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { load_user, checkAuthenticated } from '../actions/auth'
import { BiLinkExternal } from 'react-icons/bi'

const api = process.env.REACT_APP_API_URL

const MyProducts = ({
  user,
  access,
  current_item_added,
  load_user,
  checkAuthenticated,
}) => {
  const [value, setValue] = React.useState(true)
  const [modalShow, setModalShow] = React.useState(false)
  const [modalEditProductShow, setModalEditProductShow] = React.useState(false)
  const [modalDeleteProductShow, setModalDeleteProductShow] =
    React.useState(false)
  const [productList, setProductList] = React.useState(user.user_products)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1300, min: 720 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    },
  }

  const setStockValue = async (value, itemId) => {
    console.log(value, value)
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    }
    const body = {
      in_stock: value,
    }

    await axios
      .patch(`${api}/api/products/${itemId}/`, body, config)
      .then((res) => {
        console.log(res)

        if (value) {
          alert('Product set to available IN stock ')
        } else {
          alert('Product set to  Out of stock ')
        }
        load_user()
        checkAuthenticated()
      })
      .catch((err) => {
        console.log(err)
        alert(err, 'Please try again later')
      })
  }

  const deleteProduct = async (id) => {
    console.log('res', id)
    const config = {
      headers: {
        'content-type': 'appliation/json',
        Authorization: `Bearer ${access}`,
      },
    }
    await axios
      .delete(`${api}/api/products/${id}/`, config)
      .then((res) => {
        console.log(res)

        setTimeout(() => {
          checkAuthenticated()
          load_user()
          setProductList(user.user_products)
        }, 3000)

        alert('product was deleted')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const location = useLocation()

  const addCurrentItem = (item) => {
    current_item_added(item, location.pathname)
    setModalDeleteProductShow(true)
  }

  const addCurrentItemForEdit = (item) => {
    current_item_added(item, location.pathname)
    setModalEditProductShow(true)
  }

  React.useEffect(() => {
    setProductList(user.user_products)
  }, [user.user_products])

  const refresProductList = () => {
    load_user()
    checkAuthenticated()
    setProductList(user.user_products)
  }

  if (value) {
    return (
      <Wrapper className='content'>
        <div id='#myproducts' className='title'>
          <h4>
            My Products &nbsp;&nbsp;
            <MdRefresh onClick={() => refresProductList()} />
            &nbsp;&nbsp;
            <HiOutlineViewList onClick={() => setValue(true)} />
            &nbsp;&nbsp; <HiOutlineViewGrid onClick={() => setValue(false)} />
          </h4>

          <Button variant='primary' onClick={() => setModalShow(true)}>
            {' '}
            <AiOutlineAppstoreAdd className='addnewicon' size={20} />
            &nbsp;&nbsp; Add Product
          </Button>
        </div>
        <ModalAddProduct show={modalShow} onHide={() => setModalShow(false)} />
        {productList.map((item, index) => {
          return (
            <article key={item.id}>
              <ModalEditProduct
                show={modalEditProductShow}
                onHide={() => setModalEditProductShow(false)}
              />

              <br />
              <div className='containercard border '>
                <img
                  className='containercard__image'
                  alt='product_image'
                  src={item.front_image}
                />
                <div className='header'>
                  <div className='head-title'>
                    <h5
                      className='itemname'
                      style={{ fontWeight: '700', width: '16rem' }}
                    >
                      {item.name}
                    </h5>
                    <section>
                      <FaRegEdit
                        onClick={() => addCurrentItemForEdit(item)}
                        className='fav'
                        size={25}
                      />{' '}
                      <Link to='/product'>
                        <BiLinkExternal
                          onClick={() => current_item_added(item)}
                          className='fav'
                          size={25}
                        />{' '}
                      </Link>
                      <RiDeleteBin5Line
                        style={{ color: 'brown' }}
                        onClick={() => deleteProduct(item.id)}
                        size={25}
                      />
                    </section>
                  </div>
                  <div className='desc'>
                    <p>{item.details.slice(0, 90)}...</p>
                    <div className='rating'>
                      <Box
                        component='fieldset'
                        mb={0.5}
                        borderColor='transparent'
                      >
                        <Rating
                          name='read-only'
                          value={item.reviews.map((sub) => sub.rating)[0]}
                          readOnly
                        />
                      </Box>
                      &nbsp; &nbsp;{item.reviews.rating}&nbsp; | &nbsp;{' '}
                      <a href='#!' onClick={() => addCurrentItem(item)}>
                        {' '}
                        {item.reviews.length}&nbsp;ratings{' '}
                      </a>
                    </div>
                    <div className='pricedate'>
                      <ModalDeleteProduct
                        item={item}
                        show={modalDeleteProductShow}
                        onHide={() => setModalDeleteProductShow(false)}
                      />
                      <h6 style={{ fontSize: '0.9rem' }}>₹ {item.price}</h6>
                      {item.in_stock ? (
                        <a
                          href='#!'
                          onClick={() => setStockValue(false, item.id)}
                          className='instock'
                          style={{ fontSize: '0.8rem', color: 'green' }}
                        >
                          {' '}
                          In stock
                        </a>
                      ) : (
                        <a
                          href='#!'
                          onClick={() => setStockValue(true, item.id)}
                          className='instock'
                          style={{ fontSize: '0.8rem', color: 'red' }}
                        >
                          {' '}
                          Out of stock
                        </a>
                      )}

                      <h6 style={{ fontSize: '0.8rem' }}>
                        {' '}
                        Created on: {item.get_created_at}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </Wrapper>
    )
  } else {
    return (
      <GridView className='content'>
        <div className='title'>
          <h4>
            My Products &nbsp;&nbsp;
            <MdRefresh onClick={() => refresProductList()} />
            &nbsp;&nbsp;
            <HiOutlineViewList onClick={() => setValue(true)} />
            &nbsp;&nbsp; <HiOutlineViewGrid onClick={() => setValue(false)} />
          </h4>

          <Button variant='primary' onClick={() => setModalShow(true)}>
            {' '}
            <AiOutlineAppstoreAdd className='addnewicon' size={20} />
            &nbsp;&nbsp; Add Product
          </Button>
        </div>
        <ModalAddProduct show={modalShow} onHide={() => setModalShow(false)} />
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {productList.map((item) => {
            return (
              <article key={item.id}>
                <ModalEditProduct
                  show={modalEditProductShow}
                  onHide={() => setModalEditProductShow(false)}
                />

                <br />
                <div className='containercard border '>
                  <img
                    className='containercard__image'
                    alt='product_image'
                    src={item.front_image}
                  />
                  <div className='header'>
                    <div className='head-title'>
                      <h5 style={{ fontWeight: '700' }}>{item.name}</h5>
                    </div>
                    <div className='desc'>
                      <div className='rating'>
                        <Box
                          component='fieldset'
                          mb={0.5}
                          borderColor='transparent'
                        >
                          <Rating
                            name='read-only'
                            value={item.reviews.map((sub) => sub.rating)[0]}
                            readOnly
                          />
                        </Box>
                        &nbsp; &nbsp;{item.reviews.rating}&nbsp; | &nbsp;{' '}
                        <a href='#!' onClick={() => addCurrentItem(item)}>
                          {' '}
                          {item.reviews.length}&nbsp;ratings{' '}
                        </a>
                      </div>
                      <div className='pricedate'>
                        <ModalDeleteProduct
                          item={item}
                          show={modalDeleteProductShow}
                          onHide={() => setModalDeleteProductShow(false)}
                        />
                        <h6 style={{ fontSize: '0.9rem' }}>₹ {item.price}</h6>
                        {item.in_stock ? (
                          <a
                            href='#!'
                            onClick={() => setStockValue(false, item.id)}
                            className='instock'
                            style={{ fontSize: '0.8rem', color: 'green' }}
                          >
                            {' '}
                            In stock
                          </a>
                        ) : (
                          <a
                            href='#!'
                            onClick={() => setStockValue(true, item.id)}
                            className='instock'
                            style={{ fontSize: '0.8rem', color: 'red' }}
                          >
                            {' '}
                            Out of stock
                          </a>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <h6 style={{ fontSize: '0.8rem' }}>
                          {' '}
                          Created on: {item.get_created_at}
                        </h6>
                        <section>
                          <FaRegEdit
                            onClick={() => addCurrentItemForEdit(item)}
                            className='fav'
                            size={25}
                          />{' '}
                          <Link to='/product'>
                            <BiLinkExternal
                              onClick={() => current_item_added(item)}
                              className='fav'
                              size={25}
                            />{' '}
                          </Link>
                          <RiDeleteBin5Line
                            onClick={() => deleteProduct(item.id)}
                            size={25}
                          />
                        </section>
                      </div>
                    </div>
                    {/* <button className='btn btn-warning'>Send enquiry </button>

<button className='btn btn-secondary'>View number</button> */}
                  </div>
                </div>
              </article>
            )
          })}
        </Carousel>
      </GridView>
    )
  }
}

const Wrapper = styled.article`
  a {
    color: #1098f7;
  }
  a:hover {
    color: #ffc232;
  }

  .instock {
    color: #1098f7;
  }
  .instock:hover {
    color: #ffc232;
  }

  button {
    float: right;
  }

  left: 50%;

  .addnew {
    display: flex;
  }

  .fav {
    margin-left: 1rem;
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
    width: 20rem;
    height: 37rem;
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
    .pricedate {
      display: flex;
      justify-content: space-between;
    }

    // .fav {
    //   margin-left: 10rem;
    // }
    .head-title {
      display: flex;
      justify-content: space-between;
    }
    .containercard {
      width: 35rem;
      height: 14rem;
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
    .pricedate {
      display: flex;
      justify-content: space-between;
    }
    // .fav {
    //   margin-left: 13rem;
    // }
    .containercard {
      margin-left: 1rem;

      width: 40rem;
      height: 14rem;
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

const GridView = styled.article`
  a {
    color: #1098f7;
  }
  a:hover {
    color: #ffc232;
  }

  .instock {
    color: #1098f7;
  }
  .instock:hover {
    color: #ffc232;
  }

  button {
    float: right;
  }

  left: 50%;

  .addnew {
    display: flex;
  }

  .fav {
    margin-left: 1rem;
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
    width: 20rem;
    height: 28rem;
    border-radius: 1rem;
    -webkit-box-shadow: 0 6px 12px -13px black;
    -moz-box-shadow: 0 6px 12px -13px black;
    box-shadow: 0 6px 12px -13px black;
    &__image {
      border-radius: 1rem 1rem 0rem 0rem;
      width: 13rem;
      background-size: cover;
      display: block;
    }
  }
`
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: JSON.parse(localStorage.getItem('user') || '[]'),
    currentItem: state.auth.currentItem,
  }
}

export default connect(mapStateToProps, {
  current_item_added,
  checkAuthenticated,
  load_user,
})(MyProducts)
