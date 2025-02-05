import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../layout/Sidebar'; 
import {
  saveUser,
  listUsers,
  deleteUser,
} from '../actions/userActions';

function UsersScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [isVerified, setIsVerified] = useState('');
  
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userSave = useSelector((state) => state.userSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = userSave;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete
  } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listUsers());
    return () => {
      //
    };
  }, [successSave, successDelete, dispatch]);

  const openModal = (user) => {
    setModalVisible(true);
    setId(user._id);
    setName(user.name || "");
    setEmail(user.email || "");
    setPassword(user.password || "");
    setIsAdmin(user.isAdmin || "");
    setIsVerified(user.isVerified || "");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveUser({
        _id: id,
        name,
        email,
        password,
        isAdmin,
        isVerified,
      })
    );
  };
  const deleteHandler = (user) => {
      if (window.confirm("Are you sure to delete this data?")) {
        dispatch(deleteUser(user._id));
      }
  };
  
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Users</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'users'} />
                        </div>
                        <div className="col-10">
                {modalVisible && (
                    <div className="form1">
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <h2>{id ? 'Edit' : 'Create'} User</h2>
                          </li>
                          <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                          </li>

                          <li>
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={name}
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="email">Email</label>
                            <input
                              type="text"
                              name="email"
                              value={email}
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              name="password"
                              value={password}
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="isVerified">Is Verified</label>
                            <select 
                              name="isVerified"
                              id="isVerified"
                              onChange={(e) => setIsVerified(e.target.value)}
                            >
                                <option value="true" selected={(isVerified) ? "selected" :""}>Yes </option>
                                <option value="false" selected={(!isVerified) ? "selected" :""}>No</option>
                            </select>
                          </li>
                          <li>
                            <label htmlFor="email">Is Admin</label>
                            <select 
                              name="isAdmin"
                              id="isAdmin"
                              onChange={(e) => setIsAdmin(e.target.value)}
                            >
                                <option value="true" selected={(isAdmin) ? "selected" :""}>Yes</option>
                                <option value="false" selected={(!isAdmin) ? "selected" :""}>No</option>
                            </select>
                          </li>
                          <li>
                            <div>
                            <button type="submit" className="btn btn-primary btn-lg">
                              {id ? 'Update' : 'Create'}
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={() => setModalVisible(false)}
                              className="btn btn-secondary btn-lg"
                            >
                              Back
                            </button>
                    </div>
                          </li>
                        </ul>
                      </form>
                    </div>
                )}
                
                <div className="product-list">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th align="right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <button className="btn btn-info btn-sm" onClick={() => openModal(user)}>
                              Edit
                            </button>{' '}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteHandler(user)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
          </div>
                </div>
            </div>
  
        </section>
    </>
  );
}
export default UsersScreen;
