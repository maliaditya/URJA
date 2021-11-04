import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import {checkAuthenticated, load_user} from '../actions/auth'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import axios from 'axios'
import ModalSuccess from './ModalSuccess'
import ModalSellerInfo from './ModalSellerInfo'
import { itemAddedToRecentlyViewed } from '../actions/auth'
import { HashLink } from 'react-router-hash-link'
import ModalLogin from './Modal'
import ModalAddAddress from './ModalAddAddress'
const api = process.env.REACT_APP_API_URL
const Productdetailinfo = ({
  isAuthenticated,
  currentItem,
  user,
  access,
  itemAddedToRecentlyViewed,
  currentCompany,
  currentCompanyUser,
}) => {
  currentItem = JSON.parse(localStorage.getItem('currentItem') || '[]')
  user = JSON.parse(localStorage.getItem('user') || '[]')
  currentCompany = JSON.parse(localStorage.getItem('currentCompany') || '[]')
  currentCompanyUser = JSON.parse(
    localStorage.getItem('currentCompanyUser') || '[]'
  )
  const [modalLoginShow, setModalLoginShow] = React.useState(false)
  const [modalAddAddress, setModalAddAddress] = React.useState(false)

  const [modalModalSuccess, setModalSuccess] = React.useState(false)
  const [modalModalSellerInfo, setModalSellerInfo] = React.useState(false)

  const images = [
    {
      original: currentItem.front_image,
      thumbnail: currentItem.front_image,

      thumbnailWidth: 10,
    },
    {
      original: currentItem.back_image,
      thumbnail: currentItem.back_image,

      thumbnailWidth: 10,
    },
     {
      original: currentItem.extra_image,
      thumbnail: currentItem.extra_image,

      thumbnailWidth: 10,
    },
  ]

  const [formData, setFormData] = React.useState({ amount: '', unit: '' })

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const sendEnquiry = async (amount, unit) => {
    console.log(amount, unit)
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${access}`,
        Accept: 'application/json',
      },
    }

    const body = {
      user: currentCompany.user,
      product: currentItem.id,
      customer_name: `${user.first_name} ${user.last_name}`,
      phone_number: user.phone,
      email: user.email,
      product_name: currentItem.name,
      enquiry_for: `${amount}/${unit}`,
      city: `${user.address[0].city}`,
      state: `${user.address[0].state}`,
      paid: false,
    }

    await axios
      .post(`${api}/api/product_enquires/`, body, config)
      .then((res) => {
        console.log('success!!!!!', res)
        setModalSuccess(true)
      })
      .catch((err) => {
        console.log(err)
        alert('Request Fail, Please Try again later!')
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendEnquiry(formData.amount, formData.unit)
  }

  useEffect(() => {
    itemAddedToRecentlyViewed(currentItem)
  })

  return (
    <Wrapper className='content'>
      <ModalSuccess
        show={modalModalSuccess}
        onHide={() => setModalSuccess(false)}
      />
      <ModalAddAddress
        show={modalAddAddress}
        onHide={() => setModalAddAddress(false)}
      />
      <ModalSellerInfo
        show={modalModalSellerInfo}
        onHide={() => setModalSellerInfo(false)}
      />
      <ModalLogin
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />
      <div className='col-md-12 row '>
        <div className='col-md-6 imagebanner  '>
          <ImageGallery
            className='gallery'
            items={images}
            showPlayButton={false}
            showNav={false}
            thumbnailPosition='left'
            lazyLoad={true}
          />
        </div>
        <div className='col-md-6 info '>
          <div className='pinfodetail'>
            <p className='phead'>{currentCompany.company_name} </p>
            <p className='pname'>{currentItem.name}</p>
            <p className='pinfo '>
              {currentItem.details.slice(0, 200)}...
              <br />
              <HashLink to='/product#product'>View more</HashLink>
            </p>
            <div className='rating'>
              <Box component='fieldset' mb={0.5} borderColor='transparent'>
                <Rating
                  name='read-only'
                  value={currentItem.reviews.map((sub) => sub.rating)[0]}
                  readOnly
                />
              </Box>
              &nbsp; &nbsp; 0.0 &nbsp; | &nbsp; 0 ratings
            </div>
             {parseInt(currentItem.discount)!==0?
                      <p className='price' >
                      ₹{ parseInt(currentItem.price)-(parseInt(currentItem.price)*parseInt(currentItem.discount)/100)} &nbsp;<s style={{fontSize:'1rem'}}>₹ {currentItem.price}</s> &nbsp;
                      <b style={{color:'green',fontSize:'1rem'}}>({currentItem.discount}% OFF )</b> &nbsp; <HashLink to='/product#enquiry' className='glp'>
                {' '}
                Get Latest Price
              </HashLink>  </p>:
                        <p className='price'>
              ₹ {currentItem.price}&nbsp;{' '}
              <HashLink to='/product#enquiry' className='glp'>
                {' '}
                Get Latest Price
              </HashLink>
            </p>
                    }

        
            <div>
              {currentItem.in_stock ? (
                <p
                  className='instock'
                  style={{ fontSize: '1.5rem', color: 'green' }}
                >
                  {' '}
                  In stock
                </p>
              ) : (
                <p
                  className='instock'
                  style={{ fontSize: '1.5rem', color: 'red' }}
                >
                  {' '}
                  Out of stock
                </p>
              )}
            </div>
            <hr />
          </div>
          {isAuthenticated ? (
            <center>
              <div className=' companyinfo'>
                <p className='pheadinfo'>{currentCompany.company_name} </p>
                <p>
                  <svg
                    width='20'
                    height='27'
                    viewBox='0 0 20 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18.4815 13.2243C19.0635 12.0496 19.3887 10.7388 19.3887 9.3564C19.3887 4.30715 15.0514 0.213928 9.70117 0.213928C4.35091 0.213928 0.0136719 4.30715 0.0136719 9.3564C0.0136719 10.7388 0.338799 12.0496 0.920828 13.2243H0.881399L1.08949 13.5479C1.29321 13.9199 1.52321 14.2771 1.77716 14.6171L9.70126 26.938L17.6264 14.6155C17.8795 14.2765 18.1087 13.9205 18.3119 13.5497L18.5211 13.2243H18.4815Z'
                      fill='#C4C4C4'
                    />
                    <ellipse
                      cx='10.0352'
                      cy='9.27952'
                      rx='5.01078'
                      ry='4.71409'
                      fill='white'
                    />
                  </svg>
                  &nbsp; {currentCompany.get_full_address}
                </p>
                <div className='crating'>
                  <Box component='fieldset' mb={0.5} borderColor='transparent'>
                    <Rating
                      name='read-only'
                      value={currentItem.reviews.map((sub) => sub.rating)[0]}
                      readOnly
                    />
                  </Box>
                </div>
                <p>
                  <svg
                    width='24'
                    height='22'
                    viewBox='0 0 24 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.5137 11.8583C5.17274 11.8583 0.0136719 15.9162 0.0136719 20.9036C0.0136719 21.2876 0.410006 21.5994 0.898313 21.5994C1.38662 21.5994 1.78295 21.2876 1.78295 20.9035C1.78295 16.6829 6.14761 13.2499 11.5137 13.2499C16.8797 13.2499 21.2444 16.6829 21.2444 20.9035C21.2444 21.2876 21.6407 21.5993 22.129 21.5993C22.6173 21.5993 23.0137 21.2876 23.0137 20.9035C23.0137 15.9162 17.8546 11.8583 11.5137 11.8583Z'
                      fill='#2D2C2C'
                    />
                    <path
                      d='M10.9243 0.72583C7.50967 0.72583 4.73193 2.91056 4.73193 5.59631C4.73193 8.28207 7.50959 10.4668 10.9243 10.4668C14.3389 10.4668 17.1166 8.282 17.1166 5.59631C17.1166 2.91062 14.3389 0.72583 10.9243 0.72583ZM10.9243 9.07519C8.48629 9.07519 6.50122 7.51386 6.50122 5.59631C6.50122 3.67877 8.48629 2.11743 10.9243 2.11743C13.3622 2.11743 15.3473 3.67877 15.3473 5.59631C15.3473 7.51386 13.3623 9.07519 10.9243 9.07519Z'
                      fill='#2D2C2C'
                    />
                  </svg>{' '}
                  &nbsp; {currentCompanyUser.first_name}{' '}
                  {currentCompanyUser.last_name}
                </p>
                <div>
                  {currentCompany.leading_seller ? (
                    <React.Fragment>
                      <svg
                        width='24'
                        height='22'
                        viewBox='0 0 24 22'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M0.456138 15.6363C0.482468 15.6363 0.508747 15.6343 0.53469 15.6305C5.24455 14.9106 17.2992 8.70389 21.8774 2.1509L22.1429 3.09891C22.1659 3.18121 22.2208 3.25451 22.2987 3.30698C22.3766 3.35945 22.473 3.38805 22.5723 3.38816C22.639 3.38804 22.7048 3.37507 22.7648 3.35022C22.8248 3.32537 22.8774 3.28928 22.9187 3.24465C22.96 3.20002 22.9889 3.14801 23.0033 3.09251C23.0177 3.03701 23.0171 2.97945 23.0017 2.92416L22.4743 1.0402C22.4609 0.992034 22.4365 0.946592 22.4025 0.906465C22.3685 0.866339 22.3255 0.832313 22.2761 0.806333C22.2266 0.780352 22.1717 0.762925 22.1143 0.755048C22.057 0.74717 21.9984 0.748996 21.9419 0.760421L19.7305 1.20978C19.6165 1.23296 19.5179 1.29378 19.4565 1.37888C19.3951 1.46398 19.3758 1.56638 19.403 1.66356C19.4302 1.76073 19.5016 1.84472 19.6015 1.89705C19.7014 1.94937 19.8216 1.96575 19.9356 1.94258L21.1657 1.6925C16.6809 8.20524 4.48807 14.2609 0.378343 14.8882C0.269544 14.9047 0.171933 14.9553 0.104749 15.03C0.0375647 15.1048 0.00567978 15.1983 0.0153785 15.2921C0.0250773 15.3859 0.075656 15.4732 0.157146 15.5368C0.238637 15.6004 0.345128 15.6356 0.455632 15.6356L0.456138 15.6363Z'
                          fill='#2D2C2C'
                        />
                        <path
                          d='M3.0177 16.82C2.90047 16.82 2.78804 16.8597 2.70515 16.9303C2.62225 17.0009 2.57568 17.0967 2.57568 17.1966V21.2472C2.57568 21.347 2.62225 21.4428 2.70515 21.5135C2.78804 21.5841 2.90047 21.6238 3.0177 21.6238H5.2909C5.40813 21.6238 5.52056 21.5841 5.60345 21.5135C5.68634 21.4428 5.73291 21.347 5.73291 21.2472V17.1966C5.73291 17.0967 5.68634 17.0009 5.60345 16.9303C5.52056 16.8597 5.40813 16.82 5.2909 16.82H3.0177ZM4.84889 20.8705H3.45971V17.5733H4.84889V20.8705Z'
                          fill='#2D2C2C'
                        />
                        <path
                          d='M8.26135 14.2374C8.14412 14.2374 8.03169 14.2771 7.9488 14.3477C7.8659 14.4184 7.81934 14.5142 7.81934 14.6141V21.2472C7.81934 21.347 7.8659 21.4428 7.9488 21.5135C8.03169 21.5841 8.14412 21.6238 8.26135 21.6238H10.5346C10.6518 21.6238 10.7642 21.5841 10.8471 21.5135C10.93 21.4428 10.9766 21.347 10.9766 21.2472V14.6141C10.9766 14.5142 10.93 14.4184 10.8471 14.3477C10.7642 14.2771 10.6518 14.2374 10.5346 14.2374H8.26135ZM10.0925 20.8705H8.70336V14.9907H10.0925V20.8705Z'
                          fill='#2D2C2C'
                        />
                        <path
                          d='M13.5043 11.6549C13.3871 11.655 13.2747 11.6947 13.1919 11.7653C13.109 11.8359 13.0625 11.9317 13.0625 12.0315V21.2472C13.0625 21.347 13.1091 21.4428 13.192 21.5135C13.2749 21.5841 13.3873 21.6238 13.5045 21.6238H15.7777C15.8949 21.6237 16.0073 21.584 16.0902 21.5134C16.1731 21.4428 16.2197 21.347 16.2197 21.2472V12.0315C16.2197 11.9317 16.1731 11.8359 16.0902 11.7653C16.0073 11.6947 15.8949 11.655 15.7777 11.6549H13.5043ZM15.3355 20.8705H13.9465V12.4082H15.3357L15.3355 20.8705Z'
                          fill='#2D2C2C'
                        />
                        <path
                          d='M18.7472 9.07233C18.63 9.07238 18.5176 9.11008 18.4347 9.1827C18.3518 9.25332 18.3052 9.34908 18.3052 9.44895V21.2472C18.3052 21.347 18.3518 21.4428 18.4347 21.5134C18.5176 21.584 18.63 21.6237 18.7472 21.6238H21.0204C21.1376 21.6238 21.25 21.5841 21.3329 21.5135C21.4158 21.4428 21.4624 21.347 21.4624 21.2472V9.44895C21.4624 9.34906 21.4158 9.25327 21.3329 9.18264C21.25 9.11001 21.1376 9.07233 21.0204 9.07233H18.7472ZM20.5784 20.8705H19.1892V9.82557H20.5784V20.8705Z'
                          fill='#2D2C2C'
                        />
                      </svg>
                      &nbsp; Leading Seller &nbsp; &nbsp;
                    </React.Fragment>
                  ) : (
                    <p></p>
                  )}
                  {currentCompany.verified_seller ? (
                    <React.Fragment>
                      <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M21.4676 7.72355L20.4643 7.01625L20.4504 5.7889C20.4496 5.71726 20.4274 5.64751 20.3867 5.58858C20.346 5.52965 20.2885 5.48424 20.2218 5.45818L19.0786 5.01179L18.7724 3.82329C18.7546 3.75392 18.7164 3.69146 18.6627 3.64396C18.6091 3.59645 18.5425 3.56606 18.4715 3.55668L17.255 3.39528L16.6743 2.31401C16.6403 2.25093 16.5883 2.19942 16.5249 2.16608C16.4615 2.13273 16.3896 2.11906 16.3183 2.12682L15.0982 2.26159L14.2743 1.35133C14.2262 1.29814 14.1632 1.26057 14.0936 1.24347C14.0239 1.22637 13.9507 1.23052 13.8835 1.25538L12.7319 1.67985L11.7142 0.99398C11.6549 0.953984 11.585 0.932617 11.5134 0.932617C11.4418 0.932617 11.3719 0.953984 11.3125 0.99398L10.2948 1.67985L9.14309 1.25534C9.0758 1.23051 9.00263 1.22639 8.93298 1.2435C8.86333 1.26061 8.8004 1.29816 8.75227 1.35133L7.92862 2.26141L6.7085 2.12686C6.63725 2.11896 6.56527 2.13256 6.50182 2.16592C6.43837 2.19929 6.38637 2.25088 6.3525 2.31405L5.77179 3.39532L4.55499 3.55673C4.48396 3.56611 4.41735 3.59651 4.36372 3.64402C4.31009 3.69154 4.27188 3.754 4.25401 3.82338L3.94792 5.01188L2.8047 5.45827C2.73798 5.48433 2.68057 5.52973 2.63984 5.58865C2.5991 5.64757 2.57691 5.71732 2.57609 5.78894L2.56217 7.0163L1.55915 7.72359C1.50055 7.7649 1.45565 7.8228 1.43022 7.88984C1.40478 7.95687 1.39998 8.02998 1.41643 8.09977L1.69809 9.29469L0.894757 10.2225C0.847889 10.2767 0.818272 10.3436 0.809708 10.4147C0.801143 10.4858 0.814022 10.5579 0.84669 10.6216L1.40646 11.7139L0.84669 12.8061C0.814022 12.8698 0.801143 12.9418 0.809708 13.0129C0.818272 13.0841 0.847889 13.151 0.894757 13.2051L1.69796 14.1333L1.4163 15.3282C1.39986 15.398 1.40467 15.4711 1.43012 15.5381C1.45556 15.6052 1.50046 15.6631 1.55906 15.7044L2.5623 16.4117L2.57623 17.639C2.57703 17.7106 2.59922 17.7804 2.63996 17.8393C2.68069 17.8983 2.73811 17.9437 2.80483 17.9697L3.94819 18.4163L4.25433 19.6048C4.27221 19.6741 4.31041 19.7366 4.36404 19.7841C4.41767 19.8316 4.48428 19.862 4.55531 19.8714L5.77192 20.0328L6.35263 21.114C6.38661 21.1771 6.43864 21.2286 6.50206 21.262C6.56548 21.2953 6.63741 21.309 6.70864 21.3012L7.9288 21.1667L8.75267 22.0767C8.80081 22.1299 8.86374 22.1674 8.93339 22.1845C9.00304 22.2016 9.07621 22.1975 9.14349 22.1727L10.2951 21.7482L11.3129 22.4341C11.3722 22.4741 11.4421 22.4954 11.5137 22.4954C11.5853 22.4954 11.6552 22.4741 11.7146 22.4341L12.7323 21.7482L13.884 22.1727C13.9513 22.1975 14.0245 22.2016 14.0941 22.1845C14.1637 22.1674 14.2267 22.1298 14.2748 22.0767L15.0987 21.1666L16.3188 21.3014C16.3901 21.3093 16.462 21.2956 16.5255 21.2623C16.5889 21.2289 16.6409 21.1774 16.6748 21.1142L17.2555 20.0329L18.4722 19.8715C18.5432 19.8622 18.6098 19.8318 18.6635 19.7843C18.7171 19.7367 18.7553 19.6743 18.7732 19.6049L19.0793 18.4164L20.2225 17.97C20.2892 17.9439 20.3466 17.8985 20.3873 17.8396C20.4281 17.7807 20.4503 17.711 20.4511 17.6393L20.465 16.412L21.4683 15.7047C21.5269 15.6634 21.5718 15.6055 21.5972 15.5384C21.6226 15.4714 21.6274 15.3983 21.611 15.3285L21.3293 14.1336L22.132 13.2053C22.1789 13.1512 22.2085 13.0842 22.2171 13.0131C22.2256 12.942 22.2128 12.87 22.1801 12.8062L21.6203 11.7139L22.1801 10.6218C22.2128 10.558 22.2256 10.486 22.2171 10.4149C22.2085 10.3438 22.1789 10.2768 22.132 10.2227L21.3288 9.29451L21.6105 8.09959C21.6269 8.0298 21.622 7.95671 21.5966 7.8897C21.5711 7.82269 21.5262 7.76483 21.4676 7.72355ZM21.4299 10.5097L20.8967 11.55C20.8707 11.6008 20.8571 11.657 20.8571 11.714C20.8571 11.771 20.8707 11.8272 20.8967 11.878L21.4299 12.9183L20.6651 13.802C20.6278 13.845 20.6014 13.8962 20.5878 13.9514C20.5742 14.0066 20.5739 14.0643 20.587 14.1196L20.8551 15.2569L19.9 15.9302C19.8535 15.963 19.8155 16.0063 19.789 16.0567C19.7626 16.107 19.7484 16.1629 19.7478 16.2198L19.7343 17.3884L18.6455 17.8135C18.5925 17.8343 18.5451 17.8673 18.5074 17.9099C18.4696 17.9525 18.4425 18.0035 18.4283 18.0587L18.1367 19.1907L16.978 19.3444C16.9216 19.3518 16.8677 19.3726 16.8208 19.405C16.774 19.4374 16.7355 19.4804 16.7085 19.5306L16.156 20.5599L14.9945 20.4318C14.938 20.4256 14.8808 20.4329 14.8276 20.4531C14.7745 20.4732 14.7269 20.5057 14.6887 20.5478L13.9045 21.4142L12.8079 21.0099C12.7545 20.9902 12.6972 20.9835 12.6407 20.9904C12.5842 20.9972 12.5301 21.0173 12.4828 21.0491L11.5134 21.7025L10.5439 21.0492C10.4967 21.0174 10.4426 20.9972 10.3861 20.9904C10.3296 20.9836 10.2723 20.9903 10.2188 21.01L9.12238 21.4143L8.33818 20.548C8.29999 20.5059 8.25238 20.4734 8.19923 20.4533C8.14608 20.4331 8.0889 20.4258 8.03239 20.432L6.87085 20.5601L6.3179 19.5303C6.29095 19.4801 6.25246 19.4371 6.2056 19.4047C6.15873 19.3723 6.10485 19.3515 6.04837 19.3441L4.88975 19.1904L4.59812 18.0584C4.58391 18.0032 4.55681 17.9522 4.51904 17.9096C4.48127 17.867 4.43391 17.834 4.38087 17.8133L3.2921 17.3881L3.27921 16.2196C3.27857 16.1627 3.26444 16.1068 3.23797 16.0564C3.2115 16.0061 3.17346 15.9627 3.12697 15.9299L2.17193 15.2566L2.43998 14.1193C2.45304 14.064 2.45277 14.0064 2.4392 13.9511C2.42562 13.8959 2.39913 13.8447 2.3619 13.8017L1.59689 12.9181L2.13006 11.8778C2.15611 11.8271 2.1697 11.7708 2.1697 11.7138C2.1697 11.6568 2.15611 11.6006 2.13006 11.5499L1.59689 10.5097L2.36173 9.62603C2.39894 9.58304 2.42542 9.53183 2.439 9.47661C2.45257 9.42139 2.45284 9.36374 2.4398 9.30839L2.17171 8.17115L3.12674 7.49781C3.17323 7.46503 3.21127 7.42169 3.23774 7.37134C3.2642 7.32099 3.27834 7.26508 3.27899 7.2082L3.29246 6.0396L4.38123 5.61446C4.43428 5.59374 4.48164 5.5607 4.51941 5.51808C4.55718 5.47546 4.58428 5.42448 4.59848 5.36933L4.89006 4.23729L6.04873 4.08362C6.10521 4.07615 6.15909 4.05538 6.20596 4.02299C6.25282 3.99061 6.29131 3.94755 6.31826 3.89737L6.8708 2.8679L8.0323 2.99601C8.08881 3.00217 8.14598 2.99486 8.19912 2.97469C8.25227 2.95453 8.29989 2.92207 8.33809 2.87998L9.12229 2.01366L10.2188 2.41796C10.2723 2.4376 10.3296 2.44429 10.3861 2.43747C10.4426 2.43065 10.4967 2.41052 10.5439 2.37874L11.5134 1.72535L12.4828 2.37865C12.5301 2.41046 12.5842 2.43061 12.6407 2.43742C12.6972 2.44423 12.7545 2.43751 12.8079 2.41782L13.9044 2.01353L14.6886 2.8798C14.7268 2.9219 14.7744 2.95437 14.8276 2.97454C14.8807 2.9947 14.9379 3.002 14.9944 2.99583L16.1559 2.86772L16.7089 3.89751C16.7358 3.94769 16.7743 3.99075 16.8212 4.02313C16.868 4.05551 16.9219 4.07629 16.9784 4.08375L18.137 4.23743L18.4287 5.36946C18.4429 5.4246 18.47 5.47558 18.5077 5.51819C18.5455 5.56081 18.5929 5.59383 18.6459 5.61455L19.7347 6.03969L19.7476 7.20825C19.7482 7.26513 19.7623 7.32105 19.7888 7.37141C19.8153 7.42176 19.8533 7.46512 19.8998 7.4979L20.8548 8.17119L20.5868 9.30848C20.5737 9.36382 20.574 9.42147 20.5876 9.47668C20.6012 9.5319 20.6276 9.5831 20.6649 9.62608L21.4299 10.5097Z'
                          fill='black'
                        />
                        <path
                          d='M17.9821 11.7139V11.729H18.7009V11.7139C18.7009 11.4632 18.6879 11.2126 18.6622 10.9633L17.9473 11.0375C17.9705 11.2622 17.9821 11.488 17.9821 11.7139Z'
                          fill='black'
                        />
                        <path
                          d='M5.5987 14.338L4.94189 14.63C5.04395 14.8593 5.15791 15.0831 5.2833 15.3006L5.90593 14.9414C5.79308 14.7458 5.69053 14.5444 5.5987 14.338Z'
                          fill='black'
                        />
                        <path
                          d='M6.69678 17.0489C6.88294 17.217 7.07772 17.3754 7.28031 17.5233L7.70397 16.9429C7.52159 16.8097 7.34625 16.6671 7.17865 16.5157L6.69678 17.0489Z'
                          fill='black'
                        />
                        <path
                          d='M16.3213 7.38636C16.4724 7.55428 16.6148 7.72992 16.7477 7.91258L17.3289 7.48968C17.1813 7.28699 17.0232 7.09207 16.8555 6.9057L16.3213 7.38636Z'
                          fill='black'
                        />
                        <path
                          d='M9.28174 18.5481C9.52038 18.6259 9.76293 18.6911 10.0084 18.7435L10.1583 18.0406C9.9375 17.9935 9.71937 17.9348 9.50478 17.8648L9.28174 18.5481Z'
                          fill='black'
                        />
                        <path
                          d='M17.8425 10.369L18.5457 10.2203C18.4937 9.9747 18.4289 9.73201 18.3515 9.49323L17.668 9.71496C17.7376 9.92977 17.7958 10.1481 17.8425 10.369Z'
                          fill='black'
                        />
                        <path
                          d='M17.4254 9.08321L18.0818 8.79059C17.9796 8.5613 17.8655 8.33752 17.7398 8.10018L17.1177 8.48009C17.2307 8.67562 17.3334 8.87694 17.4254 9.08321Z'
                          fill='black'
                        />
                        <path
                          d='M10.751 18.8614C11.0003 18.8876 11.2509 18.901 11.5016 18.9014L11.5027 18.1827C11.2768 18.1823 11.0511 18.1703 10.8264 18.1467L10.751 18.8614Z'
                          fill='black'
                        />
                        <path
                          d='M6.27456 15.5095L5.69287 15.9318C5.84024 16.1348 5.99808 16.33 6.16576 16.5166L6.70033 16.0361C6.54939 15.8681 6.40728 15.6923 6.27456 15.5095Z'
                          fill='black'
                        />
                        <path
                          d='M16.3239 6.3737C16.1375 6.20575 15.9426 6.04761 15.7399 5.8999L15.3169 6.48102C15.4994 6.61397 15.6748 6.75633 15.8425 6.90751L16.3239 6.3737Z'
                          fill='black'
                        />
                        <path
                          d='M15.1097 5.48965C14.8926 5.36403 14.669 5.24983 14.44 5.14752L14.147 5.80383C14.3531 5.89591 14.5542 5.99868 14.7496 6.11173L15.1097 5.48965Z'
                          fill='black'
                        />
                        <path
                          d='M9.51797 5.55865L9.29651 4.87494C9.05769 4.9524 8.82311 5.04237 8.59375 5.14447L8.88601 5.80109C9.09228 5.70929 9.30323 5.62836 9.51797 5.55865Z'
                          fill='black'
                        />
                        <path
                          d='M10.8408 5.27967L10.767 4.5647C10.5175 4.59051 10.2694 4.62932 10.0239 4.68096L10.1722 5.3843C10.3931 5.33775 10.6162 5.30283 10.8408 5.27967Z'
                          fill='black'
                        />
                        <path
                          d='M12.2681 4.56556C12.0187 4.53963 11.7682 4.52657 11.5174 4.52643L11.5171 5.24518C11.743 5.24531 11.9687 5.25708 12.1934 5.28044L12.2681 4.56556Z'
                          fill='black'
                        />
                        <path
                          d='M13.7378 4.87732C13.4991 4.79982 13.2565 4.73485 13.011 4.68268L12.8618 5.38575C13.0826 5.4327 13.3008 5.49118 13.5155 5.56095L13.7378 4.87732Z'
                          fill='black'
                        />
                        <path
                          d='M16.7402 15.526L17.3206 15.9501C17.4685 15.7475 17.6058 15.5374 17.7319 15.3206L17.1106 14.9594C16.997 15.1545 16.8734 15.3437 16.7402 15.526Z'
                          fill='black'
                        />
                        <path
                          d='M14.7378 17.3231L15.0967 17.9459C15.314 17.8205 15.5247 17.684 15.7279 17.5367L15.3061 16.9548C15.1232 17.0874 14.9335 17.2103 14.7378 17.3231Z'
                          fill='black'
                        />
                        <path
                          d='M7.91016 17.9342C8.12714 18.0601 8.35056 18.1746 8.57949 18.2772L8.87324 17.6213C8.66723 17.529 8.4662 17.426 8.27097 17.3127L7.91016 17.9342Z'
                          fill='black'
                        />
                        <path
                          d='M15.8325 16.5296L16.3126 17.0642C16.4993 16.8966 16.6771 16.7195 16.8453 16.5335L16.3122 16.0514C16.1607 16.219 16.0006 16.3786 15.8325 16.5296Z'
                          fill='black'
                        />
                        <path
                          d='M17.4189 14.3574L18.0748 14.6515C18.1775 14.4224 18.268 14.1882 18.346 13.9496L17.663 13.7264C17.5927 13.9409 17.5113 14.1515 17.4189 14.3574Z'
                          fill='black'
                        />
                        <path
                          d='M13.5024 17.8713L13.7231 18.5553C13.962 18.4782 14.1967 18.3886 14.4262 18.2867L14.1347 17.6298C13.9283 17.7213 13.7173 17.8019 13.5024 17.8713Z'
                          fill='black'
                        />
                        <path
                          d='M5.18569 10.3617L4.48275 10.2125C4.43067 10.4579 4.39144 10.7059 4.36523 10.9554L5.08003 11.0304C5.10356 10.8058 5.13883 10.5826 5.18569 10.3617Z'
                          fill='black'
                        />
                        <path
                          d='M5.04492 11.7139V11.7064H4.32617V11.7139C4.32617 11.962 4.33884 12.2099 4.36413 12.4567L5.07911 12.3832C5.05633 12.1608 5.04492 11.9374 5.04492 11.7139Z'
                          fill='black'
                        />
                        <path
                          d='M12.1787 18.1488L12.2517 18.8638C12.5013 18.8383 12.7493 18.7998 12.9949 18.7484L12.8476 18.0449C12.6266 18.0911 12.4033 18.1258 12.1787 18.1488Z'
                          fill='black'
                        />
                        <path
                          d='M5.60434 9.07699L4.94812 8.78369C4.84578 9.01285 4.75553 9.24721 4.67773 9.48582L5.36113 9.70841C5.43111 9.49383 5.51229 9.28306 5.60434 9.07699Z'
                          fill='black'
                        />
                        <path
                          d='M5.18288 13.0519L4.47949 13.1999C4.53121 13.4455 4.59578 13.6883 4.67293 13.9272L5.35686 13.7061C5.28743 13.4912 5.22935 13.2729 5.18288 13.0519Z'
                          fill='black'
                        />
                        <path
                          d='M17.8394 13.0729L18.5422 13.2232C18.5946 12.9778 18.6341 12.7299 18.6606 12.4804L17.9459 12.4046C17.922 12.6291 17.8865 12.8521 17.8394 13.0729Z'
                          fill='black'
                        />
                        <path
                          d='M7.18854 6.90326L6.70788 6.36896C6.52146 6.53677 6.34386 6.71412 6.17578 6.90029L6.70941 7.38177C6.86077 7.21411 7.02069 7.0544 7.18854 6.90326Z'
                          fill='black'
                        />
                        <path
                          d='M6.28302 7.90756L5.70218 7.48413C5.55447 7.68685 5.41739 7.89712 5.2915 8.11407L5.91331 8.47461C6.02661 8.2793 6.15001 8.09003 6.28302 7.90756Z'
                          fill='black'
                        />
                        <path
                          d='M8.28274 6.10834L7.92336 5.4859C7.70611 5.6115 7.49553 5.74831 7.29248 5.89577L7.71502 6.47724C7.89771 6.34448 8.0872 6.22134 8.28274 6.10834Z'
                          fill='black'
                        />
                        <path
                          d='M17.2637 11.7139C17.2637 10.5766 16.9264 9.46492 16.2946 8.51934C15.6628 7.57376 14.7648 6.83677 13.7141 6.40156C12.6634 5.96636 11.5073 5.85249 10.3919 6.07435C9.27651 6.29622 8.25196 6.84385 7.44781 7.64801C6.64366 8.45216 6.09602 9.47671 5.87416 10.5921C5.65229 11.7075 5.76616 12.8636 6.20137 13.9143C6.63657 14.965 7.37356 15.863 8.31915 16.4948C9.26473 17.1266 10.3764 17.4639 11.5137 17.4639C13.0381 17.4621 14.4997 16.8558 15.5776 15.7778C16.6556 14.6999 17.2619 13.2383 17.2637 11.7139ZM11.5137 16.7451C10.5186 16.7451 9.54585 16.45 8.71846 15.8972C7.89108 15.3444 7.24621 14.5586 6.86541 13.6392C6.4846 12.7199 6.38497 11.7083 6.5791 10.7323C6.77323 9.75635 7.25241 8.85987 7.95604 8.15624C8.65968 7.45261 9.55616 6.97343 10.5321 6.77929C11.5081 6.58516 12.5197 6.6848 13.439 7.0656C14.3584 7.4464 15.1442 8.09127 15.697 8.91866C16.2498 9.74604 16.5449 10.7188 16.5449 11.7139C16.5434 13.0478 16.0129 14.3266 15.0696 15.2698C14.1264 16.213 12.8476 16.7436 11.5137 16.7451Z'
                          fill='black'
                        />
                        <path
                          d='M14.7912 9.51401C14.5888 9.31215 14.3147 9.19879 14.0288 9.19879C13.743 9.19879 13.4688 9.31215 13.2665 9.51401L10.0757 12.7048L9.40058 12.0296C9.19838 11.8274 8.92415 11.7139 8.63821 11.7139C8.35227 11.7139 8.07803 11.8274 7.87584 12.0296C7.67365 12.2318 7.56006 12.5061 7.56006 12.792C7.56006 13.0779 7.67365 13.3522 7.87584 13.5544L9.31334 14.9919C9.41345 15.092 9.53231 15.1714 9.66311 15.2256C9.79392 15.2798 9.93412 15.3077 10.0757 15.3077C10.2173 15.3077 10.3575 15.2798 10.4883 15.2256C10.6191 15.1714 10.738 15.092 10.8381 14.9919L14.7912 11.0387C14.8913 10.9386 14.9707 10.8198 15.0249 10.689C15.0791 10.5582 15.107 10.418 15.107 10.2764C15.107 10.1348 15.0791 9.99459 15.0249 9.86379C14.9707 9.73298 14.8913 9.61413 14.7912 9.51401ZM14.2829 10.5305L10.3298 14.4836C10.2624 14.551 10.171 14.5888 10.0757 14.5888C9.98041 14.5888 9.88902 14.551 9.82163 14.4836L8.38413 13.0461C8.31799 12.9784 8.28119 12.8874 8.28173 12.7928C8.28227 12.6982 8.3201 12.6076 8.387 12.5407C8.45391 12.4738 8.54451 12.436 8.63912 12.4355C8.73373 12.435 8.82474 12.4718 8.89238 12.5379L9.82167 13.4671C9.88907 13.5345 9.98047 13.5724 10.0758 13.5724C10.1711 13.5724 10.2625 13.5345 10.3299 13.4671L13.7748 10.0223C13.8079 9.98798 13.8476 9.9606 13.8914 9.94177C13.9353 9.92293 13.9824 9.91302 14.0302 9.9126C14.0779 9.91219 14.1252 9.92128 14.1694 9.93935C14.2135 9.95742 14.2537 9.98411 14.2874 10.0178C14.3211 10.0516 14.3478 10.0917 14.3659 10.1359C14.384 10.18 14.3931 10.2274 14.3926 10.2751C14.3922 10.3228 14.3823 10.37 14.3635 10.4138C14.3446 10.4577 14.3173 10.4973 14.2829 10.5305H14.2829Z'
                          fill='black'
                        />
                        <path
                          d='M11.5137 3.08893C6.75784 3.08893 2.88867 6.95809 2.88867 11.7139C2.88867 16.4698 6.75784 20.3389 11.5137 20.3389C16.2695 20.3389 20.1387 16.4698 20.1387 11.7139C20.1387 6.95809 16.2695 3.08893 11.5137 3.08893ZM11.5137 19.6202C7.15414 19.6202 3.60742 16.0735 3.60742 11.7139C3.60742 7.35439 7.15414 3.80768 11.5137 3.80768C15.8732 3.80768 19.4199 7.35439 19.4199 11.7139C19.4199 16.0735 15.8732 19.6202 11.5137 19.6202Z'
                          fill='black'
                        />
                      </svg>
                      &nbsp; Verified Seller{' '}
                    </React.Fragment>
                  ) : (
                    <div></div>
                  )}
                </div>
                <br />
                <button
                  id='enquiry'
                  onClick={() => setModalSellerInfo(true)}
                  className='btn btn-secondary'
                >
                  Get Seller Info
                </button>
              </div>
              {/* <div className='input-group rounded ' style={{ marginTop: '1rem' }}>
              <input
              type='search'
              className='form-control rounded'
              placeholder='Enter Zip Code Check'
                aria-label='Search'
                aria-describedby='search-addon'
                />
                <span> &nbsp; &nbsp; </span>
                <button className='btn btn-warning'>Check</button>
              </div> */}
              {user.address.length !== 0 ? (
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className='card'>
                    <div className='card-title'>Tell us how much you need</div>
                    <div className='card-text'>
                      {' '}
                      <div
                        className='input-group rounded '
                        style={{ marginBottom: '1rem' }}
                      >
                        <input
                          type='search'
                          className='form-control rounded'
                          placeholder='Amount'
                          aria-label='Search'
                          aria-describedby='search-addon'
                          name='amount'
                          value={formData.amount}
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <span> &nbsp; &nbsp; </span>
                        <input
                          type='search'
                          className='form-control rounded'
                          placeholder='Enter the unit eg: Kg, g.'
                          aria-label='Search'
                          aria-describedby='search-addon'
                          name='unit'
                          value={formData.unit}
                          onChange={(e) => onChange(e)}
                          required
                        />{' '}
                        <br />
                      </div>
                      <button
                        type='submit'
                        className='btn btn-warning'
                        style={{ paddingLeft: '4rem', paddingRight: '4rem' }}
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div
                  className='container'
                  style={{
                    padding: '2rem 2rem 2rem 2rem',
                    marginTop: '2rem',
                    border: '1px solid #eee',
                  }}
                >
                  <button
                    className='btn btn-warning'
                    onClick={() => setModalAddAddress(true)}
                    style={{ paddingLeft: '4rem', paddingRight: '4rem' }}
                  >
                    Add Address Details
                  </button>
                  <br />
                  <br />
                  please add your address details in order to send enquiry to
                  the seller
                </div>
              )}
            </center>
          ) : (
            <center>
              <div className='card'>
                <div className='card-body'>
                  <p className='card-title' style={{ fontWeight: 700 }}>
                    Login to view more information.
                  </p>{' '}
                  <button
                    onClick={() => setModalLoginShow(true)}
                    className='btn btn-warning'
                  >
                    Login
                  </button>
                </div>
              </div>
            </center>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
margin-top:85rem
.gallery{
  position:sticky;
}
p{
  margin:1rem;
}
.btn-secondary{
 width:10rem
}
overflow:hidden;
.card{
    width:22rem;
    padding:1rem;
    margin-top:2rem;
}
.input-group{ 
 
width: 19rem;
}
.pinfodetail{
    padding-left:2rem;
    padding-top:1rem;
}
.pheadinfo{
    font-size:1.5rem;
    font-weight:700;
    }
.companyinfo{
}
 hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid black;
    margin-top: 1rem;
    margin-left: 5rem;
    margin-right: 7rem;
    padding: 0;
  }
.glp{
    font-size:1.3rem;
}
.price{
    font-size:2rem;
}
    .rating{
display:flex;
    }
    .pinfo{
        
    }
.pname{
    font-size: 1.7rem;
    padding:bottom:1.7rem;
}
  .phead {
    font-weight: 700;
    font-size: 2rem;
    color: black;
    padding:bottom:2rem;
  }
  mainimg {
    height: 100rem;
  }
  .imagebanner {
  }
  
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    currentCompany: state.auth.currentCompany,
    currentCompanyUser: state.auth.currentCompanyUser,
  }
}

export default connect(mapStateToProps, { itemAddedToRecentlyViewed })(
  Productdetailinfo
)
