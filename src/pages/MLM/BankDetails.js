import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { load_user,checkAuthenticated } from '../../actions/auth'

const BankDetails = (load_user, checkAuthenticated) => {
  const user = JSON.parse(localStorage.getItem('user') || '[]')
  const api = process.env.REACT_APP_API_URL
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }
  const [bankDetails, setBankDetails] = React.useState({
    upi: '',
    bank_name: '',
    bank_branch: '',
    bank_account: '',
    bank_ifsc: '',
    nominee: '',
    user: '',
    member: '',
  })

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    if (user.user_bankdetails.length !== 0) {

      setBankDetails({
        upi: user.user_bankdetails[0].upi,
        bank_name: user.user_bankdetails[0].bank_name,
        bank_branch: user.user_bankdetails[0].bank_branch,
        bank_account: user.user_bankdetails[0].bank_account,
        bank_ifsc: user.user_bankdetails[0].bank_ifsc,
        nominee: user.user_bankdetails[0].nominee,
        user: user.id,
        member: user.seller_account[0].member_id,
      })
    }
  }, [])
  const onChange = (e) =>
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      upi: bankDetails.upi,
      bank_name: bankDetails.bank_name,
      bank_branch: bankDetails.bank_branch,
      bank_account: bankDetails.bank_account,
      bank_ifsc: bankDetails.bank_ifsc,
      nominee: bankDetails.nominee,
      user: user.id,
      member: user.seller_account[0].member_id,
    }
    console.log('bankDetails', body)

    axios
      .post(`${api}/api/bank-details/`, body, config)
      .then((res) => {
        alert('Bank details updated successfully')
        window.location.reload(false)
      })
      .catch((err) => {
        alert('Upload Failed. Please try again later!')
      })

  }

  if (user.user_bankdetails.length > 0) {
    return (
      <div className='ml-2'>
        <br />
        <h4>Bank Details</h4>
        <hr />
        <p>Bank Name : {bankDetails.bank_name}</p>
        <p>Branch : {bankDetails.bank_branch}</p>
        <p>Account Number : {bankDetails.bank_account}</p>
        <p>IFSC Code : {bankDetails.bank_ifsc}</p>
        <p>UPI : {bankDetails.upi}</p>
        <p>Nominee : {bankDetails.nominee}</p>
      </div>
    )
  }
  // if (!user.user_bankdetails.length) {
  //   return (
  //     <div className='ml-2'>
  //       <br />
  //       <h4>Bank Details</h4>
  //       <hr />
  //       <label className='form-label mt-1'>Bank Name</label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           placeholder='Bank Name'
  //           name='bank_name'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           value={bankDetails.bank_name}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>
  //       <label className='form-label mt-1'>Branch </label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           placeholder='Branch Name'
  //           name='bank_branch'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           value={bankDetails.bank_branch}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>

  //       <label className='form-label mt-1'>Account Number</label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           placeholder='Account Number'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           name='bank_account'
  //           value={bankDetails.bank_account}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>

  //       <label className='form-label mt-1'>IFSC Code</label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           placeholder='IFSC Code'
  //           name='bank_ifsc'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           value={bankDetails.bank_ifsc}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>
  //       <label className='form-label mt-1'>UPI</label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           placeholder='UPI'
  //           name='upi'
  //           value={bankDetails.upi}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>

  //       <label className='form-label mt-1'>Nominee</label>
  //       <div className='password'>
  //         <input
  //           type='text'
  //           className='form-control'
  //           style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
  //           placeholder='Nominee'
  //           name='nominee'
  //           value={bankDetails.nominee}
  //           onChange={(e) => onChange(e)}
  //           required
  //           aria-describedby='emailHelp'
  //         ></input>
  //       </div>

  //       <button
  //         type='submit'
  //         className='btn btn-primary mt-3'
  //         onClick={(e) => {
  //           handleSubmit(e)
  //         }}
  //       >
  //         Update
  //       </button>
  //     </div>
  //   )
  // }
  return (
    <div className='ml-2'>
      <br />
      <h4>Bank Details</h4>
      {console.log('user.user_bankdetails[0])', user.user_bankdetails[0])}
      <hr />
      <label className='form-label mt-1'>Bank Name</label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          placeholder='Bank Name'
          name='bank_name'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          value={bankDetails.bank_name}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>
      <label className='form-label mt-1'>Branch </label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          placeholder='Branch Name'
          name='bank_branch'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          value={bankDetails.bank_branch}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>

      <label className='form-label mt-1'>Account Number</label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          placeholder='Account Number'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          name='bank_account'
          value={bankDetails.bank_account}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>

      <label className='form-label mt-1'>IFSC Code</label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          placeholder='IFSC Code'
          name='bank_ifsc'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          value={bankDetails.bank_ifsc}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>
      <label className='form-label mt-1'>UPI</label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          placeholder='UPI'
          name='upi'
          value={bankDetails.upi}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>

      <label className='form-label mt-1'>Nominee</label>
      <div className='password'>
        <input
          type='text'
          className='form-control'
          style={{ width: '40rem', backgroundColor: '#F5F5F5' }}
          placeholder='Nominee'
          name='nominee'
          value={bankDetails.nominee}
          onChange={(e) => onChange(e)}
          required
          aria-describedby='emailHelp'
        ></input>
      </div>

      <button
        type='submit'
        className='btn btn-primary mt-3'
        onClick={(e) => {
          handleSubmit(e)
        }}
      >
        Submit
      </button>
    </div>
  )
}



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

export default connect(mapStateToProps,{ load_user, checkAuthenticated })(
  BankDetails
)
