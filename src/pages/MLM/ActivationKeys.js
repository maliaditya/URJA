import React from 'react'
import axios from 'axios'
const ActivationKeys = () => {
      const [data, setData] = React.useState([])

      React.useEffect(() => {
        const api = process.env.REACT_APP_API_URL
        const user = JSON.parse(localStorage.getItem('user') || '[]')
        let url = `${api}/api/assign-key/?member=${user.seller_account[0].member_id}`

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
              console.log('result.dataresult.data', result.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        fetchData()
      }, [])

   
    return (
      <div >
        <br/>
      <h4>Your Activation Keys will Appear Here!</h4>
      <hr/>
      {data.map((item, index) =>{
        return <div key={index}>{index+1}) &nbsp;{item.activation_key}<hr/></div>
      })}
      </div>
    )
}

export default ActivationKeys
