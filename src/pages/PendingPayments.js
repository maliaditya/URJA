import React from 'react'
import axios from 'axios'
const PendingPayments = () => {
  const [data, setData] = React.useState([])
  const [makePayment, setMakePayment] = React.useState(false)
  const [amount, setamount] = React.useState()
  const [bankDetails, setBankDetails] = React.useState({})
  const [details, setDetails] = React.useState('')
  // let productsDelivery = []
  const [orderDetaildata, setOrderdetailsData] = React.useState({
    id: '',
    name: '',
    payout: '',
    payment: '',
    balance: '',
  })

  const clubed_payouts = (array) => {
    let payout_data = []
    let obj = {}
    for (let i = 0; i < array.length; i++) {
      if (
        payout_data.find(
          (o) =>
            o.member.split('(')[1].split(')')[0] ===
            array[i].member.split('(')[1].split(')')[0]
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
        }
        payout_data.push(obj)
      }
    }

    for (let i = 0; i < array.length; i++) {
      if (
        payout_data.find(
          (o) =>
            o.member.split('(')[1].split(')')[0] ===
            array[i].member.split('(')[1].split(')')[0]
        )
      ) {
        obj = payout_data.find(
          (o) =>
            o.member.split('(')[1].split(')')[0] ===
            array[i].member.split('(')[1].split(')')[0]
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
  }

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
  // let url = `${api}/api/payout/`
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('access')}`,
  //     Accept: 'application/json',
  //   },
  // }
  //  async function fetchData() {
  //    await axios
  //      .get(url, config)
  //      .then((result) => {
  //        let res = result.data
  //        clubed_payouts(res.filter((item) => item.declared === true))
  //      })
  //      .catch((err) => {
  //        console.log(err)
  //      })
  //  }

  const handleMakePayment = async (item) => {
    setMakePayment(true)
    let url = `${api}/api/bank-details/?member=${
      item.member.split('(')[1].split(')')[0]
    }`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    axios
      .get(url, config)
      .then((result) => {
        setBankDetails(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
    Orderdetails(
      item.id,
      item.member,
      item.payout,
      item.payment,
      item.payout - item.payment
    )
  }

  const onSubmit = async () => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/payout/make_payment/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    const body = {
      payment_amount: parseFloat(amount),
      description: details,
      member: `${orderDetaildata.name.split('(')[1].split(')')[0]}`,
    }
    console.log('result.databody', body)

    await axios
      .post(url, body, config)
      .then((result) => {
        console.log(result.data)
        alert('payment successfull')
        setOrderdetailsData({
          id: orderDetaildata.id,
          name: orderDetaildata.name,
          payout: orderDetaildata.payout,
          balance: parseFloat(orderDetaildata.balance) - parseFloat(amount),
          payment: parseFloat(orderDetaildata.payment) + parseFloat(amount),
        })
        // setMakePayment(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const back = () => {
    setMakePayment(false)
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/make-payments/`
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
    }
    fetchData()
  }
  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/make-payments/`
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
    }
    fetchData()
  }, [])

  if (makePayment) {
    return (
      <div>
        <br />
        <p style={{ margin: '0px' }}>Customer : {orderDetaildata.name}</p>
        <p style={{ margin: '0px' }}>
          Payout : {Math.round(orderDetaildata.payout)}{' '}
        </p>
        <p style={{ margin: '0px' }}>
          {' '}
          Payment : {Math.round(orderDetaildata.payment)}{' '}
        </p>
        <p style={{ margin: '0px' }}>
          {' '}
          Balance : {Math.round(orderDetaildata.balance)}
        </p>
        <hr />
        <p style={{ margin: '0px' }}>Bank Name : {bankDetails.bank_name}</p>
        <p style={{ margin: '0px' }}>
          {' '}
          Branch Name : {bankDetails.bank_branch}
        </p>
        <p style={{ margin: '0px' }}>
          Bank Account : {bankDetails.bank_account}
        </p>
        <p style={{ margin: '0px' }}> IFSC : {bankDetails.bank_ifsc} </p>
        <p style={{ margin: '0px' }}> UPI : {bankDetails.upi} </p>
        <hr />
        <br />
        {orderDetaildata.balance !== 0 ? (
          <div>
            <h4>Make Payment</h4>
            <table>
              <tbody>
                <tr>
                  <th>
                    <h6 style={{ marginRight: '30vh', fontWeight: '700' }}></h6>
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
                      max={orderDetaildata.balance}
                      required
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>Description</td>
                  <td>
                    <textarea
                      type='textbox'
                      name='quantity'
                      min='0'
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
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
        {amount > orderDetaildata.balance + 1 ? (
          <button
            type='submit'
            disabled
            className='btn btn-primary'
            onClick={() => onSubmit()}
          >
            {' '}
            Submit
          </button>
        ) : (
          <button
            type='submit'
            className='btn btn-primary'
            onClick={() => onSubmit()}
          >
            {' '}
            Submit
          </button>
        )}
        &nbsp; &nbsp; &nbsp;
        <button className='btn btn-secondary' onClick={() => back()}>
          {' '}
          back
        </button>
      </div>
    )
  }
  return (
    <div>
      <br />
      <h4>admin pending Payments</h4>
      <hr />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>member</th>
            <th scope='col'>payout</th>
            <th scope='col'>payment</th>
            <th scope='col'>balance</th>
          </tr>
        </thead>
        <tbody>
          {console.log('inhtml', data)}
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.member}</td>
                <td>{Math.round(item.payout)}</td>
                <td>{Math.round(item.payment)}</td>
                <td>{Math.round(item.payout - item.payment)}</td>
                <td>
                  <a href='#!' onClick={() => handleMakePayment(item)}>
                    Make a payment
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PendingPayments
