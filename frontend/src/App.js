import "./App.css";
import Header from "./component/layout/Header/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import Services from "./component/Services/Services";

import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/ProductPage/Products";
import Search from "./component/Product/Search";
import { LoginSignUp } from "./component/User/LoginSignUp";
import { useEffect, useState } from "react";
import { useLoadUserQuery } from "./Api/userApi";
import UserOptions from "./component/layout/Header/UserOption";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import Cart from "./component/Cart/Cart.jsx";

import UpdatePassword from "./component/User/UpdatePassword.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import { useGetStripeApiKeyQuery } from "./Api/orderApi.js";

import { useSelector, useDispatch } from "react-redux";
import PaymentRoute from "./component/Cart/PaymentRoute.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrder from "./component/Order/MyOrder.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/admin/Dashboard.jsx";

import ProductList from "./component/admin/ProductList.jsx";
import UpdateProduct from "./component/admin/UpdateProduct.jsx";
import NewProduct from "./component/admin/NewProduct.jsx";
import OrderList from "./component/admin/OrderList.jsx";
import ProcessOrder from "./component/admin/ProcessOrder.jsx";
import { UserList } from "./component/admin/UserList.jsx";
import UpdateUser from "./component/admin/UpdateUser.jsx";
import Footer from "./component/layout/footer/Footer.jsx";



function App() {
  const { data: userData ,isError,error } = useLoadUserQuery();
  if(isError){
    console.log(error);
  }
  return (
    <>
      <Router>
        <Header></Header>
        {userData && !isError && userData.isAuthenticated && (
          <UserOptions user={userData.user} />
        )}
        {/* navbar k router modda dita hobe nahole err hobe */}
        {/*  { stripeApiKey && (
           
          )} */}
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/product/:id" Component={ProductDetails}></Route>
          <Route path="/Services" Component={Services}></Route>

          <Route path="/products" Component={Products}></Route>
          <Route path="/products/:keyword" Component={Products}></Route>
          <Route path="/search" Component={Search}></Route>
          <Route path="/account" Component={Profile}></Route>
          <Route path="/me/update" Component={UpdateProfile}></Route>
          <Route path="/password/update" Component={UpdatePassword}></Route>
          <Route path="/login" Component={LoginSignUp}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/shipping" Component={Shipping}></Route>
          <Route path="/order/confirm" Component={ConfirmOrder}></Route>
          <Route path="/process/payment" Component={PaymentRoute}></Route>
          <Route path="/success" Component={OrderSuccess}></Route>
          <Route path="/orders" Component={MyOrder}></Route>
          <Route path="/order/:id" Component={OrderDetails}></Route>
          
          

          {/* <Route path ="/admin/dashboard" Component={Dashboard}></Route> */}
          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/admin/dashboard" Component={Dashboard}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route
                path="/admin/product/:id"
                Component={UpdateProduct}
              ></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/adminProduct" Component={NewProduct}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/productlist" Component={ProductList}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/order/list" Component={OrderList}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/a/order/:id" Component={ProcessOrder}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/user/list" Component={UserList}></Route>
            )}

          {userData &&
            userData.isAuthenticated &&
            userData.user.role === "admin" && (
              <Route path="/updateRole/:id" Component={UpdateUser}></Route>
            )}

          {/* khubi important warning :
            product/:id ar product/list avabe duita route banale
            error ashbe.
            tai chesta korbo route gula vinno vinno rakhar */}
        </Routes>
        {/*  <Footer></Footer> */}
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
