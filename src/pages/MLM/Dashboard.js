import React from 'react'
import axios from 'axios'
import { checkAuthenticated, load_user } from '../../actions/auth'
import { connect } from 'react-redux'
const Dashboard = (checkAuthenticated, load_user, user) => {
  const [data, setData] = React.useState({})
  user = JSON.parse(localStorage.getItem('user') || '[]')
  const sellerDetails = user.seller_account[0]
  React.useEffect(() => {
    const api = process.env.REACT_APP_API_URL
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const sellerDetails = user.seller_account[0]
    let isMounted = true
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // ''Authorization'': `Bearer ${access}`
      },
    }

    if (sellerDetails.active_seller[0].is_active && !sellerDetails.is_admin) {
      let url = `${api}/api/count/`
      axios
        .get(url, config)
        .then((res) => {
          console.log(res.data)
          if (isMounted) setData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (
      !sellerDetails.active_seller[0].is_active &&
      sellerDetails.is_admin
    ) {
      let url = `${api}/api/count/`
      axios
        .get(url, config)
        .then((res) => {
          console.log(res.data)
          if (isMounted) setData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return () => {
      isMounted = false
    }
  }, [])
  if (!sellerDetails.active_seller[0].is_active && sellerDetails.is_admin) {
    return (
      <div className='col-md-12 mt-5 ml-1'>
        <div className='container' style={{ padding: '0px 0px 19px 0px' }}>
          <h4>Dashboard</h4>
          <hr />
          <div className='row'>
            <div
              className='card col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Total Members
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#4285F4',
                  fontWeight: 'bold',
                }}
              >
                {data.members}
              </h1>
            </div>
            <div
              className='card  col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Active Members
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#ffbb00',
                  fontWeight: 'bold',
                }}
              >
                {data.active_members}
              </h1>
            </div>

            <div
              className='card  col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Sellers
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#EA4335',
                  fontWeight: 'bold',
                }}
              >
                {data.sellers}
              </h1>
            </div>

            <div
              className='card  col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Distributers
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#7cbb00',
                  fontWeight: 'bold',
                }}
              >
                {data.distributers}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //seller Dashboard

  if (sellerDetails.active_seller[0].is_active && !sellerDetails.is_admin) {
    return (
      <div className='col-md-12 mt-5 ml-1'>
        <div className='container' style={{ padding: '0px 0px 19px 0px' }}>
          <h4>Dashboard</h4>
          <hr />
          <div className='row'>
            <div
              className='card col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Bonus Points
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#4285F4',
                  fontWeight: 'bold',
                }}
              >
                {data.members}
              </h1>
            </div>
            <div
              className='card  col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Total sales
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#ffbb00',
                  fontWeight: 'bold',
                }}
              >
                {data.active_members}
              </h1>
            </div>

            <div
              className='card  col-md-3'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                paddingTop: '2%',
                paddingBottom: '2%',
                paddingLeft: '2%',
                margin: '2%',
                borderRadius: '5px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                Total Team
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#EA4335',
                  fontWeight: 'bold',
                }}
              >
                {data.sellers}
              </h1>
            </div>

            
          </div>
          <hr />
          <br />
          <div
            className='container-fluid'
            style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              paddingTop: '2%',
              paddingBottom: '2%',
              paddingLeft: '2%',
              // margin: '%',
              borderRadius: '5px',
            }}
          >
            <h3>Yahoo your are now elegible to be an introducer !</h3>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentItem: state.auth.currentItem,
    access: state.auth.access,
    user: state.auth.user,
    itemSearchedCategoryWiseResult: state.auth.itemSearchedCategoryWiseResult,
    searchKeyword: state.auth.searchKeyword,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  Dashboard
)
