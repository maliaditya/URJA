import React from 'react';
import {  FaBars, FaCrown } from 'react-icons/fa';
import { connect } from 'react-redux'
import axios from 'axios'
import { FiLogOut } from 'react-icons/fi'
import { checkAuthenticated, load_user,logout } from '../../actions/auth'
import {RiShieldStarFill} from 'react-icons/ri';
const Main = ({handleToggleSidebar,componentValue,logout}) => {


   React.useEffect(() => {
      let title = 'URJA | MBW'
      document.title = title;
    });
    
    const [myAllDirect, setMyAllDirect] = React.useState('')
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
          let a = 0;
          
          for(let i=0; i<response.data.my_direct.length; i++) {
                    if( response.data.my_direct[i].is_active_member)
                           a += 1
          }
          setMyAllDirect(a)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])


    const user = JSON.parse(localStorage.getItem('user') || '[]')
    let sellerDetails = user.seller_account[0]

  
        return (
          <main style={{ padding: '0px' }}>
            <div>
              <nav
                className='navbar navbar-light bg-light justify-content-between'
                style={{
                  paddingRight: '50px',
                  paddingBottom: '0px',
                  marginRight: 'auto',
                }}
              >
                <div style={{ display: 'flex' }} className='navbar-brand'>
                  {' '}
                  &nbsp;
                  <img
                    src='https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg'
                    alt='Avatar'
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <div>
                    {' '}
                    &nbsp; Welcome, {user.first_name} {user.last_name} &nbsp;
                    {myAllDirect >= 25 &&
                    sellerDetails.active_seller[0].is_active ? (
                      <FaCrown
                        color='#DAA520'
                        size='27'
                        className='mb-2'
                      ></FaCrown>
                    ) : (
                      ''
                    )}
                    <p
                      style={{
                        fontSize: '15px',
                        paddingBottom: '0px',
                        marginBottom: '0px',
                      }}
                    >
                      &nbsp;&nbsp;
                      {sellerDetails.is_admin &&
                      sellerDetails.active_city[0].is_active &&
                      sellerDetails.active_seller[0].is_active &&
                      sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#454E9E' />
                          <RiShieldStarFill size='27' color='#522B29' />
                          <RiShieldStarFill size='27' color='#00487C' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        sellerDetails.active_city[0].is_active &&
                        sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#522B29' />
                          <RiShieldStarFill size='27' color='#00487C' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        !sellerDetails.active_city[0].is_active &&
                        sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#00487C' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        !sellerDetails.active_city[0].is_active &&
                        !sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : sellerDetails.is_admin &&
                        !sellerDetails.active_city[0].is_active &&
                        !sellerDetails.active_seller[0].is_active &&
                        !sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#454E9E' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        !sellerDetails.active_city[0].is_active &&
                        sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#00487C' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        sellerDetails.active_city[0].is_active &&
                        !sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#454E9E' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        sellerDetails.active_city[0].is_active &&
                        sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#522B29' />
                          <RiShieldStarFill size='27' color='#00487C' />
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : !sellerDetails.is_admin &&
                        !sellerDetails.active_city[0].is_active &&
                        !sellerDetails.active_seller[0].is_active &&
                        sellerDetails.active_member[0].is_active ? (
                        <>
                          <RiShieldStarFill size='27' color='#31572C' />
                        </>
                      ) : (
                        <RiShieldStarFill size='27' color='#BF1A2F' />
                      )}{' '}
                      {sellerDetails.member_id}
                    </p>
                  </div>
                </div>
                <button className='btn'>
                  <FiLogOut
                    // onClick={() => itemSearchedClear()}
                    onClick={logout}
                    style={{ color: 'black' }}
                    size={27}
                  />
                </button>
                <div
                  className='navbar-brand btn-toggle'
                  onClick={() => handleToggleSidebar(true)}
                >
                  <FaBars />
                </div>
              </nav>
            </div>
            <div className='container' style={{ fontFamily: 'serif' }}>
              {componentValue}
            </div>

            <footer>
              <small>
                Copyright © {new Date().getFullYear()} URJA | All Rights
                Reserved
              </small>
            </footer>
          </main>
        )

};

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

export default connect(mapStateToProps, {checkAuthenticated,logout, load_user })(Main)


