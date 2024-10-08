import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
const Footer = ({ user, isAuthenticated, currentUserMemberAccountExists }) => {
  user = JSON.parse(localStorage.getItem('user') || '[]')
  return (
    <Wrapper>
      <div className='col-12 content'>
        <div className='row'>
          <div className='col-md-3 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Customer Service</h5>
                <div className='card-text'>
                  <Link to='/help-center'> Help Center</Link>
                  {isAuthenticated ? (
                    <React.Fragment>
                      {' '}
                      <br /> <Link to='/faqs'> FAQ</Link>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                  <br />
                  <a
                    target='blank'
                    href='https://drive.google.com/file/d/12xltxO07cgp1EqITF8d6f9RAE31Ov7x8/view?usp=sharing'
                  >
                    {' '}
                    Terms and Conditions
                  </a>
                  <br />
                  {isAuthenticated ? <Link to='/reports'> Reports</Link> : ''}
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Sell on Urja</h5>
                <div className='card-text'>
                  <HashLink to='/comming_soon#underConst'>
                    Suppliers prime membership
                  </HashLink>
                  <br />
                  <HashLink to='/comming_soon#underConst'>
                    {' '}
                    Partner Program
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>About Us</h5>
                <div className='card-text'>
                  <HashLink to='/who-r-we#underConst'> Who are we </HashLink>
                  <br />
                  <HashLink to='/comming_soon#underConst'> Programs</HashLink>
                  <br />
                  {isAuthenticated ? (
                    !currentUserMemberAccountExists ? (
                      <HashLink to='/become-member'>Become a member</HashLink>
                    ) : (
                      <HashLink to='/mbw'>Become a member</HashLink>
                    )
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Contact Us</h5>
                <div className='card-text'>
                  <a href='#!'>urja.customercare@gmail.com</a>
                  <br />
                  <a href='#!'>+91 8380000665</a>
                  <br />
                </div>
                <iframe
                  title='map'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108376.92662906153!2d73.9675397630867!3d17.672378205372876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc239be08d96bbd%3A0x5f4adf559fb4b19a!2sSatara%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628163702358!5m2!1sen!2sin'
                  width='200'
                  height='150'
                  style={{ border: '0' }}
                  loading='lazy'
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <center>
          <div className='container'>
            <Link to='/comming_soon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-facebook'
                viewBox='0 0 20 20'
              >
                <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
              </svg>
            </Link>
            <span> &nbsp; &nbsp; </span>
            <Link to='/comming_soon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-instagram'
                viewBox='0 0 20 20'
              >
                <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' />
              </svg>
            </Link>
            <span> &nbsp; &nbsp; </span>
            <Link to='/comming_soon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-twitter'
                viewBox='0 0 20 20'
              >
                <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
              </svg>
            </Link>
            <span> &nbsp; &nbsp; </span>
          </div>
          <hr />
          <p style={{ color: 'var(--clr-grey-3)' }}>
            Copyright &#169; 2021 URJA | All Rights Reserved <br />
            Developed by : The Source
          </p>
        </center>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  .text-right {
    padding: 0rem 5rem 2rem 0rem;
  }
  a:hover {
    color: #ffc232;
  }

  padding-left: 3rem;
  padding-right: 3rem;
  a:hover {
    color: #ffc232;
  }
  .text-right {
    color: white;
    padding-right: 2rem;
  }
  .card-title {
    padding-bottom: 1rem;
    padding-top: 1rem;
    font-size: 1.3rem;
    font-weight: 700;
  }
  a {
    color: white;
    margin-bottom: 5rem;
    line-height: 2.5rem;
    font-size: 1rem;
  }
  .card-text {
    text-align: left;
    color: white;
  }
  .card {
    border: none;
    background-color: #25211c;
    width: 20rem;
  }
  .row {
    color: white;
  }
  background: #25211c;
  overflow: hidden;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    .card-title {
      padding-bottom: 2.5rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
    a {
      color: white;
      margin-bottom: 5rem;
      line-height: 2.5rem;
      font-size: 1rem;
    }
  }
  @media (min-width: 1400px) {
    .card-title {
      padding-bottom: 2.5rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
    a {
      color: white;
      margin-bottom: 5rem;
      line-height: 2.5rem;
      font-size: 1rem;
    }
  }
`

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user,
    currentItem: state.auth.currentItem,
    currentUserMemberAccountExists: state.auth.currentUserMemberAccountExists,
  }
}

export default connect(mapStateToProps, {})(Footer)
