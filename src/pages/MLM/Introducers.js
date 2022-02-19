import React from 'react'
import axios from 'axios'

const Introducers = () => {
  const [Introducers, setIntroducers] = React.useState('No Introducer Alocated')
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

    let url = `${api}/api/get_introducer/?member=${sellerDetails.member_id}`
    axios
      .get(url, config)
      .then((response) => {
        setIntroducers(response.data.introducer)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <br />
      <h4>Introducer</h4>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>

            <td>{Introducers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Introducers
