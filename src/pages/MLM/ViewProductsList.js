

import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const ViewProductsList = () => {
  const [data , setData] = React.useState({
     columns: [],
    rows:[]
  })
 
  React.useEffect(() => {
    
  const api = process.env.REACT_APP_API_URL
  // const user = JSON.parse(localStorage.getItem('user') || '[]')
    let url = `${api}/api/mbw-product/`
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
        label: 'name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'description',
        field: 'description',
        sort: 'asc',
        width: 150
      },
     {
        label: 'created_by',
        field: 'created_by',
        sort: 'asc',
        width: 200
      },
      {
        label: 'is_published ',
        field: 'is_published',
        sort: 'asc',
        width: 200
      },  {
        label: 'Price',
        field: 'Price',
        sort: 'asc',
        width: 200
      },
       {
        label: 'product_type',
        field: 'product_type',
        sort: 'asc',
        width: 270
      },   {
        label: 'MRP',
        field: 'MRP',
        sort: 'asc',
        width: 270
      },
    
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

export default ViewProductsList;


