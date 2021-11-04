import React from 'react'
import axios from 'axios'
const AdminPendingPayouts = () => {
  const [data, setData] = React.useState([])
  const [makePayment, setMakePayment] = React.useState(false)
  const [amount, setamount] = React.useState()
  const [details, setdetails] = React.useState()
  let productsDelivery = []
  const [orderDetaildata, setOrderdetailsData] = React.useState({
    id: '',
    name: '',
    payout: '',
    payment: '',
    balance: '',
  })

  const Orderdetails = (id, name, payout, payment, balance) => {
    setOrderdetailsData({
      id: id,
      name: name,
      payout: payout,
      payment: payment,
      balance: balance,
    })
  }

  const api = process.env.REACT_APP_API_URL
  let url = `${api}/api/payout/`
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

  const handleMakePayment = async (item) => {
    setMakePayment(true)
    Orderdetails(
      item.id,
      item.member,
      item.payout,
      item.payment,
      item.payout - item.payment
    )
  }

  const onSubmit = async () => {
    console.log('productsDelivery', productsDelivery)

    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/payout/${orderDetaildata.id}/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    const body = {
      payment: amount,
      description: details,
      declared: true,
    }
    await axios
      .patch(url, body, config)
      .then((result) => {
        console.log(result.data)
        alert('payment successful')
        setOrderdetailsData(...{ payment: amount })
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/payout/`
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

  if (makePayment) {
    return (
      <div>
        <br />
        <p style={{ margin: '0px' }}>Customer : {orderDetaildata.name}</p>
        <p style={{ margin: '0px' }}>Payout : {orderDetaildata.payout} </p>
        <p style={{ margin: '0px' }}> Payment : {orderDetaildata.payment} </p>
        <p style={{ margin: '0px' }}> Balance : {orderDetaildata.balance}</p>
        <br />
        <hr />
        <br />
        {orderDetaildata.balance !== 0 ? (
          <div>
            <h4>Make Payment</h4>
            <table>
              <tbody>
                <tr>
                  <th>
                    <h6 style={{ marginRight: '30vh', fontWeight: '700' }}>
                      &nbsp;{' '}
                    </h6>
                  </th>

                  <th>
                    <h6 style={{ fontWeight: '700' }}>&nbsp; </h6>
                  </th>
                </tr>

                <tr className='mt-2'>
                  <td>Amount</td>
                  <td>
                    <input
                      type='number'
                      name='quantity'
                      min='0'
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Payment details</td>
                  <td>
                    <input
                      type='textbox'
                      name='quantity'
                      min='0'
                      value={details}
                      onChange={(e) => setdetails(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
        <br />
        <button
          type='submit'
          className='btn btn-primary'
          onClick={() => onSubmit()}
        >
          {' '}
          Submit
        </button>
        &nbsp; &nbsp; &nbsp;
        <button
          className='btn btn-secondary'
          onClick={() => setMakePayment(false)}
        >
          {' '}
          back
        </button>
      </div>
    )
  }
  return (
    <div>
      <br />
      <h2>admin pending payouts</h2>
      <hr />
      <table class='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>member</th>
            <th scope='col'>payout</th>
            <th scope='col'>payment</th>
            <th scope='col'>balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return !item.declared ? (
              <tr key={index}>
                <td>{item.member}</td>
                <td>{item.payout}</td>
                <td>{item.payment}</td>
                <td>{item.payout - item.payment}</td>
                <td>
                  <a href='#!' onClick={() => handleMakePayment(item)}>
                    Make a payment
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
  )
}

export default AdminPendingPayouts
