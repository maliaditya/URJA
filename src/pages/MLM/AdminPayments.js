import React from 'react'
import axios from 'axios'
const AdminPayments = () => {
  const [data, setData] = React.useState([])
  const [delivery, setDelivery] = React.useState(false)
  const [order, setOrder] = React.useState([])
  let productsDelivery = []
  const [orderDetaildata, setOrderdetailsData] = React.useState({
    name: '',
    orderno: '',
    createddate: '',
    amount: '',
  })

  const Orderdetails = (name, orderno, createddate, amount) => {
    setOrderdetailsData({
      name: name,
      orderno: orderno,
      createddate: createddate,
      amount: amount,
    })
  }

  const handleQuantity = (item, e) => {
    if (
      parseInt(e.target.value) >
      parseInt(item.quantity) - parseInt(item.quantity_delivered)
    ) {
      alert('Invalid Delivery Input')
    } else {
      var obj = {}
      if (!productsDelivery.length) {
        obj['id'] = item.id
        obj['quantity_delivered'] =
          parseInt(e.target.value) + parseInt(item.quantity_delivered)
        productsDelivery.push(obj)
      } else {
        productsDelivery = productsDelivery.filter(function (obj) {
          return obj.id !== item.id
        })
        obj['id'] = item.id
        obj['quantity_delivered'] =
          parseInt(e.target.value) + parseInt(item.quantity_delivered)
        productsDelivery.push(obj)
      }
    }
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

  const handleClickDelivery = async (order_no, name, createddate, amount) => {
    setDelivery(true)
    Orderdetails(name, order_no, createddate, amount)
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/order/${order_no}/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    await axios
      .get(url, config)
      .then((result) => {
        setOrder(result.data.order_detail)
        console.log('my order', order)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = () => {
    let deliveryStatus = true
    console.log('productsDelivery', productsDelivery)
    productsDelivery.map(async (item) => {
      if (parseInt(item.quantity) - parseInt(item.quantity_delivered) !== 0) {
        deliveryStatus = false
      }
      const api = process.env.REACT_APP_API_URL
      let url = `${api}/api/order-details/${item.id}/`
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      }
      const body = {
        quantity_delivered: item.quantity_delivered,
      }
      await axios
        .patch(url, body, config)
        .then((result) => {
          console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    alert('Product Delivered Successfully')
    fetchData()

    console.log(productsDelivery)

    handleClickDelivery(
      orderDetaildata.orderno,
      orderDetaildata.name,
      orderDetaildata.createddate,
      orderDetaildata.amount
    )
    if (deliveryStatus) {
      const orderbody = {
        is_paid: true,
        status: 'Completed',
        delivery: 'Delivered',
      }
      axios
        .patch(
          `${api}/api/order/${orderDetaildata.orderno}/`,
          orderbody,
          config
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const orderbody = {
        is_paid: true,
        status: 'Incomplete',
        delivery: 'Partial Delivery',
      }
      axios
        .patch(
          `${api}/api/order/${orderDetaildata.orderno}/`,
          orderbody,
          config
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
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

  if (delivery) {
    return (
      <div>
        <br />
        <p style={{ margin: '0px' }}>Sales person : {orderDetaildata.name}</p>
        <p style={{ margin: '0px' }}>
          Order number : {orderDetaildata.orderno}{' '}
        </p>
        <p style={{ margin: '0px' }}> Date : {orderDetaildata.createddate} </p>
        <p style={{ margin: '0px' }}> Amount : {orderDetaildata.amount}</p>
        <div>
          <br />
          <h4>orginal orders</h4>
          <hr />
          <table class='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Product</th>
                <th scope='col'>Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Oty delivered</th>
                <th scope='col'>Oty undelivered</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity_delivered}</td>
                    <td>{item.quantity - item.quantity_delivered}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <h4>Pending orders</h4>
        <br />
        <table>
          <tbody>
            <tr>
              <th>
                <h6 style={{ marginRight: '30vh', fontWeight: '700' }}>
                  Product
                </h6>
              </th>

              <th>
                <h6 style={{ fontWeight: '700' }}>Quantity</h6>
              </th>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            {order.map((item, index) => {
              return item.quantity - item.quantity_delivered !== 0 ? (
                <tr className='mt-2'>
                  <td>{item.product}</td>
                  <td>
                    <input
                      type='number'
                      name='quantity'
                      // onClick={this.handleClick}
                      min='0'
                      onChange={(e) => handleQuantity(item, e)}
                    />
                  </td>
                </tr>
              ) : (
                ''
              )
            })}
          </tbody>
        </table>
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
          onClick={() => setDelivery(false)}
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
      <h2>admin payments</h2>
    
      <hr />
      <table class='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Member</th>
            <th scope='col'>Payment</th>
            <th scope='col'>Date</th>
            <th scope='col'>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return  (
              <tr key={index}>
                <td>{item.member}</td>
                <td>{item.payment}</td>
                <td>{item.get_updated_at}</td>
                <td>{item.description}</td>
              </tr>
            ) 
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPayments
