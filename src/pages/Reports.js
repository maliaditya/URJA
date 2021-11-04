import React from 'react'
import { connect } from 'react-redux'
import { Footer, NewsLetter } from '../components'
import ProductNavSearch from '../components/ProductNavSearch'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL
const Reports = ({user }) => {
   React.useEffect(() => {
      let title = 'URJA | Reports '
      document.title = title;
    });
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [complaint, setComplaint] = React.useState()

   const postComplaint=()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Accept':'application/json',
      },
    }
  
    const body = {
    "complaint": complaint,
    "user": user.id
}
    axios
      .post(`${api}/api/reports/`, body ,config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
   
  }

  const onChange = e =>{
    setComplaint(e.target.value)
  }

  const onSubmit=e=>{
    e.preventDefault()
    postComplaint()
    setComplaint("")
  }
  return (
    <React.Fragment>
      <ProductNavSearch></ProductNavSearch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className='text-center'>REPORT</h3>
      <hr />
      <br />
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
 
      <div 
        className='container'
        style={{ alignContent: 'center', alignItems: 'center' }}
      >
        <h4 className="mb-4">Hello, {user.first_name} {user.last_name}</h4>

        <div className='password'>
          <textarea
            window='200'
            type='text'
            className='form-control shadow-none'
            placeholder='Enter Your Complaint Here'
            name='complaint'
            value={complaint}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <br />
        <button  onClick={(e)=>onSubmit(e)}className='btn btn-warning' type='submit'>
          Submit
        </button>
      </div>
      <br />
      <br />
      <br />
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    access: state.auth.access,
    user: state.auth.user,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
  }
}

export default connect(mapStateToProps, {})(Reports)
