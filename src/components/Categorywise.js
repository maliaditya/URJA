import React, {Component} from 'react'
import styled from 'styled-components'
// import { itemSearchedAction } from '../actions/auth'
import ProductResult from './ProductsResult'
import { connect } from 'react-redux'
import {current_item_added} from '../actions/auth'
import axios from 'axios';
import { Accordion,Card } from "react-bootstrap";
import {IoMdArrowDropdown} from 'react-icons/io'
const api = process.env.REACT_APP_API_URL

class Categorywise extends Component {
 constructor(props) {
            super(props)
            this.state = {
                productCategories:[],
                productType:[]
            };
        }

  fetchCategories = async () => {
      const config = {headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${this.props.access}`,
          }}
      const product_type = await axios.get(`${api}/api/product_type/`, config )
      const product_categories = await axios.get(`${api}/api/categories/`, config )
      this.setState({
        productType:product_type.data,
        productCategories:product_categories.data
      })
      console.log("stateer",this.state);

  }

   componentDidMount() {
     this.fetchCategories()
  }

  render() {
    return( <Wrapper className='content'>
      <div className='col-md-12 row'>
        <div className='check sidenav col-md-4'>
          <Accordion> 
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">Product Type 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<IoMdArrowDropdown size={30}></IoMdArrowDropdown>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{this.state.productType.map((item, index)=>{
                            return(
                              <label key={index} style={{marginLeft:'1.5rem'}} >
                                  <input type='checkbox'  name='remember' /> {item.product_type}
                              </label>  
                            )})}
        </Card.Body>
              </Accordion.Collapse>
                  </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Product Categories
             &nbsp;&nbsp; <IoMdArrowDropdown size={30}></IoMdArrowDropdown>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>{this.state.productCategories.map((item, index)=>{
                                      return(
                                        <label key={index} style={{marginLeft:'1.5rem'}} >
                                            <input type='checkbox'  name='remember' /> {item.category_name}
                                        </label>  
                                      )})}
                                  </Card.Body>
                            </Accordion.Collapse>
                        </Card>


                           <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Search By&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp; &nbsp;  <IoMdArrowDropdown size={30}></IoMdArrowDropdown>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                        <label  style={{marginLeft:'1.5rem'}} >
                                            <input type='checkbox'  name='remember' /> Leading Seller
                                        </label>  
                                         <label  style={{marginLeft:'1.5rem'}} >
                                            <input type='checkbox'  name='remember' /> Verified Seller
                                        </label> 
                                  </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
        </div>
        <div className=' col-md-8'>
          <ProductResult />
        </div>
      </div>
    </Wrapper>)
  }

}

const Wrapper = styled.section`
  overflow: hidden;
  .sidenav {
    width: 230px;
    position: sticky;
    z-index: 1;
    top: 20px;
    left: 10px;
    // background: #eee;
    overflow-x: hidden;
    padding: 8px 0;
    margin-top: 2rem;
    margin-bottom: 10rem;
    margin-left: 2rem;
  }
  .check input {
      width: 1rem;
      magin-left:5rem;
      margin-top: 1rem;
    }
  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #2196f3;
    display: block;
  }

  .sidenav a:hover {
    color: #064579;
  }

  .main {
    margin-top: 2rem;
    margin-left: 100px; /* Same width as the sidebar + left position in px */
    font-size: 28px; /* Increased text to enable scrolling */
    padding: 0px 10px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
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

export default connect(mapStateToProps, {current_item_added})(Categorywise)

