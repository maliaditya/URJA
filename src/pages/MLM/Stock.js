

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
            width: 270,
          },
          {
            label: 'Product Type',
            field: 'product_type',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Ordered',
            field: 'quantity',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Delivered',
            field: 'delivered',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Undelivered',
            field: 'undelivered',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Generated',
            field: 'generated',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Transfer In',
            field: 'transfer_in',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Transfer Out',
            field: 'transfer_out',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Sold',
            field: 'sold',
            sort: 'asc',
            width: 200,
          },
          {
            label: 'Stock',
            field: 'stock',
            sort: 'asc',
            width: 200,
          },
        ],
        rows: result.data,
      })
      
    }).catch((err)=>{
      console.log(err)
    })
  }
  fetchData()
},[])




  return (
    <div>
      <br/>
      <h4>My Stock</h4>
      <hr/>
    <MDBDataTable className='mt-3'
      responsive
      bordered
      small
      entriesLabel
      dark
      data={data}
      />
      </div>
  );
}

const mapStateToProps = (state) => ({
  user: JSON.parse(localStorage.getItem('user') || '[]'),
})

export default connect(mapStateToProps, { })(Stock)

