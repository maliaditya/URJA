import React from 'react'
import axios from 'axios'
import { RiShieldStarFill } from 'react-icons/ri'

const Direct = () => {
  const [myAllDirect, setMyAllDirect] = React.useState([])
  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const sellerDetails = user.seller_account[0]
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }

    let url = `${api}/api/direct_members/?user=${sellerDetails.member_id}`
    axios
      .get(url, config)
      .then((response) => {
        console.log('mydirect', response.data.my_direct)
        setMyAllDirect(response.data.my_direct)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <br />
      <h4>Direct : {myAllDirect.length}</h4>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Badge</th>
            <th scope='col'>Member Id</th>
            <th scope='col'>Name</th>
          </tr>
        </thead>
        <tbody>
          {myAllDirect.map((direct, index) => {
            return (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>
                  {' '}
                  {direct.is_active_member ? (
                    <RiShieldStarFill size='20' color='#018E42' />
                  ) : (
                    <RiShieldStarFill size='20' color='#BF1A2F' />
                  )}
                </td>
                <td>{direct.member_id}</td>
                <td>{direct.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Direct
