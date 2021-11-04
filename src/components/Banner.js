import React from 'react'
import styled from 'styled-components'
// import SidebarAll from './SidebarAll'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  current_item_added,
  itemSearched,
  itemSearchedClear,
  itemSearchedOriginalArray,
  clearOriginalArray,
  addproductNames,
  addPaginationInfo,
} from '../actions/auth'
import { Redirect } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: '',
      setSearchResultItems: [],
      homemade: [],
      supplier: [],
      manufacturer: [],
      exporter: [],
      trader: [],
      bachatGat: [],
      services: [],
      productNames: [],
      suggestions: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  fetchCategories = async () => {
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // ''Authorization'': `Bearer ${this.props.access}`
      },
    }
    await axios
      .get(`${api}/api/type_category/`, config)
      .then((res) => {
        this.setState({ ...this.state, categories: res.data })
        console.log('fetchCategoriesfetchCategories', res.data)

        res.data.map((item) => {
          if (
            item.product_type === 'Homemade' &&
            item.product_data.length !== 0
          ) {
            this.state.homemade.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Manufacturer' &&
            item.product_data.length !== 0
          ) {
            this.state.manufacturer.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Exporter' &&
            item.product_data.length !== 0
          ) {
            this.state.exporter.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Trader' &&
            item.product_data.length !== 0
          ) {
            this.state.trader.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Supplier' &&
            item.product_data.length !== 0
          ) {
            this.state.supplier.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Bachat Gat' &&
            item.product_data.length !== 0
          ) {
            this.state.bachatGat.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          } else if (
            item.product_type === 'Services' &&
            item.product_data.length !== 0
          ) {
            this.state.services.push(
              ...item.product_data.map((sub) => sub.category.category_name)
            )
          }
          return 0
        })
        this.setState({
          ...this.state,
          homemade: this.state.homemade.filter(this.onlyUnique),
          supplier: this.state.supplier.filter(this.onlyUnique),
          manufacturer: this.state.manufacturer.filter(this.onlyUnique),
          exporter: this.state.exporter.filter(this.onlyUnique),
          trader: this.state.trader.filter(this.onlyUnique),
          bachatGat: this.state.bachatGat.filter(this.onlyUnique),
          services: this.state.services.filter(this.onlyUnique),
        })
      })

      .catch((err) => {
        console.log(err)
      })
  }

  fetchSearchResults = async (keyword) => {
    try {
      const config = {
        headers: {
          'content-type': 'appliation/json',
          // ''Authorization'': `Bearer ${this.props.access}`
        },
      }
      await axios
        .get(`${api}/api/product/?search=${keyword}`, config)
        .then((res) => {
          this.setState({ ...this.state, setSearchResultItems: res.data })
          this.props.addPaginationInfo(
            res.data.count,
            res.data.previous,
            res.data.next
          )
          clearOriginalArray()
          console.log('res.data', res.data)
          res.data.results.map((item) => {
            this.props.itemSearched(item, keyword)
            this.props.itemSearchedOriginalArray(item)
            return 0
          })
          if (this.props.itemSearchedResult.length === 0) {
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

  fetchSearchResultsFromMegaMenu = async (product_type, Category) => {
    try {
      const config = {
        headers: {
          'content-type': 'appliation/json',
          // ''Authorization'': `Bearer ${this.props.access}`
        },
      }
      await axios
        .get(
          `${api}/api/products/?product_type=${product_type}&category=${Category}`,
          config,
          Category
        )
        .then((res) => {
          this.props.addPaginationInfo(
            res.data.count,
            res.data.previous,
            res.data.next
          )
          console.log('product categories', res.data)
          this.setState({ setSearchResultItems: res.data })
          res.data.results.map((item) => {
            return this.props.itemSearched(item)
          })
          console.log('product categories', res.data)
          if (this.props.itemSearchedResult.length === 0) {
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

  handleChange(event) {
    let matches = []
    if (event.target.value.length > 0) {
      matches = this.state.productNames.filter((prod) => {
        const regex = new RegExp(`${event.target.value}`, 'gi')
        return prod.name.match(regex)
      })
    }
    console.log('match', matches)
    this.setState({ suggestions: matches })
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.fetchSearchResults(this.state.searchItem)
  }

  fetchProductNames = async () => {
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // ''Authorization'': `Bearer ${this.props.access}`
      },
    }
    await axios
      .get(`${api}/api/product_names/`, config)
      .then((res) => {
        this.setState({ productNames: res.data })
        console.log('product_names', res.data)
        res.data.map((item) => this.props.addproductNames(item))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchProductNames()
    this.fetchCategories()
  }

  render() {
    if (this.props.itemSearchedResult.length !== 0) {
      return <Redirect to='/categories'></Redirect>
    }

    return (
      <Wrapper className='content'>
        <div className='marquee'>
          <br />

          <p>
            Welcome to URJA, we will be happy to help you to grow your local business, you just have to register as a seller and we will take care of other things.
          </p>
        </div>
        <center>
          <div className='banner'>
            <p className='ttag'>Let us Know what you need..</p>
            <p className='slang'>
              More than 10,000 companies trust our bussiness
            </p>
          </div>
          <div className='search-container sb-example-3'>
            {/* <form onSubmit={this.handleSubmit} className='search__container '>
              <button className='btn btn-warning'>
                {' '}
                All{' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-down'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                  />
                </svg>
              </button>
              <span> &nbsp; &nbsp; </span>

              <input
                onChange={(e) => this.handleChange(e)}
                className='search__input '
                name='searchItem'
                value={this.state.searchItem}
                type='text'
                placeholder='Search'
              />
            </form> */}

            <section>
              <div className='container'>
                <ul className='menu-main'>
                  <li>
                    <div className='btn btn-warning allbtn'>
                      All
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-chevron-down'
                        viewBox='0 0 16 16'
                      >
                        <path
                          fillRule='evenodd'
                          d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                        />
                      </svg>
                    </div>

                    <div className='menu-sub col-md-12'>
                      <div className='row'>
                        <div className='col-md-3'>
                          <h5 className='menu-category'> Homemade</h5>
                          {console.log('item', this.state.homemade[0])}
                          <ul>
                            {this.state.homemade.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Homemade',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                          <h5 className='menu-category'> Supplier</h5>
                          <ul>
                            {this.state.supplier.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Supplier',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                        </div>

                        <div className='col-md-3'>
                          <h5 className='menu-category'> Manufacturer</h5>
                          <ul>
                            {this.state.manufacturer.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Manufacturer',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                          <h5 className='menu-category'> Exporter</h5>
                          <ul>
                            {this.state.exporter.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Exporter',
                                        `${item}`
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                        </div>

                        <div className='col-md-3'>
                          <h5 className='menu-category'> Trader</h5>
                          <ul>
                            {this.state.trader.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Trader',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                          <h5 className='menu-category'> Bachat Gat</h5>
                          <ul>
                            {this.state.bachatGat.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Bachat Gat',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                        </div>

                        <div className='col-md-3'>
                          <h5 className='menu-category'> Services</h5>
                          <ul>
                            {this.state.services.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='#!'
                                    onClick={() =>
                                      this.fetchSearchResultsFromMegaMenu(
                                        'Services',
                                        item
                                      )
                                    }
                                  >
                                    {item}
                                  </a>{' '}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  &nbsp; &nbsp; &nbsp;
                  <li>
                    <form
                      onSubmit={this.handleSubmit}
                      className='search__container '
                    >
                      <input
                        list='names'
                        onChange={(e) => this.handleChange(e)}
                        className='search__input '
                        name='searchItem'
                        value={this.state.searchItem}
                        type='text'
                        placeholder='Search'
                      />
                      <datalist style={{ width: '50rem' }} id='names'>
                        {this.state.suggestions &&
                          this.state.suggestions.map((item, index) => (
                            <option key={index} value={item.name}></option>
                          ))}
                      </datalist>
                    </form>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </center>
      </Wrapper>
    )
  }
}

const Wrapper = styled.article`

.marquee {
    width: 100%;

	color: black;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
}
.marquee p {
  	background-color:#fcc232;
  color:black;
    display: inline-block;
    padding-left: 100%;
    animation: marquee 45s linear infinite;
}
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}



$arrow-size:10px;
$arrow-color:yellow;

%arrow {
  &:before {
    position: absolute;
    content: "";
    display:block;
    width:0;
    height:0;
    left:50%;
    margin-left: -$arrow-size;
    margin-top:-$arrow-size*2;
    border: $arrow-size solid transparent;
    border-bottom: $arrow-size solid $arrow-color;
  }
}


h5{
  font-weight:700;
  margin-bottom:1rem;
}


*{
	box-sizing: border-box;
}

body{
	background: #ddd;
	margin: 0;
}


.container{
	max-width: 1000px
	margin: 0 auto;
    
  @extend %arrow;
  
}


section{
	background: #fff
}

section ul{
  z-index:999;
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
	text-align: left;
}


section li{
	display: inline-block;
}

section a{
	color: #444;
	text-decoration: none;
	display: block;
	padding: .75em 1.75em;
}

// section li:hover{
// 	background: #444;
// }


section li:hover a{
	color:black;
}

.menu-sub{
  margin-left:0;
  margin-top: 0.2rem;
	position: absolute;
	background:#d9d9d9;
	width: 100%;
	display: none;
	color: black;
	padding: 2em;
  border-radius:0.5rem;
}

.menu-sub li{
	display: block;
}

section li:hover .menu-sub{
	display: block;
}

.menu-sub li{
	display: block;
}

.menu-sub a{
	padding: 0;
	margin-bottom: 0px;
}

.menu-sub a:hover{
	text-decoration: underline;
}

.menu-category{
	margin: 2.5rem 0 .5em;
}

// .menu-category:first-of-type {
// 	margin: 0;
// }


.menu-col-1,
.menu-col-2,
.menu-col-3,
.menu-col-4,{
	float: left;
}


.menu-col-1{
	width: 25%;
}

















padding-bottom: 8rem;

  input {
    height: 2.7rem;
  }

  .ttag {
    margin-top: 5rem;
    font-size: 1.2rem;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 0.7rem;
  }

  .banner {
    padding-top: 2rem;
    align-items: center;
    align-content: center;
    margin: 0 auto;
  }

  .sb-example-3 .search__title {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    color: #ff8b88;
  }

  .sb-example-3 .search__input {
    padding: 10px 24px;
    width: 13rem;
    margin-top: 10px;
    background-color: rgba(196, 196, 196, 0.5);
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;

    color: #000000;

    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 5px;
    border: none;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .sb-example-3 .search__input::placeholder {
    color: rgba(87, 87, 86, 0.8);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .sb-example-3 .search__input:hover,
  .search__input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }

  .topsection .search-container {
    float: none;
    
  }

  
   @media (min-width:400px){
   
.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}

    .btn{
  margin-left:1rem;
}
  .ttag {
    margin-top: 5rem;
    font-size: 1.8em;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 0.9rem;
  }
  .sb-example-3 .search__input {
    width: 17rem;;
  }
}



   @media (min-width:500px){
   
.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}

    .btn{
  margin-left:1rem;
}
  .ttag {
    margin-top: 5rem;
    font-size: 1.8em;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 0.9rem;
  }
  .sb-example-3 .search__input {
    width: 21rem;;
  }
}




  @media (min-width:760px){
    
.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}

    .btn{
  margin-left:5rem;
}


  .ttag {
    margin-top: 5rem;
    font-size: 1.8rem;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 1rem;
  }
  .sb-example-3 .search__input {
    width: 26rem;;
  }

  }

   @media (min-width:1000px){
   
.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}

    .btn{
  margin-left:10rem;
}
  .ttag {
    margin-top: 5rem;
    font-size: 2.2em;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 1.3rem;
  }
  .sb-example-3 .search__input {
    width: 31rem;;
  }
}



 @media (min-width:1200px){
   
.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}

    .btn{
  margin-left:15rem;
}
  .ttag {
    margin-top: 5rem;
    font-size: 2.2em;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 1.3rem;
  }
  .sb-example-3 .search__input {
    width: 31rem;;
  }
}


  @media (min-width:1300px){

.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}
    
    .btn{
  margin-left:10rem;
}


  .ttag {
    margin-top: 5rem;
    font-size: 3rem;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 1.77rem;
  }
  .sb-example-3 .search__input {
    width: 45rem;;
  }
  
  

  @media (min-width:1400px){

.menu-category{
	margin: 2.5rem 0 .5em;
}

.menu-category:first-of-type {
	margin: 0;
}
    
    .btn{
  margin-left:15rem;
}


  .ttag {
    margin-top: 5rem;
    font-size: 3rem;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 1.77rem;
  }
  .sb-example-3 .search__input {
    width: 45rem;;
  }
  

  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult: state.auth.itemSearchedResult,
  }
}

export default connect(mapStateToProps, {
  current_item_added,
  itemSearched,
  itemSearchedClear,
  itemSearchedOriginalArray,
  clearOriginalArray,
  addproductNames,
  addPaginationInfo,
})(Banner)
