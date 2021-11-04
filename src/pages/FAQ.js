import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Footer, NewsLetter } from '../components'
import ProductNavSearch from '../components/ProductNavSearch'

const api = process.env.REACT_APP_API_URL
const FAQ = ({  access, user,isAuthenticated }) => {
  const [faqs, setFaqs] = React.useState([])
  React.useEffect(() => {
      let title = 'URJA | FAQ'
      document.title = title;
    });
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  React.useEffect(() => {
    let isMounted = true
    const config = {
      headers: {
        'content-type': 'appliation/json',
        'Authorization': `Bearer ${access}`,
      },
    }
    axios
      .get(`${api}/api/faqs/`, config)
      .then((res) => {
        console.log(res)
        if (isMounted) setFaqs(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      isMounted = false
    }
  }, [access])

  const [question, setQuestion] = React.useState()
  const onChange = e =>{
   setQuestion(e.target.value)
  }

  const postQuestion=()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
 
        'Accept':'application/json',
      },
    }
  
    const body = {
      'user':`${user.id}`,
      'question': question,
      'answer': ''

    }
    axios
      .post(`${api}/api/faqs/`, body ,config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
   
  }

  const onSubmit = e =>{
    e.preventDefault()
    postQuestion()
    setQuestion("")
  }

  return (
    <React.Fragment>
      <ProductNavSearch></ProductNavSearch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className='text-center'>FAQs</h3>
<h1>
  {  console.log("access",access)}
  </h1>
      <hr />
      <div className='questions' style={{ padding: '10vh' }}>
        {faqs.filter((item)=>item.answer!=="").map((item, i) => {
          return (
            <div key={i}>
              <p>Q{i+1}: {item.question}</p>
              <p>Ans: {item.answer}</p>
              <hr />
            </div>
          )
        })}
{isAuthenticated?
        <div style={{ display: 'flex' }}>
          <input
            type='text'
            className='form-control  shadow-none'
            placeholder='Enter Your Question Here!'
            name='email'
            value={question}
            onChange={(e) => onChange(e)}
            required
            style={{
              border: 'none',
              borderBottom: '1px solid grey  ',
              borderWidth: ' 0 0 2px',
            }}
            />{' '}
          &nbsp;
          <button type='submit' onClick={(e)=>onSubmit(e)} className='btn btn-warning'>Submit</button>
        </div>
        :<p></p>}
      </div>

      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    access: state.auth.access,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
  }
}

export default connect(mapStateToProps, {})(FAQ)
