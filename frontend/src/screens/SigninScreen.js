import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { useForm } from "react-hook-form";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function SigninScreen(props) {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [verified, setVerified] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    var vUserId = props.match.params.id;
    if (userInfo) {
      props.history.push(redirect);
    }
    if (vUserId) {
        axios.post('/api/users/verify-email', {id:vUserId}).then((response) => {
            setVerified(response.data);
        }).catch((err) => {
          console.log(err);
        });
    }
    return () => {
      //
    };
  }, [userInfo, props, redirect]);

  const submitHandler = (e) => {
    dispatch(signin(email, password));

  }
  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post("http://localhost:5000/api/users/facebooklogin", {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log('FACEBOOK SIGNIN ERROR', error.response);
      });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post("http://localhost:5000/api/users/googlelogin", {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  }
  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  }

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Sign In</span>
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
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {verified && <div className="alert alert-success">{verified.message}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={register({
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
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} ref={register({ required: true })}>
          </input>
          {errors.password && <span className="text-danger">This field is required</span>}
        </li>
        <li>
          <button type="submit" className="btn btn-primary btn-lg">Signin</button>
        </li>
        <li style={{textAlign:"center"}}>
          OR
        </li>
        <li>
        <GoogleLogin
        clientId="687167937028-bdnjkk7hqt4ad84umks5hki9vd3js2qg.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        </li>
        <li>
        
          <FacebookLogin
        appId="2048894621900811"
        autoLoad={false}
        callback={responseFacebook}
        buttonStyle={{width:300,height:40,fontSize:18,padding:6}}  />

        </li>
        <li className="text-right">
            <Link to="/reset">Forgot password?</Link>
        </li>
        <li>
          New User?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="btn btn-secondary text-center" >Create Account</Link>
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
export default SigninScreen;