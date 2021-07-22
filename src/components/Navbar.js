import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { Link } from 'react-router-dom'
import ModalLogin from './Modal'
import ModalSignup from './ModalSignup'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function Nav({ logout, isAuthenticated,user}) {
    const [modalLoginShow, setModalLoginShow] = React.useState(false)
  const [modalSignupShow, setModalSignupShow] = React.useState(false)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  user = JSON.parse(localStorage.getItem("user") || "[]");


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
if(!isAuthenticated){

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
        
          label={isAuthenticated ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
      <AppBar style={{backgroundColor:'white',color:'black'}} position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            LOGO
          </Typography>
          <NavContainer>
      
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
        />
      <ModalSignup
        show={modalSignupShow}
        onHide={() => setModalSignupShow(false)}
        />
      <div className='content'>
        <ul>
          <li className='imlocation container'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='currentColor'
              className='bi bi-geo-alt-fill'
              viewBox='0 0 20 20'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
            </svg>
            <a className='location' href='#news' style={{ color: 'black' }}>
              Pune, India
            </a>
          </li>

          <li>
            <Link to='/login'>
         <button className='buttonlogin'>
              Log in
            </button>
              </Link>
          </li>
          <li className='orbar'>
            <a href='#news' style={{ color: 'black' }}>
              {' '}
              |{' '}
            </a>
          </li>
          <li></li>
          <li>
            <button
              className='buttonsignup'
              onClick={() => setModalSignupShow(true)}
              >
              Sign up
            </button>
          </li>
        </ul>
      </div>
    </NavContainer>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <svg width="20" 
                height="12" 
                viewBox="0 0 20 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                  < path fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M19.5928 2.46286L10.6788 11.7078C10.3036 12.0974 9.69738 12.0974 9.32117 11.7078L0.407154 2.46286C-0.135718 1.90053 -0.135718 0.985625 0.407154 0.422297C0.950026 -0.140034 1.8311 -0.140034 2.37397 0.422297L10.0005 8.33087L17.6251 0.422297C18.1689 -0.140034 19.05 -0.140034 19.5928 0.422297C20.1357 0.985625 20.1357 1.90053 19.5928 2.46286Z" 
                          fill="#2D2C2C"/>
                </svg>


                {/* <AccountCircle /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Sell on Urja</MenuItem>
                <MenuItem onClick={handleClose}>Help</MenuItem>
                <MenuItem onClick={handleClose}>FAQ</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
            
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}else{
return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
        
          label={isAuthenticated ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
      <AppBar style={{backgroundColor:'white',color:'black'}} position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            LOGO
          </Typography>
         <NavContainer>
      
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />      
      <ModalSignup
        show={modalSignupShow}
        onHide={() => setModalSignupShow(false)}
      />
      <div className='content'>
        <ul>
          <li className='imlocation container'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='currentColor'
              className='bi bi-geo-alt-fill'
              viewBox='0 0 20 20'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
            </svg>
            <a className='location' href='#news' style={{ color: 'black' }}>
              Pune, India
            </a>
          </li>

          <li>
   
            <button className='buttonlogin'onClick={logout}>Log out
            </button>
           
          </li>
       
        </ul>
      </div>
    </NavContainer>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <svg width="20" 
                height="12" 
                viewBox="0 0 20 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                  < path fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M19.5928 2.46286L10.6788 11.7078C10.3036 12.0974 9.69738 12.0974 9.32117 11.7078L0.407154 2.46286C-0.135718 1.90053 -0.135718 0.985625 0.407154 0.422297C0.950026 -0.140034 1.8311 -0.140034 2.37397 0.422297L10.0005 8.33087L17.6251 0.422297C18.1689 -0.140034 19.05 -0.140034 19.5928 0.422297C20.1357 0.985625 20.1357 1.90053 19.5928 2.46286Z" 
                          fill="#2D2C2C"/>
                </svg>


                {/* <AccountCircle /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {isAuthenticated && user.company_details.length!==0?<div>
                <MenuItem onClick={handleClose}>Sell on Urja</MenuItem>
                <MenuItem onClick={handleClose}>Help</MenuItem>
                <MenuItem onClick={handleClose}>FAQ</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
                <MenuItem onClick={handleClose}>
                 < Link to='/account' > My account</Link></MenuItem></div>
                   :<div><MenuItem onClick={handleClose}>Sell on Urja</MenuItem>
                <MenuItem onClick={handleClose}>
                 < Link to='/selleracc' >   Become a Member</Link></MenuItem>
                <MenuItem onClick={handleClose}>Help</MenuItem>
                <MenuItem onClick={handleClose}>FAQ</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
                <MenuItem onClick={handleClose}>
                 < Link to='/account' > My account</Link></MenuItem></div>

            }
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );


}
}


const NavContainer = styled.div`
    
 
  ul {
    list-style-type: none;
      margin: 0;
 
    text-align: left;
  }

  li {
    display: inline;
    padding: 5px;
  }

  .imlocation {
        display:none;
   
  }
  .location {
    font-size: 1.1rem;
    color: black;
  }
  .orbar {
    display:none;
    font-size: 30px;
    margin-right: -10px;
  }
  .drop {
    font-size: 35px;
  }
}

.buttonlogin {
  background-color: #ffc232; /* Green */
  border: none;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 8px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  width: 69px;
  height: 36px;
}
.buttonsignup {
  background-color: #2d2c2c; /* Green */
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  width: 69px;
  height: 36px;
  font-weight: 700;

  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
}


@media (min-width: 722px) {

.buttonlogin {
  background-color: #ffc232; /* Green */
  border: none;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 8px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  width: 89px;
  height: 36px;
}
.buttonsignup {
  background-color: #2d2c2c; /* Green */
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  width: 89px;
  height: 36px;
  font-weight: 700;

  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}


  ul {
    margin-right: auto;
    list-style-type: none;
    margin: 0;
    padding: 18px;
    margin-left: 5rem;
    text-align: right;
    padding-top: 0px;
  }

  li {
    display: inline;
    padding: 5px;
  }

.imlocation {
    display:contents;
    color: #ffc232;
    font-size: 1.5rem;
    margin-right:-8px;
    margin-bottom:-10px;
  }
  .location {
    font-size: 1.1rem;
    color: black;
  }
  .orbar {
    display:inline;
    font-size: 30px;
    margin-right: -10px;
  }
  .drop {
    font-size: 35px;
  }
}
`



const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, { logout })(Nav)
