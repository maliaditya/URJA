
import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const Purchase = () => {
  const [data , setData] = React.useState({
     columns: [],
    rows:[]
  })
 
  React.useEffect(() => {
      
  const api = process.env.REACT_APP_API_URL
   const user = JSON.parse(localStorage.getItem('user') || '[]')
  let url = `${api}/api/mysales/?member=${user.seller_account[0].member_id}`
  
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
      async function fetchData() {         
       await axios.get(url, config).then((result)=>{
        console.log('dayta', result.data)

      setData({
         columns: [
      {
        label: 'Member',
        field: 'member',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Product',
        field: 'product',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Created ',
        field: 'get_created_at',
        sort: 'asc',
        width: 200
      },
    
    ],
        rows:result.data})
      
    }).catch((err)=>{
      console.log(err)
    })
}fetchData()
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

export default Purchase;

