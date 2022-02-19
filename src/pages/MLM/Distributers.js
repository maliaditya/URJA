import React from 'react'
import axios from 'axios'

const Distributers = () => {
  const [Distributers, setDistributers] = React.useState([])
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

    let url = `${api}/api/get_distributers/?member=${sellerDetails.member_id}`
    axios
      .get(url, config)
      .then((response) => {
        setDistributers(response.data.distributers)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <br />
      <h4>Service office</h4>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {Distributers.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.is_Active ? 'yes' : 'no'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Distributers
