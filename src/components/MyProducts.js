import React ,{useEffect}from 'react'
import styled from 'styled-components'
import Rating from './Rating'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import ModalAddProduct from './ModalAddProduct'
import ModalEditProduct from './ModalEditProduct'
import ModalDeleteProduct from './ModalDeleteProduct'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import {MdRefresh} from 'react-icons/md'
const api = process.env.REACT_APP_API_URL

const MyProducts = ({access}) => {
  const [modalShow, setModalShow] = React.useState(false)
  const [modalEditProductShow, setModalEditProductShow] = React.useState(false)
  const [modalDeleteProductShow, setModalDeleteProductShow] =React.useState(false)
  const [productList, setProductList] =React.useState([])
  const [showEffect, setShowEffect] =React.useState(false)

  console.log(showEffect)

  const fetchCategories = async () => {
      const config = {headers: {
            'content-type': 'appliation/json',
          }}
      await axios.get(`${api}/api/products/`,
                      config
                      ).then(res=>{
                        console.log(res);
                        setProductList(res.data)
                      }).catch(err=>{
                        console.log(err);
                      })
  }

  const deleteProduct = async (id) => {
     console.log('res',id);
      const config = {headers: {
            'content-type': 'appliation/json',
            'Authorization': `Bearer ${access}`
          }}
      await axios.delete(`${api}/api/products/${id}/`,
                      config
                      ).then(res=>{
                        console.log(res);
                      axios.get(`${api}/api/products/`,
                      config
                      ).then(res=>{
                        console.log(res);
                        fetchCategories()
                      }).catch(err=>{
                        console.log(err);
                      })
                        alert('product was deleted')
                      }).catch(err=>{
                        console.log(err);
                      })
  }

useEffect(()=>{
      fetchCategories()
      setShowEffect(false)
  },[])

  useEffect(()=>{
    if(showEffect){
      fetchCategories()
      setShowEffect(false)
    }
  },[showEffect])
  
  const setValues = () =>{
setShowEffect(true)
setModalShow(true)

  }
  return (
  

      <Wrapper className='content'>
      <div className='title'>
      <h4>My Products &nbsp;&nbsp;<MdRefresh  onClick={()=> setShowEffect(true)}/></h4>
      
      <Button variant='primary' onClick={()=> setValues()} >
          {' '}
          <AiOutlineAppstoreAdd className='addnewicon' size={20} />
          &nbsp;&nbsp; Add Product
          </Button>
      </div>
      <ModalAddProduct show={modalShow} onHide={() => setModalShow(false)} />
{productList.map((item)=>{
  return(
    <article key={item.id}>
    <ModalEditProduct show={modalEditProductShow}onHide={() => setModalEditProductShow(false)}
  />
      <ModalDeleteProduct show={modalDeleteProductShow} onHide={() => setModalDeleteProductShow(false)} />
  

      <br />
      <div className='containercard border '>
        <img
          className='containercard__image'
          alt='product_image'
          src={item.front_image}
          />
        <div className='header'>
          <p className='head-title'>
            <h5 style={{fontWeight:'700'}}>{item.name}</h5>
            <section>
            <RiDeleteBin5Line
              onClick={()=>deleteProduct(item.id)}
              size={25}
              />
               <FaRegEdit
              onClick={() => setModalEditProductShow(true)}
              className='fav'
              size={25}
              /> 
              </section>
          </p>
          <div className='desc'>
            <p>
              {item.details.slice(0, 90)}...
            </p>
            <p className='rating'>
              <Rating />
              &nbsp; &nbsp; 2.0 &nbsp; | &nbsp; <a  style={{color:'#0d6efd'}} href="#!"  onClick={() => setModalDeleteProductShow(true)}> 48 ratings </a>
            </p>
            <div className='pricedate'>

            <p> ₹ {item.price}</p>
            <h6 style={{fontSize:'0.8rem'}}> Created on: {item.get_created_at}</h6>
            </div>
          </div>
          {/* <button className='btn btn-warning'>Send enquiry </button>

<button className='btn btn-secondary'>View number</button> */}
        </div>
      </div>
</article>)})}
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
    margin-left:1rem;
    float: right;
  }
  svg:hover {
    color: #ffc232;
  }
  .head-title {

    display: flex;
    justify-content:space-between
    
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
  

    width: 20rem;
    height: 35rem;
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
     .pricedate{
      display:flex;
       justify-content:space-between
    }
   
    // .fav {
    //   margin-left: 10rem;
    // }
  .head-title {
    display: flex;
    justify-content:space-between
    
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
     .pricedate{
      display:flex;
       justify-content:space-between
    }
    // .fav {
    //   margin-left: 13rem;
    // }
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
 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
          user: state.auth.user}
}

  


export default connect(mapStateToProps, {})(MyProducts)

