import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registeract } from '../actions/userActions';
import { useForm } from "react-hook-form";

function RegisterScreen(props) {
    const { register, handleSubmit, errors, getValues  } = useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, success, error } = userRegister;
  
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
       props.history.push(props.location.search);
    }
    if (success) {
       document.getElementById("frmRegister").reset(); 
    }
    return () => {
      //
    };
  }, [userInfo, props, redirect, success]);

  const submitHandler = (e) => {
    dispatch(registeract(name, email, password));
  }
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Register</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="offset-4 col-4">
                            <div className="form1">
    <form id="frmRegister" onSubmit={handleSubmit(submitHandler)}>
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {success && <div className="alert alert-info">A verification link has been sent to your email account</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} ref={register({
                required: "This field is required"})}>
          </input>
          {/* errors will return when field validation fails  */}
          <span className="text-danger">{errors.name?.message}</span>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} ref={register({
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
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} ref={register({
          required: "This field is required",
          minLength: {
            value: 6,
            message: "Minimum length of password is 6"
          }
        })}>
          </input>
        <span className="text-danger">{errors.password?.message}</span>
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword"  ref={register({
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Minimum length of password is 6"
            },
            validate: {
                passwordEqual: value => (value === getValues().password) || 'Password do not match'
            },
          })}></input>
        <span className="text-danger">{errors.rePassword?.message}</span>
        </li>
        <li>
          <button type="submit" className="btn btn-primary btn-lg">Register</button>
        </li>
        <li>
          <span>Already have an account?</span>
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="btn btn-secondary text-center" >Sign In</Link>

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
export default RegisterScreen;