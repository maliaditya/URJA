// import React from 'react'
// import clsx from 'clsx'
// import { makeStyles } from '@material-ui/core/styles'
// import Drawer from '@material-ui/core/Drawer'
// import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import axios from 'axios'
// const api = process.env.REACT_APP_API_URL

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// })

// export default function TemporaryDrawer() {
//   const classes = useStyles()
//   const [state, setState] = React.useState({
//     left: false,
//   })

//   const [productType, setProductType] = React.useState()
//   const [productCategories, setProductCategories] = React.useState()

//   const fetchCategories = async () => {
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//         // 'Authorization': `Bearer ${this.props.access}`,
//       },
//     }
//     const product_type = await axios.get(`${api}/api/product_type/`, config)
//     const product_categories = await axios.get(`${api}/api/categories/`, config)
//     setProductType(product_type.data)
//     setProductCategories(product_categories.data)
//     console.log(productType)
//     console.log(productCategories)
//   }

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return
//     }
//     fetchCategories()

//     setState({ ...state, [anchor]: open })
//   }

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role='presentation'
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {productCategories.map((item, index) => {
//           return (
//             <ListItem button key={index}>
//               <ListItemText primary={item.category_name} />
//             </ListItem>
//           )
//         })}
//       </List>

//       <Divider />
//     </div>
//   )

//   return (
//     <div>
//       <button
//         onClick={toggleDrawer('left', true)}
//         type='submit'
//         className='btn btn-warning myDIV'
//       >
//         {' '}
//         All{' '}
//         {/* <svg
//           xmlns='http://www.w3.org/2000/svg'
//           width='16'
//           height='16'
//           fill='currentColor'
//           className='bi bi-chevron-down'
//           viewBox='0 0 16 16'
//         >
//           <path
//             fillRule='evenodd'
//             d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
//           />
//         </svg> */}
//       </button>
//       <Drawer
//         anchor={'left'}
//         open={state['left']}
//         onClose={toggleDrawer('left', false)}
//       >
//         {list('left')}
//       </Drawer>
//     </div>
//   )
// }
