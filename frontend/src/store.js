import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
  productListReducer,
  categoryListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  shpProductsReducer,
  productReviewDeleteReducer,
} from './reducers/productReducers';
import {
  shopListReducer,
  shopDetailsReducer,
  shopSaveReducer,
  shopDeleteReducer,
} from './reducers/shopReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userResetReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userSaveReducer,
  userDeleteReducer
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  categoryList: categoryListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userReset: userResetReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  shopSave: shopSaveReducer,
  shopDelete: shopDeleteReducer,
  shpProducts: shpProductsReducer,
  userList: userListReducer,
  userSave: userSaveReducer,
  userDelete: userDeleteReducer,
  productReviewDelete: productReviewDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
