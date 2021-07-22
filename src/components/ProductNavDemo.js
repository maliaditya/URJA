import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AiOutlineHome} from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi'  
// import logo from '../assets/urja.svg'
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import axios from 'axios'
import { connect } from 'react-redux'
import { current_item_added,itemSearched,itemSearchedClear } from '../actions/auth'
const api = process.env.REACT_APP_API_URL
 
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function PrimarySearchAppBar({logout,access,itemSearched,itemSearchedClear,itemSearchedResult,isAuthenticated,user}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [search, setSearchItem] = React.useState({
    searchItem:''
  });
  const [searchResultItems, setSearchResultItems] = React.useState([]);
  console.log(searchResultItems)

  const fetchSearchResults = async (keyword) => {
      const config = {headers: {
            'content-type': 'appliation/json',
            // 'Authorization': `Bearer ${access}`
          }}
      await axios.get(`${api}/api/products/?name=${keyword}`,
                      config
                      ).then(res=>{
                        console.log(res);
                        setSearchResultItems(res.data)
                        res.data.map((item)=>{
                          console.log('itemdata',item)
                          return itemSearched(item)
                        })
                        // if(itemSearchedResult.length === 0){
                        //   return alert('No search results found') 
                        // }
                     
                      }).catch(err=>{
                        console.log(err);
                      })
  }

  const onChange=(e)=>{
    setSearchItem({
      ...search,
      [e.target.name]: e.target.value,
    })

  }
  const onSubmit=(e)=>{
    e.preventDefault()
    fetchSearchResults(search.searchItem)
     itemSearchedClear()
  }

  


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
{isAuthenticated?
      <MenuItem>
        
        <IconButton aria-label="show 4 new mails" color="inherit">
             <Link to='/'>
                <AiOutlineHome style={{color:'black'}} size={30} />
             </Link>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
               < Link to='/' style={{color:'black'}}>
               <AiOutlineHistory size={30} />
               </Link>
              </IconButton> */}
            <IconButton>
            <Link to='favourites'>
              <MdFavoriteBorder style={{color:'black'}} size={30} />
            </Link>
            </IconButton>
             <IconButton>
                  <Link to='account'>
                      <RiAccountCircleLine style={{color:'black'}}  size={30}/>
                  </Link>
            </IconButton>
               <IconButton>
                  <Link to='account'>
                <FiLogOut     onClick={logout} style={{color:'black'}}  size={30}/>
                  </Link>
            </IconButton>
            
      </MenuItem>
  :
  <MenuItem>
        
        <IconButton aria-label="show 4 new mails" color="inherit">
             <Link to='/'>
                <AiOutlineHome style={{color:'black'}} size={30} />
             </Link>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
               < Link to='/' style={{color:'black'}}>
               <AiOutlineHistory size={30} />
               </Link>
              </IconButton> */}
            
      </MenuItem>
  }
    </Menu>
  );

  return (
    <div  className={classes.grow}>
      <AppBar  style={{backgroundColor:'white',color:'black'}} position="static">
      
        <Toolbar >
           <Typography className={classes.title} variant="h6" noWrap>
          </Typography>
          <Wrapper>
          </Wrapper>


          <form onSubmit={(e)=>onSubmit(e)} className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
              <Link to='/categories'>
            <InputBase style={{borderBottom:'1px solid'}}
              type='text'
              placeholder="Search…"
              name='searchItem'
              value={search.searchItem}
              onChange={(e) => onChange(e)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              
              />
              </Link>
             
          </form>
              
 
          <div className={classes.grow} />
{isAuthenticated?
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
             <Link to='/'>
                <AiOutlineHome onClick={()=>itemSearchedClear()}style={{color:'black'}} size={30} />
             </Link>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
            < Link to='/' style={{color:'black'}}>
                <AiOutlineHistory size={30} />
                </Link>
              </IconButton> */}
              <IconButton>
            <Link to='favourites'>
              <MdFavoriteBorder style={{color:'black'}} size={30} />
            </Link>
            </IconButton>
             <IconButton>
                  <Link to='account'>
                <RiAccountCircleLine style={{color:'black'}}  size={30}/>
                  </Link>
            </IconButton>
               <IconButton>
                  <Link to='/login'>
                <FiLogOut     onClick={logout}  style={{color:'black'}}  size={30}/>
                  </Link>
            </IconButton>

</div>: <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
             <Link to='/'>
                <AiOutlineHome onClick={()=>itemSearchedClear()}style={{color:'black'}} size={30} />
             </Link>
            </IconButton>
          

</div>
}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}



 const mapStateToProps = state => {
       return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult:state.auth.itemSearchedResult
  }
}
  

export default connect(mapStateToProps, {current_item_added,itemSearched,itemSearchedClear})(PrimarySearchAppBar)





const Wrapper = styled.section`
@media(min-width:1200px){

  margin-left:13rem;
}
`