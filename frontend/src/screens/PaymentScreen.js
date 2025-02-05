import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  
 useEffect(() => {
     setPaymentMethod(paymentMethod);
 }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
      props.history.push('placeorder');
      };
  return (
        <>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="offset-3 col-6">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form1">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />{' '}
                <label for="paymentMethod">Cash On Delivery</label>
                <br/>
                <input type="radio" name="paymentMethod" id="paymentMethod2" value="online payment" onChange={(e) => setPaymentMethod(e.target.value)} />{' '}
                <label for="paymentMethod2">Online Payment</label>
              </div>
            </li>

            <li>
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
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
export default PaymentScreen;
