import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
import { AiOutlineHome } from 'react-icons/ai'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import logo from '../assets/urja.png'

// import logo from '../assets/urja.svg'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  current_item_added,
  itemSearched,
  itemSearchedClear,
} from '../actions/auth'
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
      width: '40ch',
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
}))

function PrimarySearchAppBar({
  logout,
  access,
  itemSearched,
  itemSearchedClear,
  itemSearchedResult,
  isAuthenticated,
  user,
}) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const location = useLocation()
  const [search, setSearchItem] = React.useState({
    searchItem: '',
  })

  const [searchResultItems, setSearchResultItems] = React.useState([])
  console.log(searchResultItems)

  const fetchSearchResults = async (keyword) => {
    const config = {
      headers: {
        'content-type': 'appliation/json',
        // 'Authorization': `Bearer ${access}`
      },
    }
    await axios
      .get(`${api}/api/products/?name=${keyword}`, config)
      .then((res) => {
        console.log(res)
        setSearchResultItems(res.data)
        res.data.map((item) => {
          console.log('itemdata', item)
          return itemSearched(item)
        })
        // if(itemSearchedResult.length === 0){
        //   return alert('No search results found')
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChange = (e) => {
    setSearchItem({
      ...search,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    fetchSearchResults(search.searchItem)
    itemSearchedClear()
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
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
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
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
      {isAuthenticated ? (
        <MenuItem>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Link to='/'>
              <AiOutlineHome style={{ color: 'black' }} size={30} />
            </Link>
          </IconButton>
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
               < Link to='/' style={{color:'black'}}>
               <AiOutlineHistory size={30} />
               </Link>
              </IconButton> */}
          <IconButton>
            <Link to='favourites'>
              <MdFavoriteBorder style={{ color: 'black' }} size={30} />
            </Link>
          </IconButton>
          <IconButton>
            <Link to='account'>
              <CgProfile style={{ color: 'black' }} size={30} />
            </Link>
          </IconButton>
          <IconButton>
            <Link to='/login'>
              <FiLogOut onClick={logout} style={{ color: 'black' }} size={30} />
            </Link>
          </IconButton>
        </MenuItem>
      ) : (
        <MenuItem>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Link to='/'>
              <AiOutlineHome style={{ color: 'black' }} size={30} />
            </Link>
          </IconButton>
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
               < Link to='/' style={{color:'black'}}>
               <AiOutlineHistory size={30} />
               </Link>
              </IconButton> */}
        </MenuItem>
      )}
    </Menu>
  )

  return (
    <div id='productpage' className={classes.grow}>
      <AppBar
        style={{ backgroundColor: 'white', color: 'black' }}
        position='fixed'
      >
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/'>
              <img
                style={{ width: '100px', height: '40px' }}
                src={logo}
                alt=''
              />
            </Link>
          </Typography>
          <Wrapper></Wrapper>
          <button style={{ display: 'flex' }} className='btn btn-warning'>
            All&nbsp;&nbsp;
            <svg
              style={{ marginTop: '0.3rem' }}
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-chevron-down'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
              />
            </svg>
          </button>
          <form onSubmit={(e) => onSubmit(e)} className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Link to='/categories'>
              <InputBase
                style={{
                  color: 'black',
                  backgroundColor: 'rgba(196, 196, 196, 0.5)',
                  borderRadius: '5px',
                }}
                type='text'
                placeholder='Search Products, Categories...'
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
          {isAuthenticated ? (
            <div className={classes.sectionDesktop}>
              <div style={{ paddingLeft: '1.2rem' }}>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Link to='/'>
                    <AiOutlineHome
                      onClick={() => itemSearchedClear()}
                      style={{ color: 'black' }}
                      size={30}
                    />
                  </Link>
                </IconButton>
                <p style={{ fontSize: '0.8rem', marginTop: '-15px' }}>
                  &nbsp;&nbsp;&nbsp;Home
                </p>
              </div>

              {location.pathname === '/recently_viewed' ? (
                <center style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='recently_viewed'>
                      <svg
                        width='30'
                        height='30'
                        viewBox='0 0 30 30'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M13.75 7.5V17.5H22.5V15H16.25V7.5H13.75ZM27.3175 17.1038L29.815 17.3025C29.65 18.37 29.3763 19.3975 29 20.3775L26.75 19.2463C27 18.5575 27.1912 17.8425 27.3175 17.1038ZM24.1325 26.8863L22.3662 25.0825C21.7587 25.5275 21.1087 25.9175 20.4225 26.2488L21.2588 28.6225C22.285 28.1513 23.2475 27.5675 24.1325 26.8863ZM25.665 21.5C25.2463 22.1825 24.7662 22.8213 24.2287 23.41L25.9838 25.2012C26.7125 24.4175 27.3575 23.5563 27.9075 22.6287L25.665 21.5ZM0 15C0 23.2838 6.71875 30 15.005 30C16.3562 30 17.66 29.805 18.905 29.47L18.0737 27.1025C17.09 27.3525 16.065 27.5 15.005 27.5C8.11 27.5 2.50125 21.8925 2.50125 15C2.50125 8.1075 8.11 2.5 15.005 2.5C17.7987 2.5 20.3712 3.43 22.4537 4.98625L19.8913 7.5475L28.66 9.24L26.9662 0.47375L24.2362 3.2025C21.6912 1.205 18.4925 0 15.005 0C6.71875 0 0 6.71625 0 15H0ZM29.7163 12.0512H27.1213C27.325 12.8775 27.4475 13.7312 27.4813 14.61L30 14.8112C29.9875 13.8675 29.8938 12.9437 29.7163 12.0512Z'
                          fill='#FFC232'
                        />
                      </svg>
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: '#ffc232',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Recently Viewed
                  </p>
                </center>
              ) : (
                <center style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='recently_viewed'>
                      <svg
                        width='28'
                        height='29'
                        viewBox='0 0 28 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.8333 7.99609V17.3294H21V14.9961H15.1667V7.99609H12.8333ZM25.4963 16.9596L27.8273 17.1451C27.6733 18.1414 27.4178 19.1004 27.0667 20.0151L24.9667 18.9593C25.2 18.3164 25.3785 17.6491 25.4963 16.9596ZM22.5237 26.0899L20.8752 24.4064C20.3082 24.8218 19.7015 25.1858 19.061 25.4949L19.8415 27.7104C20.7993 27.2706 21.6977 26.7258 22.5237 26.0899ZM23.954 21.0628C23.5632 21.6998 23.1152 22.2959 22.6135 22.8454L24.2515 24.5173C24.9317 23.7858 25.5337 22.9819 26.047 22.1163L23.954 21.0628ZM0 14.9961C0 22.7276 6.27083 28.9961 14.0047 28.9961C15.2658 28.9961 16.4827 28.8141 17.6447 28.5014L16.8688 26.2918C15.9507 26.5251 14.994 26.6628 14.0047 26.6628C7.56933 26.6628 2.3345 21.4291 2.3345 14.9961C2.3345 8.56309 7.56933 3.32943 14.0047 3.32943C16.6122 3.32943 19.0132 4.19743 20.9568 5.64993L18.5652 8.04043L26.7493 9.62009L25.1685 1.43826L22.6205 3.98509C20.2452 2.12076 17.2597 0.996094 14.0047 0.996094C6.27083 0.996094 0 7.26459 0 14.9961H0ZM27.7352 12.2439H25.3132C25.5033 13.0151 25.6177 13.8119 25.6492 14.6321L28 14.8199C27.9883 13.9391 27.9008 13.0769 27.7352 12.2439Z'
                          fill='#2D2C2C'
                        />
                      </svg>
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: 'black',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Recently Viewed
                  </p>
                </center>
              )}

              {/* <IconButton aria-label="show 17 new notifications" color="inherit">
            < Link to='/' style={{color:'black'}}>
                <AiOutlineHistory size={30} />
                </Link>
              </IconButton> */}
              {location.pathname === '/favourites' ? (
                <div style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='favourites'>
                      <MdFavorite style={{ color: '#ffc232' }} size={30} />
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: '#ffc232',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Favourite
                  </p>
                </div>
              ) : (
                <div style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='favourites'>
                      <MdFavoriteBorder style={{ color: 'black' }} size={30} />
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: 'black',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Favourite
                  </p>
                </div>
              )}
              {location.pathname === '/account' ? (
                <div style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='account'>
                      <svg
                        width='28'
                        height='29'
                        viewBox='0 0 28 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14 15.5537C6.2806 15.5537 0 20.9969 0 27.687C0 28.2022 0.482494 28.6204 1.07695 28.6204C1.67141 28.6204 2.15391 28.2022 2.15391 27.687C2.15391 22.0254 7.4674 17.4203 14 17.4203C20.5326 17.4203 25.8461 22.0254 25.8461 27.687C25.8461 28.2022 26.3286 28.6203 26.923 28.6203C27.5175 28.6203 28 28.2022 28 27.687C28 20.9969 21.7194 15.5537 14 15.5537Z'
                          fill='#FFC232'
                        />
                        <path
                          d='M13.2817 0.620605C9.12478 0.620605 5.74316 3.55124 5.74316 7.15395C5.74316 10.7567 9.12468 13.6873 13.2817 13.6873C17.4387 13.6873 20.8202 10.7566 20.8202 7.15395C20.8202 3.55132 17.4387 0.620605 13.2817 0.620605ZM13.2817 11.8206C10.3137 11.8206 7.89708 9.72618 7.89708 7.15395C7.89708 4.58172 10.3137 2.48733 13.2817 2.48733C16.2497 2.48733 18.6663 4.58172 18.6663 7.15395C18.6663 9.72618 16.2498 11.8206 13.2817 11.8206Z'
                          fill='#FFC232'
                        />
                      </svg>
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: '#ffc232',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Account
                  </p>
                </div>
              ) : (
                <div style={{ paddingLeft: '1.2rem' }}>
                  <IconButton>
                    <Link to='account'>
                      <svg
                        style={{ color: 'black' }}
                        width='28'
                        height='29'
                        viewBox='0 0 28 29'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14 15.554C6.2806 15.554 0 20.9972 0 27.6873C0 28.2025 0.482494 28.6207 1.07695 28.6207C1.67141 28.6207 2.15391 28.2024 2.15391 27.6872C2.15391 22.0256 7.4674 17.4206 14 17.4206C20.5326 17.4206 25.8461 22.0256 25.8461 27.6872C25.8461 28.2024 26.3286 28.6206 26.923 28.6206C27.5175 28.6206 28 28.2024 28 27.6872C28 20.9972 21.7194 15.554 14 15.554Z'
                          fill='#2D2C2C'
                        />
                        <path
                          d='M13.2817 0.620667C9.12478 0.620667 5.74316 3.5513 5.74316 7.15401C5.74316 10.7567 9.12468 13.6874 13.2817 13.6874C17.4387 13.6874 20.8202 10.7566 20.8202 7.15401C20.8202 3.55139 17.4387 0.620667 13.2817 0.620667ZM13.2817 11.8206C10.3137 11.8206 7.89708 9.72625 7.89708 7.15401C7.89708 4.58178 10.3137 2.48739 13.2817 2.48739C16.2497 2.48739 18.6663 4.58178 18.6663 7.15401C18.6663 9.72625 16.2498 11.8206 13.2817 11.8206Z'
                          fill='#2D2C2C'
                        />
                      </svg>

                      {/* <CgProfile size={30} /> */}
                    </Link>
                  </IconButton>
                  <p
                    style={{
                      color: 'black',
                      fontSize: '0.8rem',
                      marginTop: '-15px',
                    }}
                  >
                    Account
                  </p>
                </div>
              )}

              <div style={{ paddingLeft: '1.2rem' }}>
                <IconButton>
                  <Link to=''>
                    <FiLogOut
                      onClick={logout}
                      style={{ color: 'black' }}
                      size={30}
                    />
                  </Link>
                </IconButton>
                <p style={{ fontSize: '0.8rem', marginTop: '-15px' }}>
                  &nbsp;&nbsp;Logout
                </p>
              </div>
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <IconButton aria-label='show 4 new mails' color='inherit'>
                <Link to='/'>
                  <AiOutlineHome
                    onClick={() => itemSearchedClear()}
                    style={{ color: 'black' }}
                    size={30}
                  />
                </Link>
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    itemSearchedResult: state.auth.itemSearchedResult,
  }
}

export default connect(mapStateToProps, {
  current_item_added,
  itemSearched,
  itemSearchedClear,
})(PrimarySearchAppBar)

const Wrapper = styled.section`
  @media (min-width: 1200px) {
    margin-left: 13rem;
  }
`
