import axios from 'axios'
import React from 'react'
import { MDBDataTable } from 'mdbreact'
const AndroidKey = () => {

    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const sellerDetails = user.seller_account[0]
    const api = process.env.REACT_APP_API_URL
    const config = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('access')}`,
      "Accept": 'application/json',
      }
const [data, setData] = React.useState({
  columns: [],
  rows: [],
})
const [count, setcount] = React.useState(0)



React.useEffect(
  () => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/activation/key/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json'
      },
    }
    async function fetchData() {
      await axios
        .get(url, config)
        .then((result) => {
          setData({
            columns: [
              {
                label: 'Activation_key',
                field: 'activation_key',
                sort: 'asc',
                width: 150,
              },
            ],
            rows: result.data.filter((item) => item.is_active === false),
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps

  []
)


  
    const generateKeys=()=>{
      axios.post(`${api}/api/activation/key/`, 
      {
        "allocated_to": sellerDetails.member_id
      },config
      ).then((response)=>{alert("Key generated successfully")}).catch((err)=>alert("Key generated Failed"))
      setcount(count+1)
    }
  return (
    <div>
      <br/>
      <h4>Android Keys</h4>
      <hr/>
      <button className='btn btn-primary' onClick={generateKeys}>
        Generate Keys 
      </button>
      <hr />
      <MDBDataTable
        className='mt-3'
        responsive
        bordered
        small
        entriesLabel
        dark
        data={data}
      />
    </div>
  )
}

export default AndroidKey