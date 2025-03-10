import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { success, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success, props, order]);

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    //const data = await fetch('http://localhost:5000/razorpay', { method: 'POST' }).then((t) =>
      //  t.json()
    //)

  //  console.log(data)

    const options = {
        key: __DEV__ ? 'rzp_test_ncMzX4VT8nwSAX' : 'PRODUCTION_KEY',
        currency: 'INR',
        amount: totalPrice * 100,
      //  order_id: order._id,
        name: 'Fastmart',
        description: 'On demand delivery of books and stationery',
        image:'',
        handler: function (response) {
            alert("Payment Successful")
        },
        prefill: {
            

        }
    }
    let paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

 
  

  return (
    <div className="placeorder-screen">
  <section className="product-sec">
    <div className="container">
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
            {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
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
                      <img src={item.image} alt="" className="img-fluid" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
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
      </div>
      <div className="placeorder-action">

        <ul>
        <li>
           <button className="btn btn-primary full-width" onClick={displayRazorpay} >Make Payment</button>
           </li>
          <li>
            <button className="btn btn-primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>Rs{itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>Rs{shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>Rs{taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>Rs{totalPrice}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
</div>
  )

}

export default PlaceOrderScreen;