import React from 'react'
import axios from 'axios'
const IntroducersRequest = () => {
  const [viewInfo, setViewInfo] = React.useState(false)
  const [data, setData] = React.useState([])
  const [introducer, setIntroducer] = React.useState({})
  const [distributer, setDistributer] = React.useState({})

  const handleInfo = (item) => {
    console.log(item)
    const api = process.env.REACT_APP_API_URL
    let introducerurl = `${api}/auth/users/${item.introducer.user}/`
    let distributerurl = `${api}/auth/users/${item.distributer.user}/`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }
    axios
      .get(introducerurl, config)
      .then((result) => {
        setIntroducer(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(distributerurl, config)
      .then((result) => {
        setDistributer(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
    setViewInfo(true)
  }

  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    let url = `${api}/api/introducer/`
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
        setData(result.data)
        console.log('result', result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (viewInfo) {
    return (
      <div className='mt-5'>
        <h2> introducer and distributer info</h2>
        <br />
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <div
                className='container'
                style={{
                  border: '1px solid grey',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f1f1f1',
                }}
              >
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                  Introducer
                </p>
                <div className='ml-3 mb-2'>
                  <h4>
                    Name: {introducer.first_name} &nbsp;
                    {introducer.last_name}
                  </h4>
                  <h4>email: {introducer.email}</h4>
                  <h4>phone no: {introducer.phone}</h4>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div
                className='container'
                style={{
                  border: '1px solid grey',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f1f1f1',
                }}
              >
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                  Distributer
                </p>
                <div className='ml-3 mb-2'>
                  <h4>
                    Name: {distributer.first_name} &nbsp;
                    {distributer.last_name}
                  </h4>
                  <h4>email: {distributer.email}</h4>
                  <h4>phone no:{distributer.phone}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <button className='btn btn-primary '>Approve</button>&nbsp;&nbsp;
          <button
            className='btn btn-secondary'
            onClick={() => setViewInfo(false)}
          >
            back
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className='mt-5'>
      <h4>Introducers Request</h4>
      <hr />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Introdroducer</th>
            <th scope='col'>Ditributer</th>
            <th scope='col'>Pin_code</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.introducer.member_id}</td>
                <td>{item.distributer.member_id}</td>
                <td>{item.distributer.pin_code}</td>
                <td>
                  <button
                    className='btn btn-info'
                    onClick={() => handleInfo(item)}
                  >
                    {' '}
                    view info
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default IntroducersRequest
