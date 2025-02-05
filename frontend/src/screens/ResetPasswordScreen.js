import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../actions/userActions';
import { useForm } from "react-hook-form";

function ResetPasswordScreen(props) {
  
    const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const userReset = useSelector(state => state.userReset);
  const { loading, success, error } = userReset;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    dispatch(resetUser(email));
  }
   useEffect(() => {
       setEmail('');
  }, [success])
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Forgot Password</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="offset-4 col-4">
                            <div className="form1">
    <form onSubmit={handleSubmit(submitHandler)}>
      <ul className="form-container">
        <li>
          <h3>Forgot Password</h3>
          <small>Enter your verified email address.</small>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {success && <div className="alert alert-success">Check your email for getting new password.</div>}    
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} ref={register({
                required: "This field is required",
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Please enter valid email address"
                }
              })}>
          </input>
          {/* errors will return when field validation fails  */}
          <span className="text-danger">{errors.email?.message}</span>
        </li>
        <li>
          <button type="submit" className="btn btn-primary btn-lg">Send Confirmation</button>
        </li>
        <li>
          <Link to={"/signin"} className="btn btn-secondary text-center" >Sign In</Link>
        </li>
      </ul>
    </form>
  </div>
  </div>
  </div>
  </div>
  </section>
  </>
          );
}
export default ResetPasswordScreen;