import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';  
import Footer from './layout/Footer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import ShopsScreen from './screens/ShopsScreen';
import UsersScreen from './screens/UsersScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import ProductListScreen from './screens/ProductListScreen';
import AboutScreen from './screens/AboutScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ReportScreen from './screens/ReportScreen';


function App() {

  return (
    <BrowserRouter>
        <Header />
        <Switch>
        <Route path="/shop" component={ShopScreen} />
        <Route path="/shopbooks/:id" component={ShopDetailScreen} />
        <Route path="/orders" component={OrdersScreen} />
        <Route path="/myorders" component={MyOrdersScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/shops" component={ShopsScreen} />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/productlist" component={ProductListScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/reset" component={ResetPasswordScreen} />
        <Route path="/verify-email/:id" component={SigninScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/category/:id" component={ProductListScreen} />
        <Route path="/users" component={UsersScreen} />
        <Route path="/aboutus" component={AboutScreen} />
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/report" component={ReportScreen} />
        <Route path="*" component={NotFoundScreen} />
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;