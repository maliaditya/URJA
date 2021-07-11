import React from 'react'
import { Link } from 'react-router-dom'
const SignupInfo = () => {
    return (
        <section className='container' style={{padding:'10vh'}}>

            <div className="jumbotron">
                <h6 className="display-4">Account Created!</h6>
                <p className="lead">Account activation link has been sent to your email, please activate your account before you login. </p>
                <hr className="my-4"/>
              
                <Link className="btn btn-primary " to="/" role="button">Back to home</Link>
            </div>
        </section>
    )
}

export default SignupInfo
