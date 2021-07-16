import React from 'react'
import { Link } from 'react-router-dom'
const SignupInfo = () => {
    return (
        <section className='container' style={{padding:'10vh'}}>

            <div className="jumbotron">
                <h3 >Thank you for signing up for a URJA account!</h3>
                <p className="lead">Please verify your email address in order to access your URJA account. </p>
                <hr className="my-4"/>
              
                <Link className="btn btn-primary " to="/" role="button">Back to home</Link>
            </div>
        </section>
    )
}

export default SignupInfo
