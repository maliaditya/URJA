import React from 'react'
import Tree from 'react-d3-tree';
import axios from 'axios'
const Downline = () => {
  
  const [data, setData] = React.useState({})
  const [orientation, setorientation] = React.useState('horizontal')


  const handelOrientation=(data)=>{
    setorientation(data)
  }

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const sellerDetails = user.seller_account[0]
    const member_id = sellerDetails.member_id
    const api = process.env.REACT_APP_API_URL
    let isMounted = true
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // ''Authorization'': `Bearer ${access}`
      },
    }
    axios
      .get(`${api}/api/downline/?member=${member_id}`, config)
      .then((res) => {
        console.log('Mydaasdta',res)
        if (isMounted) 
          setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      isMounted = false
    }
  }, [])



    return (
            <div    id="treeWrapper" style={{width: '100%', height: '100vh',fontSize:'1rem'}}>
            {
              orientation==='horizontal'?
              <button onClick={()=>handelOrientation('vertical')}>{orientation}</button>:
              <button onClick={()=>handelOrientation('horizontal')}>{orientation}</button>
            }
                    <Tree style={{padding:'10rem',fontSize:'1rem'}}  initialDepth='5000' depthFactor='200' orientation={orientation} data={data} />
                  
                </div>
          
    );
}

export default Downline
