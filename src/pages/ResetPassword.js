import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth'

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
  })
     React.useEffect(() => {
      let title = 'URJA | Reset Password '
      document.title = title;
    });

  const { email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
alert("Reset Password Link Has Been Successfully Send to your Email")

    e.preventDefault()

    reset_password(email)
    setRequestSent(true)
  }

  if (requestSent) {
    return <Redirect to='/' />
  }

  return (
    <div className='container mt-5'>
      <h4>Enter your registered email, to receive a password reset link.</h4>
      <h5>Request Password Reset:</h5>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <br />
        <button  className='btn btn-primary' type='submit'>
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default connect(null, { reset_password })(ResetPassword)
