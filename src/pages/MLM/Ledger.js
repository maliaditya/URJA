import React from 'react'
import axios from 'axios'
const Ledger = () => {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
  const api = process.env.REACT_APP_API_URL
  const user = JSON.parse(localStorage.getItem('user') || '[]')
  let url =`${api}/api/payout/?member=${user.seller_account[0].member_id}`
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
          setData(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [])

  return (
    <div>
      <br />
      <h2>Ledger</h2>
      <hr />
      <table class='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Member</th>
            <th scope='col'>Payout</th>
            <th scope='col'>Payment</th>
            <th scope='col'>Payout Date</th>
            <th scope='col'>Payment Date</th>
            <th scope='col'>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return item.declared ? (
              <tr key={index}>
                <td>{item.member}</td>
                <td>{item.payout}</td>
                <td>{item.payment}</td>
                <td>{item.get_updated_at}</td>
                <td>{item.get_created_at}</td>
                <td>{item.description}</td>
              </tr>
            ) : (
              ''
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Ledger
