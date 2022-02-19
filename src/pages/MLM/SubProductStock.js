import React, { useState } from 'react'
import axios from 'axios'
const SubProductStock = () => {
  const [data, setData] = React.useState([])
  const [userBool, setUserBool] = React.useState(true)
  const [userID, setUserID] = React.useState('')
  const api = process.env.REACT_APP_API_URL
  const [userName, setUserName] = useState('')
  const user = JSON.parse(localStorage.getItem('user') || '[]')
  const sellerDetails = user.seller_account[0]
  const config = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
    Accept: 'application/json',
  }
  const [count, setcount] = React.useState(0)

  const getQuantity = (arr) => {
    let quantity = 0
    for (let i = 0; i < arr.length; i++) {
      quantity = quantity + parseInt(arr[i].quantity)
    }
    return quantity
  }

  let url = `${api}/api/sub-product-stock/?member=${user.seller_account[0].member_id}`

  async function fetchData() {
    await axios
      .get(url, config)
      .then((result) => {
        setData(getQuantity(result.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    let url = `${api}/api/sub-product-stock/?member=${user.seller_account[0].member_id}`
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
          setData(getQuantity(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [])
  const handleChange = (e) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }

    setUserName(e.target.value)
    if (userBool) {
      let url = `${api}/api/name/?member=${e.target.value}`
      axios
        .get(url, config)
        .then((res) => {
          setUserName(res.data.member_name)
          setUserID(res.data.member_id)
          setUserBool(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const generateKeys = () => {
    const body = {
      is_active: false,
      allocated_to: userID,
      allocated_by: sellerDetails.member_id,
    }
    console.log(body)

    axios
      .post(`${api}/api/assign-key/`, body, config)
      .then((response) => {
        alert('Key Assigned successfully')
        clearForm()
        fetchData()
      })
      .catch((error) => {
        alert(error)
        alert('Key Assigned Failed')
      })
    setcount(count + 1)
  }

  const clearForm = () => {
    if (!userBool) {
      setUserName('')
      setUserID('')
      setUserBool(true)
    }
  }
  if (sellerDetails.is_admin) {
    return (
      <div>
        <br />
        <h4>Assign Activaion Key</h4>
        <hr />

        <div>
          <div className=' ml-1 mb-2'>
            <label className='form-label'> Sponser Id * </label>
            {userBool ? (
              <input
                style={{ width: '40vh' }}
                type='text'
                className='form-control'
                placeholder='Eg: URJA8BE073'
                id='name'
                value={userName}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                style={{ width: '40vh' }}
                type='text'
                className='form-control'
                placeholder='Eg: URJA8BE073'
                id='name'
                disabled
                value={userName}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <button onClick={generateKeys} className='btn btn-primary mt-1 ml-1'>
            Assign Key
          </button>
          <button onClick={clearForm} className='btn btn-secondary mt-1 ml-1'>
            clear
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <br />
      <h4>Sub Product Stock : {data}</h4>
      <hr />
      {data > 0 ? (
        <div>
          <div className=' ml-1 mb-2'>
            <label className='form-label'> User Id * </label>
            {userBool ? (
              <input
                style={{ width: '40vh' }}
                type='text'
                className='form-control'
                placeholder='Eg: URJA8BE073'
                id='name'
                autoComplete='off'
                value={userName}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                style={{ width: '40vh' }}
                type='text'
                className='form-control'
                placeholder='Eg: URJA8BE073'
                id='name'
                disabled
                autoComplete='off'
                value={userName}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <button onClick={generateKeys} className='btn btn-primary mt-1 ml-1'>
            Assign Key
          </button>
          <button onClick={clearForm} className='btn btn-secondary mt-1 ml-1'>
            clear
          </button>
        </div>
      ) : (
        <div>
          <h1>no products in stocks</h1>
        </div>
      )}
    </div>
  )
}

export default SubProductStock
