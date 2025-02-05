import React, { useState, useEffect } from 'react';
import { update } from '../actions/userActions';
import Sidebar from '../layout/Sidebar'; 
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    return () => {

    };
  }, [userInfo])

  return (
          <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Profile</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'profile'} />
                        </div>
                        <div className="col-10">
                            <div className="profile">
                                <div className="profile-info">
                                    <div className="form1">
                                        <form onSubmit={submitHandler} >
                                            <ul className="form-container">
                                                <li>
                                                  <h2>User Profile</h2>
                                                </li>
                                        <li>
                                          {loading && <div>Loading...</div>}
                                          {error && <div>{error}</div>}
                                          {success && <div>Profile Saved Successfully.</div>}
                                        </li>
                                        <li>
                                          <label htmlFor="name">
                                            Name
                                      </label>
                                          <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                                          </input>
                                        </li>
                                        <li>
                                          <label htmlFor="email">
                                            Email
                                      </label>
                                          <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                                          </input>
                                        </li>
                                        <li>
                                          <label htmlFor="password">Password</label>
                                          <input value={password || ''} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                                          </input>
                                        </li>
                                        <li>
                                            <div>
                                                <button type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                        </li>
                                      </ul>
                                    </form>
                                  </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileScreen;