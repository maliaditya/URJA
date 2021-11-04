import React from 'react'
const SignupInfo = () => {
  return (
    <section className='container' style={{ padding: '10vh' }}>
      <div className='jumbotron'>

        <h4>Thank you for signing up for a URJA account!</h4>
        <hr />
        <p style={{fontSize:'1.5rem'}} >
          Please <b> Verify Your Email </b> by clicking on the link you have received on your registerd email in order to access your URJA account.{' '}
        </p>
      </div>
      <button className="btn btn-info">Resend Activation Email</button>
    </section>
  )
}

export default SignupInfo
