// let url = `${api}/api/payout/?member=${user.seller_account[0].member_id}`
import React from 'react';
// import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import axios from 'axios';
const Payouts = () => {
  const [data, setData] = React.useState([])
  const [arrayData, setArrayData] = React.useState([])
  const [breakOut, setBreakOut] = React.useState(false)
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
        obj.std_deduction = array[i].std_deduction
        obj.tds = array[i].tds
      }
      //               else {
      //                   obj = {
      //                     member: array[i].member,
      //                     points: parseInt(array[i].points),
      //                     tds: array[i].tds,
      //                     std_deduction: array[i].std_deduction,
      //                     payout: parseInt(array[i].payout),
      //                     payment: array[i].payment,
      //                     declared: array[i].declared,
      //                   }
      //                   payout_data.push(obj)
      //                   console.log('arary i = ', i, array[i].points)
      //                   console.log('payout_data', payout_data)
      // }
    }
    console.log('payout_data',payout_data)
    setData(payout_data)
  }

  const payout_break = (date, dateWithTimeZone) => {
    setData([])
    // setPayoutDeclaringDate(dateWithTimeZone.split('T')[0])
    setBreakOut(true)
    setData(arrayData.filter((item) => item.get_created_at === date))
  }
  function refreshPage() {
    setBreakOut(false)

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
           const res = result.data
           setArrayData(res)
         })
         .catch((err) => {
           console.log(err)
         })
     }
    fetchData()
  }
  
// const declare_payout =()=>{
//   const api = process.env.REACT_APP_API_URL
//   let url = `${api}/api/payout/dclr_pending_pyt/?date=${payoutDeclaringDate}`

//      const config = {
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${localStorage.getItem('access')}`,
//          Accept: 'application/json',
//        },
//      }
//     axios.patch(url, config).then((result)=>{
//       alert("Payout declared successfully")
//       refreshPage()
//     }).catch((err)=>alert("Payout declare Failed"))
// }
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
            const res = result.data
            setArrayData(res)
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
    // <MDBDataTable className='mt-3'
    //   responsive
    //   bordered
    //   small
    //   entriesLabel
    //   dark
    //   data={data}
    // />
    <div>
      <br />

      {!breakOut ? (
        <div>
          <h4 onClick={() => refreshPage()}>Payout</h4>
          <hr />
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Points</th>
                <th scope='col'>TDS</th>
                <th scope='col'>STD Deduction</th>
                <th scope='col'>Payout</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return item.declared ? (
                  <tr key={index}>
                    <td>{item.points}</td>
                    <td>{item.tds}</td>
                    <td>{item.std_deduction}</td>
                    <td>{Math.round(item.payout)}</td>
                    <td>
                      <a
                        href='#!'
                        onClick={() =>
                          payout_break(item.get_created_at, item.created_at)
                        }
                      >
                        {item.get_created_at}
                      </a>
                    </td>
                  </tr>
                ) : (
                  ''
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => refreshPage()}
          >
            Back
          </button> &nbsp;&nbsp;
          {/* <button
            type='button'
            className='btn btn-info'
            onClick={() => declare_payout()}
          >
            Declare ALL
          </button> */}
          <hr />
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'> Member</th>
                <th scope='col'>Points</th>
                <th scope='col'>TDS</th>
                <th scope='col'>STD Deduction</th>
                <th scope='col'>Payout</th>
                <th scope='col'>Type</th>
                <th scope='col'>From Membenpm r</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return item.declared ? (
                  <tr key={index}>
                    <td>{item.member}</td>
                    <td>{item.points}</td>
                    <td>{item.tds}</td>
                    <td>{item.std_deduction}</td>
                    <td>{item.payout}</td>
                    <td>{item.type}</td>
                    <td>{item.from_member}</td>
                    <td>
                      <a
                        href='#!'
                        onClick={() =>
                          payout_break(item.get_created_at, item.created_at)
                        }
                      >
                        {item.get_created_at}
                      </a>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>{item.member}</td>
                    <td>{item.points}</td>
                    <td>{item.tds}</td>
                    <td>{item.std_deduction}</td>
                    <td>{item.payout}</td>
                    <td>{item.type}</td>
                    <td>{item.from_member}</td>
                    <td>
                      <a
                        href='#!'
                        onClick={() =>
                          payout_break(item.get_created_at, item.created_at)
                        }
                      >
                        {item.get_created_at}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: JSON.parse(localStorage.getItem('user') || '[]'),
})

export default connect(mapStateToProps, { })(Payouts)





