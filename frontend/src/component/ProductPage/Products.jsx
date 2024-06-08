import React, { useEffect, useState } from "react";
import Product from "../Home/Product";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";

import {
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../../Api/productApi";
import Loader from "../Loader/Loader";
import "./Products.css";
import { useParams } from "react-router-dom";

const categories = [
  "Perfume",
  "Book",
  "Electronics",
  "Dress",
  "Men's Accessories",
  "Games",
];

const Products = () => {
  const alert = useAlert();
  const { keyword } = useParams();

  const [page, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  /* amra state a akta array kau store korte pari .akhane amra 
  price a akta array k store koresi */

  const { isLoading, isError, isSuccess, data, error, refetch } =
    useGetAllProductsQuery({
      keyword,
      page,
      price: [...price],
      category,
      ratings,
    });

 
    if (isError) {
      return alert.error("An error has occured");
    }

    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }


  /*  akhane price k direct dile error hobe tai price er coppy
    k dite hobe */

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(price);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  
  if (error) {
    return <div>Error:{error.messag}</div>;
  }
  return (
    <>
      {data ? (
        <>
          <div className="productContain">
            <h2 className="productHeading">Product</h2>
            <div className="products">
              {data.products.map((product) => (
                <Product product={product} />
              ))}
            </div>
            <div className="filterBox ">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={50000}
                className="margin"
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox margin ">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {data.resultPerPage < data.filteredProductCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={data.resultPerPage}
                  totalItemsCount={data.filteredProductCount}
                  onChange={setCurrentPageNo}
                  nextPageText="next"
                  prevPageText="prev"
                  firstPageText="1st"
                  lastPageText="last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products;

/* ? aita holo if else er shorthand ar && ata holo sudhu if er 
shorthand*/
