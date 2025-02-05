import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Sidebar from '../layout/Sidebar'; 
import {
  saveShop,
  listShops,
  deleteShop,
} from '../actions/shopActions';

function ShopsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [uploading, setUploading] = useState(false);
  const shopList = useSelector((state) => state.shopList);
  const { shops } = shopList;

  const shopSave = useSelector((state) => state.shopSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = shopSave;

  const shopDelete = useSelector((state) => state.shopDelete);
  const {
    success: successDelete
  } = shopDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listShops());
    return () => {
      //
    };
  }, [successSave, successDelete, dispatch]);

  const openModal = (shop) => {
    setModalVisible(true);
    setId(shop._id);
    setName(shop.name || "");
    setDescription(shop.description || "");
    setAddress(shop.address || "");
    setImage(shop.image || "");
    setOwner(shop.owner || "");
    setPhone(shop.phone || "");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShop({
        _id: id,
        name,
        image,
        owner,
        phone,
        description,
        address,
      })
    );
  };
  const deleteHandler = (shop) => {
      if (window.confirm("Are you sure to delete this data?")) {
        dispatch(deleteShop(shop._id));
      }
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Shops</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'shops'} />
                        </div>
                        <div className="col-10">
                {modalVisible && (
                    <div className="form1">
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <h2>{id ? 'Edit' : 'Create'} Shop</h2>
                          </li>
                          <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                          </li>

                          <li>
                            <label htmlFor="name">Shop Name</label>
                            <input
                              type="text"
                              name="name"
                              value={name}
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="owner">Owner Name</label>
                            <input
                              type="text"
                              name="owner"
                              value={owner}
                              id="owner"
                              onChange={(e) => setOwner(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="phone">Phone No.</label>
                            <input
                              type="text"
                              name="phone"
                              value={phone}
                              id="phone"
                              onChange={(e) => setPhone(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="image">Image</label>
                            <input
                              type="hidden"
                              name="image"
                              value={image}
                              id="image"
                              onChange={(e) => setImage(e.target.value)}
                            ></input>
                            <input type="file" onChange={uploadFileHandler}></input>
                            {uploading && <div>Uploading...</div>}
                          </li>
                          <li>
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              name="address"
                              value={address}
                              id="address"
                              onChange={(e) => setAddress(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="description">Description</label>
                            <textarea
                              name="description"
                              value={description}
                              id="description"
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
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
                <div className="product-header">
                    <h2>Shops</h2>
                    <button className="btn btn-primary btn-lg" onClick={() => openModal({})}>
                      Create Shop
                    </button>
                </div>
                <div className="product-list">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th align="right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shops.map((shop) => (
                        <tr key={shop._id}>
                          <td>{shop._id}</td>
                          <td>{shop.name}</td>
                          <td>{shop.createdAt}</td>
                          <td>{shop.address}</td>
                          <td>
                            <button className="btn btn-info btn-sm" onClick={() => openModal(shop)}>
                              Edit
                            </button>{' '}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteHandler(shop)}
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
export default ShopsScreen;