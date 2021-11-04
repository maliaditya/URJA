import React from 'react';
import {  FaBars } from 'react-icons/fa';
import { connect } from 'react-redux'
import { FiLogOut } from 'react-icons/fi'
import { checkAuthenticated, load_user,logout } from '../../actions/auth'
import { RiShieldCheckFill ,RiShieldFill,RiShieldUserFill,RiShieldStarFill} from 'react-icons/ri';
const Main = ({handleToggleSidebar,componentValue,logout}) => {
   React.useEffect(() => {
      let title = 'URJA | MBW'
      document.title = title;
    });

    const user = JSON.parse(localStorage.getItem('user') || '[]')
    const sellerDetails = user.seller_account[0]
  try{

    return (
      <main style={{padding:"0px"}}>
     <div>
            <nav className="navbar navbar-light bg-light justify-content-between" style={{paddingRight:'50px',paddingBottom:"0px",marginRight:'auto'}}>
               
       <div style={{display:'flex'}}className="navbar-brand"> &nbsp;
       <img src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="Avatar" style={{width:'50px',height:'50px',borderRadius:'50%'}}/> 

    <div>  &nbsp;  Welcome, {user.first_name} {user.last_name}
      <p style={{fontSize:'15px',paddingBottom:"0px",marginBottom:'0px'}}>&nbsp;&nbsp;
      {
        sellerDetails.is_admin?<RiShieldUserFill size='20' color='#eb6709'/>:
      sellerDetails.active_seller[0].is_active?<RiShieldStarFill size='20' color='#17a2b8'/>:
      sellerDetails.active_member[0].is_active? <RiShieldCheckFill size='20' color='#5fdba7'/>:
      <RiShieldFill size='20' color='#d11a2a'/>}    {sellerDetails.member_id}
      </p> 
       </div>
       
       </div>
      <button className='btn'>

      <FiLogOut
                      // onClick={() => itemSearchedClear()}
                      onClick={logout}
                      style={{ color: 'black' }}
                      size={30}
                      />
                      </button>
                <div className="navbar-brand btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
             </nav>
        </div>
     <div className='container' style={{fontFamily:'serif'}} >
       {componentValue}
     </div>
    
      <footer>
        <small>
        Copyright © {new Date().getFullYear()} URJA | All Rights Reserved 
    
        </small>
       
      </footer>
    </main>
  );
}catch(err){
  return(
    <h1>{err}</h1>
  )
}
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


