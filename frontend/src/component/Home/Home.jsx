import React, { useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import img1 from "../img/61CiqVTRBEL._SX3000_.jpg";
import img2 from "../img/61lwJy4B8PL._SX3000_.jpg";
import img3 from "../img/71Ie3JXGfVL._SX3000_.jpg";
import img4 from "../img/71YTsbTxBsL._SX3000_.jpg";
import img5 from "../img/Big_Banner_5_1__1.jpg";
import img6 from "../img/Big_Banner_6_1__1.jpg";
import img7 from "../img/ca.png";
import img8 from "../img/db63fb5e-a258-49e0-b539-c14144294f46.jpg";

import cimg1 from "../img/perfume collection.jpeg";
import cimg2 from "../img/fashion accessories.jpeg";
import cimg3 from "../img/gift.jpeg";
import cimg4 from "../img/electronic.jpeg";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../Api/productApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";

/* import {CgMouse} from "react-icons/all"  */
/* 
const product = {
  name: "Joop Perfume",
  price: "$50",
  _id: "galib",
  image: [{ url: img1 }],
}; */

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, data, error } = useGetProductsQuery();

  
    if (error) {
     alert.error("error");
    }
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    
    }

  return (
    <>
      {data ? (
        <>
          <div className="background">
            <MetaData title="Home" />
            <div className="banner">
              <Carousel
                /*  animation="slide" */
                interval={30000}
                indicators={true}
                navButtonsAlwaysVisible={true}
                timeout={700}
              >
                <img src={img1} alt="1" style={{ width: "100%" }} />
                <img src={img2} alt="2" style={{ width: "100%" }} />
                <img src={img3} alt="2" style={{ width: "100%" }} />
                <img src={img4} alt="4" style={{ width: "100%" }} />
                <img src={img5} alt="5" style={{ width: "100%" }} />
                <img src={img6} alt="6" style={{ width: "100%" }} />
                <img src={img7} alt="6" style={{ width: "100%" }} />
                <img src={img8} alt="6" style={{ width: "100%" }} />
              </Carousel>
            </div>

            <div className="pop">
              <div className="popItem">
                <div className="spc">
                  <h3>Exclusive Perfume Collection</h3>
                </div>

                <img
                  src={cimg1}
                  alt="1"
                  style={{ width: "100%", height: "9rem" }}
                />
                <p>
                  Welcome to a huge collection of perfumes.Find your favorite
                  ones
                </p>
                <h5>See more</h5>
              </div>
              <div className="popItem">
                <div className="spc">
                  <h3>Fashion Accessories for Men</h3>
                </div>
                <img
                  src={cimg2}
                  alt="1"
                  style={{ width: "100%", height: "9rem" }}
                />
                <p>
                  Welcome to a huge collection of perfumes.Find your favorite
                  ones
                </p>
                <h5>See more</h5>
              </div>
              <div className="popItem">
                <div className="spc">
                  <h3>Find a gift</h3>
                </div>
                <img
                  src={cimg3}
                  alt="1"
                  style={{ width: "100%", height: "9rem" }}
                />
                <p>
                  Welcome to a huge collection of perfumes.Find your favorite
                  ones
                </p>
                <h5>See more</h5>
              </div>
              <div className="popItem">
                <div className="spc">
                  <h3>Electronics and Gadgets</h3>
                </div>
                <img
                  src={cimg4}
                  alt="1"
                  style={{ width: "100%", height: "9rem" }}
                />
                <p>
                  Welcome to a huge collection of perfumes.Find your favorite
                  ones
                </p>
                <h5>See more</h5>
              </div>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {data.products[0] &&
                data.products.map((product) => <Product product={product} />)}
            </div>
            {/* jsx a loop chalale protita loop er value e render hobe
        aker por ak ar jsx er modda loop use korar zonno
        {} use korte hobe*/}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
