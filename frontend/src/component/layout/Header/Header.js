import React from "react";
import Navbar from "./Navbar";
import "./Hader.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnSharpIcon from "@material-ui/icons/LocationOnSharp";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <>
      <div className="Uhead">
        <h2 className="logo">Galib Store</h2>
        <Link to={`/search`}>
          <input
            className="Hsearch"
            type="text"
            placeholder="Search a product"
          />
          <input className="HsearchBTN" type="submit" value="Search" />
        </Link>
        <ul className="ico">
          <li>
            <LocationOnSharpIcon style={{ color: "tomato", fontSize: "2rem" }} />
            <div className="inline">
              <h5 className="inline">Delivered in</h5>
              <h3>Bangladesh</h3>
            </div>
          </li>
          <li>
            <div className="inline">
              <h5 className="inline">Returns</h5>
              <h3>& Orders</h3>
            </div>
          </li>
          <li>
            <ShoppingCartIcon style={{ color: "tomato" , fontSize: "2rem",
              marginTop:"0.3rem",
              marginRight:"0.3rem",
             }} />
            <div className="inline">
            <h5 className="inline">{cartItems.length} Items</h5>
              <h3>In Carts</h3>
            </div>
          </li>
        </ul>
      </div>
      <div className="head">
        <Navbar></Navbar>
      </div>
    </>
  );
  /*  akhane amra header hisabe pre build component reactnavbar k use 
  korlam ata use korar niyom amra npm er doc thaka dakhe nibo*/
};

export default Header;
