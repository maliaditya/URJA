import React from 'react'
import axios from 'axios'
import { checkAuthenticated, load_user } from '../../actions/auth'
import { connect } from 'react-redux'


    // call your hook here
    
    const Dashboard = (checkAuthenticated, load_user, user) => {
      //create your forceUpdate hook
      const [userDetail , setUserDetail] = React.useState('')
      const [FetchUserDetails, setFetchUserDetails] = React.useState(false)

      const [data, setData] = React.useState({})
      user = JSON.parse(localStorage.getItem('user') || '[]')
      const [userName, setUserName] = React.useState('')
      const [userID, setUserID] = React.useState('')
      const [userBOOL, setUserBOOL] = React.useState(true)
      const sellerDetails = user.seller_account[0]
      const api = process.env.REACT_APP_API_URL
      const config = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      }

      const handleSubmit = async (e) => {
        e.preventDefault()

        const body = {
          introducer: sellerDetails.member_id,
          distributer: userID,
        }

        console.log('body', body)
        await axios
          .post(`${api}/api/introducer/`, body, config)
          .then((result) => {
            alert('Request send successfull')
          })
          .catch((err) => {
            alert(
              'The suggested member_id is invalid or already a distributer.'
            )
          })
      }

      const fetchUserDetails = async (e) => {
        setFetchUserDetails(true)
         let url = `${api}/api/member-details/?member=${userDetail}`
         axios
           .get(url, config)
           .then((res) => {
              console.log("userDetaails", res.data)
              setUserDetail(res.data)
           })
           .catch((err) => {
             console.log(err.response)
             alert(err.response.data['message'])
           })
      }
      const clearForm = () => {
        if (!userBOOL) {
          setUserName('')
          setUserID('')
          setUserBOOL(true)
        }
      }

      const onChange = (e) => {
        const api = process.env.REACT_APP_API_URL
        const config = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        }
        setUserName(e.target.value)
        if (userBOOL) {
          let url = `${api}/api/name/?member=${e.target.value}`
          axios
            .get(url, config)
            .then((res) => {
              setUserName(res.data.member_name)
              setUserID(res.data.member_id)
              setUserBOOL(false)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }

      React.useEffect(() => {
        const fetchData = async () => {
          const api = process.env.REACT_APP_API_URL
          const user = JSON.parse(localStorage.getItem('user') || '[]')
          const sellerDetails = user.seller_account[0]
          const config = {
            headers: {
              'content-type': 'appliation/json',
            },
          }

          if (!sellerDetails.is_admin) {
            let url = `${api}/api/seller_dashboard/?user=${sellerDetails.member_id}`
            console.log('selleris', sellerDetails)
            await axios
              .get(url, config)
              .then((res) => {
                console.log('sellerDetails', res.data)
                setData(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
          } else if (
            !sellerDetails.active_seller[0].is_active &&
            sellerDetails.is_admin
          ) {
            console.log('sellerDetails', sellerDetails)
            let url = `${api}/api/count/`
            await axios
              .get(url, config)
              .then((res) => {
                console.log('selleris', res.data)
                setData(res.data)
     

              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        fetchData()
      }, [])

      if (sellerDetails.is_admin) {
        return (
          <div className='col-md-12 mt-5 ml-1'>
            <div className='container' style={{ padding: '0px 0px 19px 0px' }}>
              <div className='col-md-12'>
                <div className='row'>
                  <h4>Dashboard</h4>

                  <div className='col'>
                    <input
                      type=''
                      placeholder='eg: URJA43256'
                      className='form-control'
                      value={userDetail}
                      onChange={(e) => setUserDetail(e.target.value)}
                    ></input>
                  </div>
                  <div className='col'>
                    <button
                      onClick={() => fetchUserDetails()}
                      className='btn btn-primary'
                    >
                      search
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              {FetchUserDetails ? (
                <div
                  className='card col-md-5'
                  style={{
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    paddingTop: '2%',
                    paddingBottom: '2%',
                    paddingLeft: '2%',
                    borderRadius: '5px',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
                    UserDetails
                  </h3>
                  Name: {userDetail.member_name}
                  <br />
                  email: {userDetail.email}
                  <br />
                  phone: {userDetail.phone}
                  <br />
                  Service office: {userDetail.distributer ? 'Yes' : 'No'}
                  <br />
                  Leader: {userDetail.seller ? 'Yes' : 'No'}
                  <br />
                  member: {userDetail.member ? 'Yes' : 'No'}
                  <br />
                  member_id: {userDetail.member_id}
                  <br />
                </div>
              ) : (
                ''
              )}
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
                    Total Users
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
                    Active Users
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
                    Leaders
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
                    Service Offices
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

      if (
        sellerDetails.active_seller[0].is_active &&
        sellerDetails.active_member[0].is_active &&
        sellerDetails.active_city[0].is_active &&
        !sellerDetails.is_admin
      ) {
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
                    Leadership validity(remaining days)
                  </h3>
                  <br />
                  <h1
                    className='card-subtitle mb-2 '
                    style={{
                      fontSize: '60px',
                      color: '#00487C',
                      fontWeight: 'bold',
                    }}
                  >
                    {parseInt(data.activeseller)}/30
                  </h1>
                </div>
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
                    Service Office validity(remaining days)/365
                  </h3>
                  <br />
                  <h1
                    className='card-subtitle mb-2 '
                    style={{
                      fontSize: '60px',
                      color: '#522B29',
                      fontWeight: 'bold',
                    }}
                  >
                    {parseInt(data.activedistributer)}/365
                  </h1>
                </div>

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
                    User validity(remaining days)
                  </h3>
                  <br />
                  <h1
                    className='card-subtitle mb-2 '
                    style={{
                      fontSize: '60px',
                      color: '#31572C',
                      fontWeight: 'bold',
                    }}
                  >
                    {parseInt(data.activemember)}/365
                  </h1>
                </div>
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
                    {data.bonus_points}
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
                    {data.mysales}
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
                    My Direct
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
                    {data.my_driect || 0}
                  </h1>
                </div>
              </div>
              <br />
              <div
                className='container-fluid mb-2'
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                  paddingLeft: '2%',
                  // margin: '%',
                  borderRadius: '5px',
                }}
              >
                <p style={{ margin: '0px', fontSize: '2rem' }}>
                  Registeration link{' '}
                </p>
                <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                  Forward the following link to add new members in your direct
                  team.{' '}
                </p>

                <a
                  href={`${api}/mylinks/`}
                  style={{ margin: '0px', fontSize: '1.2rem' }}
                >
                  {api}/mylinks/{sellerDetails.member_id}
                </a>
              </div>
              <br />
              {sellerDetails.active_member[0].is_active ? (
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
                  <p style={{ margin: '0px', fontSize: '2rem' }}>
                    Hurray your are now elegible to be an introducer !
                  </p>
                  <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                    Suggest member id of a user who wants to be a distributer,
                    in the following form and submit your request.
                  </p>
                  {userBOOL ? (
                    <input
                      className='form-control mt-2'
                      onChange={(e) => onChange(e)}
                      value={userName}
                      placeholder='eg: URJA0B2392'
                    ></input>
                  ) : (
                    <input
                      className='form-control mt-2'
                      onChange={(e) => onChange(e)}
                      disabled
                      value={userName}
                      placeholder='eg: URJA0B2392'
                    ></input>
                  )}
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='btn btn-info mt-2'
                  >
                    send request
                  </button>
                  <button
                    type='submit'
                    onClick={clearForm}
                    className='btn btn-secondary mt-2 ml-2'
                  >
                    clear form
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )
      }
      if (
        !sellerDetails.active_seller[0].is_active &&
        sellerDetails.active_member[0].is_active &&
        sellerDetails.active_city[0].is_active &&
        !sellerDetails.is_admin
      ) {
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
                    Service Office validity(remaining days)/365
                  </h3>
                  <br />
                  <h1
                    className='card-subtitle mb-2 '
                    style={{
                      fontSize: '60px',
                      color: '#522B29',
                      fontWeight: 'bold',
                    }}
                  >
                    {parseInt(data.activedistributer)}/365
                  </h1>
                </div>

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
                    User validity(remaining days)
                  </h3>
                  <br />
                  <h1
                    className='card-subtitle mb-2 '
                    style={{
                      fontSize: '60px',
                      color: '#31572C',
                      fontWeight: 'bold',
                    }}
                  >
                    {parseInt(data.activemember)}/365
                  </h1>
                </div>
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
                    {data.bonus_points}
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
                    {data.mysales}
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
                    My Direct
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
                    {data.my_driect || 0}
                  </h1>
                </div>
              </div>
              <br />
              <div
                className='container-fluid mb-2'
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                  paddingLeft: '2%',
                  // margin: '%',
                  borderRadius: '5px',
                }}
              >
                <p style={{ margin: '0px', fontSize: '2rem' }}>
                  Registeration link{' '}
                </p>
                <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                  Forward the following link to add new members in your direct
                  team.{' '}
                </p>

                <a
                  href={`${api}/mylinks/`}
                  style={{ margin: '0px', fontSize: '1.2rem' }}
                >
                  {api}/mylinks/{sellerDetails.member_id}
                </a>
              </div>
              <br />
              {sellerDetails.active_member[0].is_active ? (
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
                  <p style={{ margin: '0px', fontSize: '2rem' }}>
                    Hurray your are now elegible to be an introducer !
                  </p>
                  <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                    Suggest member id of a user who wants to be a distributer,
                    in the following form and submit your request.
                  </p>
                  {userBOOL ? (
                    <input
                      className='form-control mt-2'
                      onChange={(e) => onChange(e)}
                      value={userName}
                      placeholder='eg: URJA0B2392'
                    ></input>
                  ) : (
                    <input
                      className='form-control mt-2'
                      onChange={(e) => onChange(e)}
                      disabled
                      value={userName}
                      placeholder='eg: URJA0B2392'
                    ></input>
                  )}
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='btn btn-info mt-2'
                  >
                    send request
                  </button>
                  <button
                    type='submit'
                    onClick={clearForm}
                    className='btn btn-secondary mt-2 ml-2'
                  >
                    clear form
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )
      }
 if (
   sellerDetails.active_seller[0].is_active &&
   sellerDetails.active_member[0].is_active &&
   !sellerDetails.active_city[0].is_active &&
   !sellerDetails.is_admin
 ) {
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
               Leadership validity(remaining days)
             </h3>
             <br />
             <h1
               className='card-subtitle mb-2 '
               style={{
                 fontSize: '60px',
                 color: '#00487C',
                 fontWeight: 'bold',
               }}
             >
               {parseInt(data.activeseller)}/30
             </h1>
           </div>
          

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
               User validity(remaining days)
             </h3>
             <br />
             <h1
               className='card-subtitle mb-2 '
               style={{
                 fontSize: '60px',
                 color: '#31572C',
                 fontWeight: 'bold',
               }}
             >
               {parseInt(data.activemember)}/365
             </h1>
           </div>
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
               {data.bonus_points}
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
               {data.mysales}
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
               My Direct
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
               {data.my_driect || 0}
             </h1>
           </div>
         </div>
         <br />
         <div
           className='container-fluid mb-2'
           style={{
             boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
             paddingTop: '2%',
             paddingBottom: '2%',
             paddingLeft: '2%',
             // margin: '%',
             borderRadius: '5px',
           }}
         >
           <p style={{ margin: '0px', fontSize: '2rem' }}>
             Registeration link{' '}
           </p>
           <p style={{ margin: '0px', fontSize: '1.3rem' }}>
             Forward the following link to add new members in your direct team.{' '}
           </p>

           <a
             href={`${api}/mylinks/`}
             style={{ margin: '0px', fontSize: '1.2rem' }}
           >
             {api}/mylinks/{sellerDetails.member_id}
           </a>
         </div>
         <br />
         {sellerDetails.active_member[0].is_active ? (
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
             <p style={{ margin: '0px', fontSize: '2rem' }}>
               Hurray your are now elegible to be an introducer !
             </p>
             <p style={{ margin: '0px', fontSize: '1.3rem' }}>
               Suggest member id of a user who wants to be a distributer, in the
               following form and submit your request.
             </p>
             {userBOOL ? (
               <input
                 className='form-control mt-2'
                 onChange={(e) => onChange(e)}
                 value={userName}
                 placeholder='eg: URJA0B2392'
               ></input>
             ) : (
               <input
                 className='form-control mt-2'
                 onChange={(e) => onChange(e)}
                 disabled
                 value={userName}
                 placeholder='eg: URJA0B2392'
               ></input>
             )}
             <button
               type='submit'
               onClick={handleSubmit}
               className='btn btn-info mt-2'
             >
               send request
             </button>
             <button
               type='submit'
               onClick={clearForm}
               className='btn btn-secondary mt-2 ml-2'
             >
               clear form
             </button>
           </div>
         ) : (
           ''
         )}
       </div>
     </div>
   )
 }
  if (
    !sellerDetails.active_seller[0].is_active &&
    sellerDetails.active_member[0].is_active &&
    !sellerDetails.active_city[0].is_active &&
    !sellerDetails.is_admin
  ) {
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
                User validity(remaining days)
              </h3>
              <br />
              <h1
                className='card-subtitle mb-2 '
                style={{
                  fontSize: '60px',
                  color: '#31572C',
                  fontWeight: 'bold',
                }}
              >
                {parseInt(data.activemember)}/365
              </h1>
            </div>
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
                {data.bonus_points}
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
                {data.mysales}
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
                My Direct
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
                {data.my_driect || 0}
              </h1>
            </div>
          </div>
          <br />
          <div
            className='container-fluid mb-2'
            style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              paddingTop: '2%',
              paddingBottom: '2%',
              paddingLeft: '2%',
              // margin: '%',
              borderRadius: '5px',
            }}
          >
            <p style={{ margin: '0px', fontSize: '2rem' }}>
              Registeration link{' '}
            </p>
            <p style={{ margin: '0px', fontSize: '1.3rem' }}>
              Forward the following link to add new members in your direct team.{' '}
            </p>

            <a
              href={`${api}/mylinks/`}
              style={{ margin: '0px', fontSize: '1.2rem' }}
            >
              {api}/mylinks/{sellerDetails.member_id}
            </a>
          </div>
          <br />
          {sellerDetails.active_member[0].is_active ? (
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
              <p style={{ margin: '0px', fontSize: '2rem' }}>
                Hurray your are now elegible to be an introducer !
              </p>
              <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                Suggest member id of a user who wants to be a distributer, in
                the following form and submit your request.
              </p>
              {userBOOL ? (
                <input
                  className='form-control mt-2'
                  onChange={(e) => onChange(e)}
                  value={userName}
                  placeholder='eg: URJA0B2392'
                ></input>
              ) : (
                <input
                  className='form-control mt-2'
                  onChange={(e) => onChange(e)}
                  disabled
                  value={userName}
                  placeholder='eg: URJA0B2392'
                ></input>
              )}
              <button
                type='submit'
                onClick={handleSubmit}
                className='btn btn-info mt-2'
              >
                send request
              </button>
              <button
                type='submit'
                onClick={clearForm}
                className='btn btn-secondary mt-2 ml-2'
              >
                clear form
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
      return (
        <div className='container' style={{ padding: '0px 0px 19px 0px' }}>
          <br />
          <br />
          <h4>Dashboard</h4>
          <hr />
          <br />

          <div
            className='card  col-md-3'
            style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              paddingTop: '2%',
              paddingBottom: '2%',
              paddingLeft: '2%',
              // margin: '2%',
              borderRadius: '5px',
            }}
          >
            <h3 style={{ fontSize: '1.2rem' }} className='card-title'>
              My Direct
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
              {data.my_driect || 0}
            </h1>
          </div>
          <br />
          <div
            className='container-fluid mb-2'
            style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              paddingTop: '2%',
              paddingBottom: '2%',
              paddingLeft: '2%',
              // margin: '%',
              borderRadius: '5px',
            }}
          >
            <p style={{ margin: '0px', fontSize: '2rem' }}>
              Registeration link{' '}
            </p>
            <p style={{ margin: '0px', fontSize: '1.3rem' }}>
              Forward the following link to add new members in your direct team.{' '}
            </p>

            <a
              href={`${api}/mylinks/`}
              style={{ margin: '0px', fontSize: '1.2rem' }}
            >
              {api}/mylinks/{sellerDetails.member_id}
            </a>
          </div>
          {sellerDetails.active_member[0].is_active ? (
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
              <p style={{ margin: '0px', fontSize: '2rem' }}>
                Hurray your are now elegible to be an introducer !
              </p>
              <p style={{ margin: '0px', fontSize: '1.3rem' }}>
                Suggest member id of a user who wants to be a distributer, in
                the following form and submit your request.
              </p>
              {userBOOL ? (
                <input
                  className='form-control mt-2'
                  onChange={(e) => onChange(e)}
                  value={userName}
                  placeholder='eg: URJA0B2392'
                ></input>
              ) : (
                <input
                  className='form-control mt-2'
                  onChange={(e) => onChange(e)}
                  disabled
                  value={userName}
                  placeholder='eg: URJA0B2392'
                ></input>
              )}
              <button
                type='submit'
                onClick={handleSubmit}
                className='btn btn-info mt-2'
              >
                send request
              </button>
              <button
                type='submit'
                onClick={clearForm}
                className='btn btn-secondary mt-2 ml-2'
              >
                clear form
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      )
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
