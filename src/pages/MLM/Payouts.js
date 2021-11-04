import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import axios from 'axios';
const Payouts = () => {
  const [data , setData] = React.useState({
     columns: [],
    rows:[]
  })
  
  React.useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || '[]')
  const api = process.env.REACT_APP_API_URL
  let url =`${api}/api/payout/?member=${user.seller_account[0].member_id}`
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
        label: 'Member',
        field: 'member',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Points',
        field: 'points',
        sort: 'asc',
        width: 270
      },{
        label: 'TDS Deduction',
        field: 'tds',
        sort: 'asc',
        width: 200
      },
      {
        label: 'STD Deduction ',
        field: 'std_deduction',
        sort: 'asc',
        width: 200
      },  {
        label: 'Payout',
        field: 'payout',
        sort: 'asc',
        width: 200
      }, {
        label: 'Created Date',
        field: 'get_created_at',
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
}
// eslint-disable-next-line react-hooks/exhaustive-deps

,[])




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

export default connect(mapStateToProps, { })(Payouts)

