import React, { Component } from 'react'
import styled from 'styled-components'
// import { itemSearchedAction } from '../actions/auth'
import ProductResult from './ProductsResult'
import { connect } from 'react-redux'

import {
  current_item_added,
  itemSearched,
  itemSearchedClear,
  itemSearchedOriginalArray,
  clearOriginalArray,
} from '../actions/auth'
import axios from 'axios'
const api = process.env.REACT_APP_API_URL

class Categorywise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productCategories: [],
      productType: [],
      productTypeSliceAt: 3,
      itemsToShow: 3,
      expanded: false,
      homemade: true,
      manufacturer: true,
      exporter: true,
      trader: true,
      supplier: true,
      bachatgat: true,
      services: true,
      verified_seller: true,
      leading_seller: true,
      condition: false,
      inStock: true,
      outOfStock: true,
      initialValueofArray: 0,
      searchResultBackupStore: [],
      verifiedDisable: false,
      leadingDisable: false,
      min: 'min',
      max: 'max',
    }
    this.viewMore = this.viewMore.bind(this)
    this.onStockChange = this.onStockChange.bind(this)
  }

  fetchProductsOnProductType = async (key, value) => {
    try {
      const config = {
        headers: {
          'content-type': 'appliation/json',
        },
      }
      await axios
        .get(`${api}/api/products/?${key}=${value}`, config)
        .then((res) => {
          console.log('data', res.data)
          this.setState({ ...this.state, setSearchResultItems: res.data })
          clearOriginalArray()
          res.data.map((item) => {
            console.log('itemdata', item)
            this.props.itemSearchedOriginalArray(item)
            this.props.itemSearched(item, value)

            return 0
          })
          this.setState({
            verifiedDisable: false,
            leadingDisable: false,
          })
          this.setState({
            value: 1,
          })
          if (res.data.length === 0) {
            return alert('No search results found')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  onPriceChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

 


  onSubmit = (e) => {
    e.preventDefault()
    console.log('on submit ran')
    const filteredArray = this.props.originalSearchArray.filter(
      (item) =>
        parseInt(item.price) > this.state.min &&
        parseInt(item.price) < this.state.max
    )
    this.props.itemSearchedClear()
    filteredArray.map((item) => {
      return this.props.itemSearched(item)
    })
  }

  onChange = (e) => {
    const intext = e.target.name.toLowerCase().replaceAll(' ', '')

    if (this.props.originalSearchArray.length === 0) {
      if (this.state[intext]) {
        this.fetchProductsOnProductType('product_type', e.target.name)
      }
    } else {
      this.setState(function (state) {
        if (state[intext]) {
          const filteredArray = this.props.originalSearchArray.filter(
            (item) => item.product_type.product_type === e.target.name
          )
          this.props.itemSearchedClear()
          filteredArray.map((item) => {
            return this.props.itemSearched(item)
          })
          return {
            [e.target.name]: false,
            condition: true,
          }
        }
        return {
          [e.target.name]: true,
        }
      })
    }
  }
  onCategoryChange = (e) => {
    const intext = e.target.name.toLowerCase().replaceAll(' ', '')
    console.log('e.target.name', e.target.name)
    this.setState({
      [e.target.name.toLowerCase().replaceAll(' ', '')]: e.target.checked,
    })

    if (!this.state[intext]) {
      this.fetchProductsOnProductType('category', e.target.name)
    }
  }

  onChangeVerifiedSeller = (e) => {
    this.setState(function (state) {
      if (state.verified_seller && state.leading_seller && state.condition) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) =>
            item.company.verified_seller === true &&
            item.company.leading_seller === true
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: false,
          condition: false,
        }
      } else if (state.verified_seller) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) => item.company.verified_seller === true
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: false,
          condition: true,
        }
      }
      return {
        [e.target.name]: true,
      }
    })
  }

  onChangeLeadingSeller = (e) => {
    this.setState(function (state) {
      if (state.verified_seller && state.leading_seller && state.condition) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) =>
            item.company.verified_seller === true &&
            item.company.leading_seller === true
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: false,
          condition: false,
        }
      } else if (state.leading_seller) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) => item.company.leading_seller === true
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: false,
          condition: true,
        }
      }
      return {
        [e.target.name]: true,
      }
    })
  }

  fetchCategories = async () => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        // ''Authorization'': `Bearer ${this.props.access}`,
      },
    }
    const product_type = await axios.get(`${api}/api/product_type/`, config)
    const product_categories = await axios.get(`${api}/api/categories/`, config)
    this.setState({
      ...this.state,
      productType: product_type.data,
      productCategories: product_categories.data,
    })
  }

  componentDidMount() {
    this.fetchCategories()
  }

  viewMore() {
    this.state.itemsToShow === 3
      ? this.setState({
          itemsToShow: this.state.productType.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 3, expanded: false })
  }

  onStockChange = (e) => {
    this.setState(function (state, props) {
      if (state.inStock) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) => item.in_stock === true
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: false,
        }
      } else if (!state.instock) {
        const filteredArray = this.props.originalSearchArray.filter(
          (item) => item.in_stock === true || item.in_stock === false
        )
        this.props.itemSearchedClear()
        filteredArray.map((item) => {
          return this.props.itemSearched(item)
        })
        return {
          [e.target.name]: true,
        }
      }
      return {
        [e.target.name]: true,
      }
    })
  }

  actionOnChange = (value1, value2) => {}

  render() {
    return (
      <Wrapper className='content'>
        <div  className='col-md-12 row'>
          <div className='check sidenav col-md-4'>
            <ul>
              <div className='bussiness-type'>
                <div className='row'>
                  <h5>Bussiness Type</h5>
                  <ul>
                    {this.state.productType
                      .slice(0, this.state.itemsToShow)
                      .map((item, i) => (
                        <li key={i}>
                          <label className='check'>
                            <input
                              onChange={this.onChange}
                              type='checkbox'
                              name={item.product_type}
                            />{' '}
                            {item.product_type}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
                <p>
                  <a href='#!' onClick={this.viewMore}>
                    {this.state.expanded ? (
                      <span>View Less</span>
                    ) : (
                      <span>View All</span>
                    )}
                  </a>
                  .
                </p>
              </div>

              <div className='search-by'>
                <h5>Search By</h5>

                <div className='row'>
                  <ul>
                    <li>
                      <label className='check'>
                        {this.state.verifiedDisable ? (
                          <input
                            disabled
                            type='checkbox'
                            name='verified_seller'
                            onChange={this.onChangeVerifiedSeller}
                          />
                        ) : (
                          <input
                            type='checkbox'
                            name='verified_seller'
                            onChange={this.onChangeVerifiedSeller}
                          />
                        )}
                        &nbsp;Verified Seller
                      </label>
                    </li>
                    <li>
                      <label className='check'>
                        {this.state.leadingDisable ? (
                          <input
                            disabled
                            type='checkbox'
                            name='leading_seller'
                            onChange={this.onChangeLeadingSeller}
                          />
                        ) : (
                          <input
                            type='checkbox'
                            name='leading_seller'
                            onChange={this.onChangeLeadingSeller}
                          />
                        )}
                        &nbsp;Leading Seller
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              <div className='price'>
                <h5>Price</h5>
                <div className='row'>
                  <ul>
                    <li>
                      <label
                        style={{ marginLeft: '-15px', display: 'flex' }}
                        className='check'
                      >
                        <form onSubmit={this.onSubmit}>
                          <input
                            placeholder='min'
                            style={{ width: '4.8rem', height: '1.7rem' }}
                            type='number'
                            name='min'
                            value={this.state.min}
                            onChange={this.onPriceChange}
                            min='1'
                          />
                          &nbsp;
                          <input
                            placeholder='max'
                            style={{ width: '4.8rem', height: '1.7rem' }}
                            type='number'
                            name='max'
                            value={this.state.max}
                            onChange={this.onPriceChange}
                            min='1'
                          />
                          &nbsp;&nbsp;
                          <button
                            style={{ height: '1.7rem', padding: '3px' }}
                            className='btn btn-secondary'
                            type='submit'
                          >
                            Go
                          </button>
                        </form>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              <div className='search-by'>
                <h5>Product Status</h5>
                <div className='row'>
                  <ul>
                    <li>
                      <label className='check'>
                        <input
                          onChange={this.onStockChange}
                          name='inStock'
                          type='checkbox'
                        />{' '}
                        Only In Stock
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              {/* <div className='other-categories'>
                <h5>Other Categories</h5>
                <div className='row'>
                  <ul>
                    {this.state.productCategories.map((item, index) => {
                      return (
                        <li key={index}>
                          <label className='check'>
                            <input
                              onChange={this.onCategoryChange}
                              
                              name={item.category_name}
                              type='checkbox'
                            />{' '}
                            {item.category_name}
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div> */}
            </ul>
          </div>
          <div className=' col-md-8'>
            <ProductResult />
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.section`
  h5 {
    font-weight: 700;
  }

  li {
    margin-top: 0;
  }
  overflow: hidden;
  .sidenav {
    width: 230px;
    position: sticky;
    z-index: 1;
    top: 20px;
    left: 10px;
    background: #eee;
    overflow-x: hidden;
    padding: 8px 0;
    margin-top: 2rem;
    margin-bottom: 10rem;
    margin-left: 2rem;
    border-radius: 1rem;
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: JSON.parse(localStorage.getItem('user') || '[]'),
    currentItem: state.auth.currentItem,
    itemSearchedResult: state.auth.itemSearchedResult,
    originalSearchArray: state.auth.originalSearchArray,
  }
}

export default connect(mapStateToProps, {
  current_item_added,
  itemSearchedClear,
  itemSearched,
  itemSearchedOriginalArray,
  clearOriginalArray,
})(Categorywise)
