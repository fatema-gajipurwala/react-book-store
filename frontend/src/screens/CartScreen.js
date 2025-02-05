import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch,productId,qty]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return (
        <div>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href="/">Home</a>
                    <span className="breadcrumb-item active">Shopping Cart</span>
                </div>
            </div>
            <section className="product-sec">
            <div className="container">
                <h2>Shopping Cart</h2>
                <div className="cart">
                    <div className="cart-list">
                      <ul className="cart-list-container">
                        <li>
                          <div>
                            Product
                          </div>
                          <div>
                            Price
                          </div>
                        </li>
                        {
                          cartItems.length === 0 ?
                            <div>
                              Cart is empty
                          </div>
                            :
                            cartItems.map(item =>
                              <li>
                                <div className="cart-image">
                                  <img src={item.image} alt="product" className="img-fluid" />
                                </div>
                                <div className="cart-name">
                                  <p>
                                    <Link to={"/product/" + item.product}>
                                      {item.name}
                                    </Link>
                                  </p>
                                  <div>
                                    <p>Qty:
                                    {/*<select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                      {[...Array(item.countInStock).keys()].map(x =>
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                      )}
                                    </select>*/}
                                    <input type="text" value={item.qty} size="3" onChange={(e) => dispatch(addToCart(item.product, e.target.value))} />
                                    </p>
                                    <p><button type="button" className="btn btn-secondary btn-sm" onClick={() => removeFromCartHandler(item.product)} >
                                      Delete
                                    </button></p>
                                  </div>
                                </div>
                                <div className="cart-price">
                                  Rs{item.price}
                                </div>
                              </li>
                            )
                        }
                      </ul>

                    </div>
                    <div className="cart-action">
                      <h3>
                        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                        :
                         Rs{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                      </h3>
                      <hr />
                      <button onClick={checkoutHandler} className={cartItems.length !== 0 ? "btn btn-primary full-width":"btn"} disabled={cartItems.length === 0}>
                        Proceed to Checkout
                      </button>

                    </div>
                </div>
            </div>    
        </section>
  </div>
)
}
export default CartScreen;