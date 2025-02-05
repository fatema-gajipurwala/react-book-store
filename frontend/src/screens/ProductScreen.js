import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
//import { detailsShop } from '../actions/shopActions';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  
//  const shopDetails = useSelector((state) => state.shopDetails);
//  const { shops, loadingshopDetails, errorshopDetails } = shopDetails;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
   // dispatch(detailsShop(product.shopId));
    return () => {
      //
    };
  }, [productSaveSuccess, dispatch, props]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
        <div className="breadcrumb">
            <div className="container">
                <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/"}>Home</Link>
                <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/shop"}>Shop</Link>
        {/*<Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/shopbooks/"}></Link>*/}
                <span className="breadcrumb-item active">{product.name}</span>
            </div>
        </div>
        <section className="product-sec">
            <div className="container">
                <h1>{product.name}</h1>
                <div className="row">
                    <div className="col-md-6 slider-sec">
                        <div id="myCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="active item carousel-item" data-slide-number="0">
                                    {product.image && (
                                        <img src={product.image} alt="product" className="img-fluid" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 slider-content">
                        <p><Rating value={product.rating} text={'('+product.numReviews + ' reviews)'} /></p>
                        <ul>
                            <li>
                                <span className="name">Category:{' '}</span>
                                <span>{product.category}</span>
                            </li>
                            <li>
                                <span className="name">Brand:{' '}</span>
                                <span>{product.brand}</span>
                            </li>
                            <li>
                                <span className="name">Status:{' '}</span>
                                <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </li>
                            <li className="pt-2 pb-3">
                                <span className="name">Price:</span>
                                <span className="price final">Rs{product.price}</span>
                            </li>
                            <li>
                                <span className="name qty">Qty:{' '}</span>
                                <span>
                                    <input type="text" value={qty} onChange={(e) => { setQty(e.target.value); }} size="1" />
                                </span>
                            </li>
                        </ul>
                        <div className="btn-sec">
                            {(product.countInStock > 0 && !userInfo.isAdmin)  && (
                                <button onClick={handleAddToCart} className="btn btn-primary btn-lg">Add To cart</button>
                            )}
                        </div>
                        <p className="mt-5">{product.description}</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="related-books">
            <div className="container">
                <h2>Reviews</h2>
                {!product.reviews.length && <div>There is no review</div>}
                <ul className="review" id="reviews">
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <div>{review.name}</div>
                      <div>
                        <Rating value={review.rating}></Rating>
                      </div>
                      <div>{review.createdAt.substring(0, 10)}</div>
                      <div>{review.comment}</div>
                    </li>
                  ))}
                  <li>
                    <h3>Write a customer review</h3>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <label htmlFor="rating">Rating</label>
                            <select
                              name="rating"
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very Good</option>
                              <option value="5">5- Excellent</option>
                            </select>
                          </li>
                          <li>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </li>
                          <li>
                            <button type="submit" className="button primary">
                              Submit
                            </button>
                          </li>
                        </ul>
                      </form>
                    ) : (
                      <div>
                        Please <Link to="/signin">Sign-in</Link> to write a review.
                      </div>
                    )}
                  </li>
                </ul>
            </div>
        </section>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
