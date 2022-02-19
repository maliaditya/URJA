import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
const Ledger = () => {
  const [data, setData] = React.useState([])
  const [total, settotal] = React.useState({
      payout: 0,
      payment: 0,
    })
  // const [payoutDeclaringDate, setPayoutDeclaringDate] = React.useState('')
  const clubed_payouts = (array) => {
    //variable declarations
    setData([{}])
    let payout_data = []
    let obj = {}
    for (let i = 0; i < array.length; i++) {
      if (
        payout_data.find(
          (o) =>
            o.get_created_at === array[i].get_created_at
        )
      ) {
        continue
      } else {
        obj = {
          member: array[i].member,
          points: 0,
          tds: 0,
          std_deduction: 0,
          payout: 0,
          payment: 0,
          declared: array[i].declared,
          get_created_at: array[i].get_created_at,
          get_updated_at: array[i].get_updated_at,
          created_at: array[i].created_at,
        }
        payout_data.push(obj)
      }
    }

    //code
    for (let i = 0; i < array.length; i++) {
      if (
        payout_data.find((o) => o.get_created_at === array[i].get_created_at)
      ) {
        obj = payout_data.find(
          (o) => o.get_created_at === array[i].get_created_at
        )
        obj.points += parseFloat(array[i].points)
        obj.payment = parseFloat(obj.payment) + parseFloat(array[i].payment)
        obj.payout += parseFloat(array[i].payout)
        obj.std_deduction =
          parseFloat(obj.std_deduction) + parseFloat(array[i].std_deduction)
        obj.tds = parseFloat(obj.tds) + parseFloat(array[i].tds)
      }
     
    }
    
    setData(payout_data)
    console.log("sads",payout_data,"asdsad",data)
      let payment = 0
      let payout = 0
      for (let i = 0; i < payout_data.length; i++) {
        payment += parseFloat(payout_data[i].payment)
        payout += parseFloat(payout_data[i].payout)
      }
    settotal({
        payout: payout,
        payment: payment,
    })

  }

 
  function refreshPage() {

    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/payout/?member=${user.seller_account[0].member_id}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
     async function fetchData() {
       await axios
         .get(url, config)
         .then((result) => {
           clubed_payouts(result.data)
         })
         .catch((err) => {
           console.log(err)
         })
       await axios
         .get(url, config)
         .then((result) => {
          //  const res = result.data
         })
         .catch((err) => {
           console.log(err)
         })
     }
    fetchData()
  }
  

  React.useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem('user') || '[]')
      const api = process.env.REACT_APP_API_URL
          let url = `${api}/api/payout/?member=${user.seller_account[0].member_id}`

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      }
      async function fetchData() {
        await axios
          .get(url, config)
          .then((result) => {
                clubed_payouts(
                  result.data.filter((item) => item.declared === true)
                )
          })
          .catch((err) => {
            console.log(err)
          })
        await axios
          .get(url, config)
          .then((result) => {
            // const res = result.data
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

  return (
    <div>
      <br />

      <div>
        <h4 onClick={() => refreshPage()}>Ledger</h4>
        <hr />
        <table className='table table-striped'>
          <thead>
            <tr>
              {/* <th scope='col'>Points</th>
                <th scope='col'>TDS</th>
                <th scope='col'>STD Deduction</th> */}
              <th scope='col'>Payout Date</th>
              <th scope='col'>Payout</th>
              <th scope='col'>Payment Date</th>
              <th scope='col'>Payment</th>
              <th scope='col'>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return item.declared ? (
                <tr key={index}>
                  <td>{item.get_created_at}</td>
                  <td>{Math.round(item.payout)}</td>
                  <td>{item.get_updated_at}</td>
                  <td>{Math.round(item.payment)}</td>
                  <td>{Math.round(item.payout) - Math.round(item.payment)}</td>
                </tr>
              ) : (
                ''
              )
            })}
            <tr style={{ fontSize: '1.2rem' }}>
              <td>Total</td>
              <td>{Math.round(total.payout)}</td>
              <td>&nbsp;</td>
              <td>{Math.round(total.payment)}</td>
              <td>&nbsp;{Math.round(total.payout - total.payment)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: JSON.parse(localStorage.getItem('user') || '[]'),
})

export default connect(mapStateToProps, { })(Ledger)
