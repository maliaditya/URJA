import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
  const [showPassword, setshowPassword] = useState('password')
  React.useEffect(() => {
      let title = 'URJA | Reset Password '
      document.title = title;
    });
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5 border border-secondary' style={{borderRadius:'1rem',padding:'10vh'}}>
            <h4>Reset Password</h4>
<hr />
<p>Note: Password should not contain your name or be similar to your email, Do not use sequence like '12345678' or 'qwertyuio' </p>
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type={showPassword}
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <br />
                <div className='form-group'>
                    <input
                        className='form-control'
                        type={showPassword}
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                 {showPassword === 'password' ? (
              <a
                className='showpass mt-10'
                href='#!'
                onClick={() => {
                  setshowPassword('re')
                }}
              >
                show password&nbsp;
                <AiFillEye />
              </a>
            ) : (
              <a
                className='showpass'
                href='#!'
                onClick={() => {
                  setshowPassword('password')
                }}
              >
                hide password&nbsp;
                <AiFillEyeInvisible />
              </a>
            )}
                <br />
                <br />
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
