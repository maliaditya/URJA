import React from 'react'
import axios from 'axios'
const AdminOrders = () => {
  const [data, setData] = React.useState([])
  const [delivery, setDelivery] = React.useState(false)
  const [order, setOrder] = React.useState([])
  let productsDelivery = []
  const [orderDetaildata, setOrderdetailsData] = React.useState({
    name: '',
    orderno: '',
    createddate: '',
    amount: '',
    is_paid: '',
  })

  const Orderdetails = (name, orderno, createddate, amount, is_paid) => {
    console.log(name, orderno, createddate, amount, is_paid)
    setOrderdetailsData({
      name: name,
      orderno: orderno,
      createddate: createddate,
      amount: amount,
      is_paid: is_paid,
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
        obj['quantity'] = item.quantity
        obj['quantity_delivered'] =
          parseInt(e.target.value) + parseInt(item.quantity_delivered)
        productsDelivery.push(obj)
      } else {
        productsDelivery = productsDelivery.filter(function (obj) {
          return obj.id !== item.id
        })
        obj['id'] = item.id
        obj['quantity'] = item.quantity
        obj['quantity_delivered'] =
          parseInt(e.target.value) + parseInt(item.quantity_delivered)
        productsDelivery.push(obj)
      }
    }
  }

  const api = process.env.REACT_APP_API_URL
  let url = `${api}/api/order/`
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
        setData(result.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickDelivery = async (
    order_no,
    name,
    createddate,
    amount,
    is_paid
  ) => {
    setDelivery(true)
    Orderdetails(name, order_no, createddate, amount, is_paid)
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
        console.log(
          'in if',
          parseInt(item.quantity),
          parseInt(item.quantity_delivered)
        )
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
          alert('Product Delivered Successfully')
        })
        .catch((err) => {
          console.log(err)
          alert('Product Delivery Failed...!')
        })
    })

    handleClickDelivery(
      orderDetaildata.orderno,
      orderDetaildata.name,
      orderDetaildata.createddate,
      orderDetaildata.amount,
      orderDetaildata.is_paid
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

  const handleClick = async (id) => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/order/${id}/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    const body = {
      is_paid: true,
    }
    await axios
      .patch(url, body, config)
      .then((result) => {
        console.log(result.data)
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })

    const orderbody = {
      is_paid: true,
      status: 'In Process',
      delivery: 'No Delivery Yet',
    }
    axios
      .patch(`${api}/api/order/${id}/`, orderbody, config)
      .then((res) => {
        console.log(res)
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/order/`
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
          setData(result.data.results)
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
        <p style={{ margin: '0px' }}>
          User: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{' '}
          {orderDetaildata.name}
        </p>
        <p style={{ margin: '0px' }}>
          Order No&nbsp;: &nbsp; {orderDetaildata.orderno}{' '}
        </p>
        <p style={{ margin: '0px' }}>
          {' '}
          Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;:&nbsp;{' '}
          {orderDetaildata.createddate}{' '}
        </p>
        <p style={{ margin: '0px' }}>
          {' '}
          Amount&nbsp;&nbsp; :&nbsp; {orderDetaildata.amount}
        </p>
        <p style={{ margin: '0px' }}>
          {' '}
          Paid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;{' '}
          {orderDetaildata.is_paid}
        </p>
        <div>
          <br />
          <h4>orginal orders</h4>
          <hr />
          <table className='table table-striped'>
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
        {orderDetaildata.is_paid === 'Yes' ? (
          <div>
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
        ) : (
          <button
            className='btn btn-secondary'
            onClick={() => setDelivery(false)}
          >
            {' '}
            back
          </button>
        )}
      </div>
    )
  }
  return (
    <div>
      <br />
      <h2>admin orders</h2>
      <hr />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Order No</th>
            <th scope='col'>Ordered By</th>
            <th scope='col'>Total Amount</th>
            <th scope='col'>Is Paid</th>
            <th scope='col'>Get Created_at</th>
            <th scope='col'>Order Detail</th>
            <th scope='col'>Status</th>
            <th scope='col'>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (item) =>
                item.delivery !== 'Transfered' && item.delivery !== 'Generated'
            )
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.order_no}</td>
                  <td>{item.orded_by}</td>
                  <td>{item.total_amount}</td>
                  <td>
                    {item.is_paid === 'No' ? (
                      <div>
                        {item.is_paid} &nbsp;
                        <a href='#!' onClick={() => handleClick(item.order_no)}>
                          Mark as paid
                        </a>
                      </div>
                    ) : (
                      'Yes'
                    )}
                  </td>
                  <td>{item.get_created_at}</td>
                  <td>{item.order_detail}</td>
                  <td>{item.status}</td>
                  <td>
                    <div>
                      {' '}
                      {item.delivery}
                      <a
                        href='#!'
                        onClick={() =>
                          handleClickDelivery(
                            item.order_no,
                            item.orded_by,
                            item.get_created_at,
                            item.total_amount,
                            item.is_paid
                          )
                        }
                      >
                        <br />
                        Show
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders
