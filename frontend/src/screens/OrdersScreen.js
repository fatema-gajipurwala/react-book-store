import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import Sidebar from '../layout/Sidebar'; 

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders } = orderList;

  //const orderDelete = useSelector(state => state.orderDelete);
 // const {  success: successDelete} = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [dispatch]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return (
    <>
        <div className="breadcrumb">
            <div className="container">
                <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                <span className="breadcrumb-item active">Orders</span>
            </div>
        </div>
        <section className="static about-sec">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Sidebar activeMenu={'orders'} />
                    </div>
                    <div className="col-10">
                        {loading ? <div>Loading...</div> : 
                        <div className="content content-margined">
                          <div className="order-header">
                            <h2>Orders</h2>
                          </div>
                          <div className="order-list">

                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>DATE</th>
                                  <th>TOTAL</th>
                                  <th>USER</th>
                                  <th>PAID</th>
                              {/*    <th>PAID AT</th>
                                  <th>DELIVERED</th>
                          <th>DELIVERED AT</th>*/}
                                  <th>ACTIONS</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map(order => (<tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.createdAt}</td>
                                  <td>{order.totalPrice}</td>
                                  <td>{order.user.name}</td>
                                  <td>{order.isPaid.toString()}</td>
                                 {/* <td>{order.paidAt}</td>
                                  <td>{order.isDelivered.toString()}</td>
                          <td>{order.deliveredAt}</td>*/}
                                  <td>
                                    <Link to={"/order/" + order._id} className="btn btn-info btn-sm" >Details</Link>
                                    {' '}
                                    <button type="button" onClick={() => deleteHandler(order)} className="btn btn-danger btn-sm">Delete</button>
                                  </td>
                                </tr>))}
                              </tbody>
                            </table>

                          </div>
                        </div>
            }
                    </div>
                </div>    
            </div>
        </section>
    </>
  );
}
export default OrdersScreen;