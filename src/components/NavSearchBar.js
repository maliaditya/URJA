import React from 'react'
import styled from 'styled-components'
// import SidebarAll from './SidebarAll'
import axios from 'axios'
import { connect } from 'react-redux'
import { current_item_added,itemSearched,itemSearchedClear } from '../actions/auth'
import { Redirect } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            searchItem: '',
            setSearchResultItems:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchSearchResults=async (keyword)=>{

      const config = {headers: {
        'content-type': 'appliation/json',
            'Authorization': `Bearer ${this.props.access}`
          }}
          await axios.get(`${api}/api/products/?name=${keyword}`,
                      config
                      ).then(res=>{
                        console.log('data',res.data);
                        this.setState({setSearchResultItems:res.data})
                        res.data.map((item)=>{
                           console.log('itemdata',item);
                          return this.props.itemSearched(item)
                        })
                        if(this.props.itemSearchedResult.length === 0){
                                return alert('No search results found')
                          }
                       console.log('setSearcasdhResultItems',this.state.setSearchResultItems);
                        
                      }).catch(err=>{
                        console.log(err);
                      })
                      
 
  

}

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault()
     this.fetchSearchResults(this.state.searchItem)
    }



render(){
if(this.props.itemSearchedResult.length !== 0){
  return <Redirect to='/categories'></Redirect>
}

  return (
    <Wrapper className='content'>
      <center>
        
        <div className='search-container sb-example-3'>
          <form  onSubmit={this.handleSubmit} className='search__container '>
            <input onChange={(e)=>this.handleChange(e)} 
            className='search__input ' 
            name='searchItem' value ={this.state.searchItem} 
            type='text' placeholder='Search' />
            
          </form>
        </div>
      </center>
    </Wrapper>
  )
}
}


const Wrapper = styled.article`
padding-bottom: 8rem;

  input {
    height: 2.7rem;
  }

  .ttag {
    margin-top: 5rem;
    font-size: 1.5rem;
    color: black;
    font-weight: 700;
  }

  .slang {
    font-size: 0.8rem;
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
    width:     width: 15rem;;
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

  .topnav .search-container {
    float: none;
  }

  @media (min-width:720px){

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
    width: 29rem;;
  }

  }

  @media (min-width:1300px){

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




 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult:state.auth.itemSearchedResult
  }
}
  

export default connect(mapStateToProps, {current_item_added,itemSearched,itemSearchedClear})(NavSearch)



