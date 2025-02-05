import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Sidebar from '../layout/Sidebar'; 
import {
  saveProduct,
  listProducts,
  deleteProdcut,
  deleteProductReview,
} from '../actions/productActions';
import {
  listShops,
} from '../actions/shopActions';
import Rating from '../components/Rating';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReviewVisible, setModalReviewVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [shopId, setShopId] = useState('');
  const [reviews, setReviews] = useState('');
  const [uploading, setUploading] = useState(false);
  const shopList = useSelector((state) => state.shopList);
  const { shops} = shopList;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete
  } = productDelete;

const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const {
    success: successReviewDelete,
    product:productReview
  } = productReviewDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    
    if (successReviewDelete) {
        console.log(productReview.data.reviews);
        setReviews(productReview.data.reviews);
    }
    dispatch(listProducts());
    dispatch(listShops());
    return () => {
      //
    };
  }, [successSave, successDelete, successReviewDelete,productReview, dispatch]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name || "");
    setPrice(product.price || "");
    setDescription(product.description || "");
    setImage(product.image || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setCountInStock(product.countInStock || "");
    setShopId(product.shopId || "");
  };

  const openReviewModal = (product) => {
    setModalReviewVisible(true);
    setId(product._id);
    setReviews(product.reviews || "");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        shopId
      })
    );
  };
  const deleteHandler = (product) => {
      if (window.confirm("Are you sure to delete this data?")) {
        dispatch(deleteProdcut(product._id));
      }
  };
  const deleteReviewHandler = (productId, reviewId) => {
        if (window.confirm("Are you sure to delete this data?")) {
            dispatch(deleteProductReview(productId, reviewId));
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
                    <span className="breadcrumb-item active">Profile</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'products'} />
                        </div>
                        <div className="col-10">
                {modalVisible && (
                    <div className="form1">
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <h2>{id ? 'Edit' : 'Create'} Product</h2>
                          </li>
                          <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                          </li>
                          <li>
                            <label htmlFor="name">Shop Name</label>
                            <select 
                              name="shopId"
                              value={shopId}
                              id="shopId"
                              onChange={(e) => setShopId(e.target.value)}
                            >
                                <option value="">Select Shop</option>
                                {shops.map((shop) => (
                                    <option key={shop._id} value={shop._id}>{shop.name}</option>        
                                ))}
                            </select>
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
                            <label htmlFor="price">Price</label>
                            <input
                              type="text"
                              name="price"
                              value={price}
                              id="price"
                              onChange={(e) => setPrice(e.target.value)}
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
                            <label htmlFor="brand">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={brand}
                              id="brand"
                              onChange={(e) => setBrand(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="countInStock">CountInStock</label>
                            <input
                              type="text"
                              name="countInStock"
                              value={countInStock}
                              id="countInStock"
                              onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="name">Category</label>
                            <input
                              type="text"
                              name="category"
                              value={category}
                              id="category"
                              onChange={(e) => setCategory(e.target.value)}
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
                {modalReviewVisible && (
                    <>
                    <h3>Reviews</h3>
                    <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Comment</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                      <tr key={review._id}>
                        <td>{review.name}</td>
                        <td><Rating value={review.rating}></Rating></td>
                        <td>{review.createdAt.substring(0, 10)}</td>
                        <td>{review.comment}</td>
                        <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteReviewHandler(id, review._id)}
                            >
                              Delete
                            </button>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                    </table>
                    <hr />
                    </>
                )}
    
                    {loading && <div>Loading...</div>}
                    {error && <div>{error} </div>}
                <div className="product-header">
                    <h2>Products</h2>
                    <button className="btn btn-primary btn-lg" onClick={() => openModal({})}>
                      Create Product
                    </button>
                </div>
                <div className="product-list">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Brand</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.createdAt}</td>
                          <td>{product.brand}</td>
                          <td>
                            <button className="btn btn-success btn-sm" onClick={() => openReviewModal(product)}>
                              Reviews
                            </button>{' '}
                            <button className="btn btn-info btn-sm" onClick={() => openModal(product)}>
                              Edit
                            </button>{' '}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteHandler(product)}
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
export default ProductsScreen;