import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const MyOrders = () => {
  const [data , setData] = React.useState({
     columns: [],
    rows:[]
  })
 
  React.useEffect(() => {
    
  const api = process.env.REACT_APP_API_URL
  const user = JSON.parse(localStorage.getItem('user') || '[]')
  let url =`${api}/api/order/?member=${user.seller_account[0].member_id}`
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
        label: 'Order No',
        field: 'order_no',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Ordered From',
        field: 'ordered_from',
        sort: 'asc',
        width: 150
      },
     {
        label: 'Products Ordered',
        field: 'order_detail',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Paid ',
        field: 'is_paid',
        sort: 'asc',
        width: 200
      },  {
        label: 'Order Created',
        field: 'get_created_at',
        sort: 'asc',
        width: 200
      },
       {
        label: 'Total',
        field: 'total_amount',
        sort: 'asc',
        width: 270
      },
    
    ],
        rows:result.data.results})
      
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

export default MyOrders;

