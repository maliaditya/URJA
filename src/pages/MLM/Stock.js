

import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import axios from 'axios';
const Stock = () => {
  const [data , setData] = React.useState({
     columns: [],
    rows:[]
  })
  
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
  const api = process.env.REACT_APP_API_URL
  console.log("member_id",user.seller_account[0].member_id)
  let url =`${api}/api/stock/?member=${user.seller_account[0].member_id}`
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
     async function fetchData() {    
       await axios.get(url, config).then((result)=>{
      setData({
         columns: [

      {
        label: 'Product',
        field: 'product',
        sort: 'asc',
        width: 270
      },
     
       {
        label: 'Stock',
        field: 'stock',
        sort: 'asc',
        width: 200
      }
     
    
    ],
        rows:result.data})
      
    }).catch((err)=>{
      console.log(err)
    })
  }
  fetchData()
},[])




  return (
    <MDBDataTable className='mt-3'
      responsive
      bordered
      small
      entriesLabel
      dark
      data={data}
    />
  );
}

const mapStateToProps = (state) => ({
  user: JSON.parse(localStorage.getItem('user') || '[]'),
})

export default connect(mapStateToProps, { })(Stock)

