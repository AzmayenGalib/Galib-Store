import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from "../../Api/productApi";
import { useParams } from "react-router-dom";

import { cartReducer } from "../../Reducers/cartReducer";

import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import ReviewCard from "./ReviewCard";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  /* amraa ai comp er route a id namer akta route parameter
   use korasi tai url a hit korar somoy id er zaygay zeta likhbo
   saita id route parameter a save hobe ar amra useParams call kore
   sai id route param k access korlam*/

  const { isLoading, isError, isSuccess, data, error } =
    useGetProductByIdQuery(id) || {};

  const [createReview, res] = useCreateReviewMutation();

  const {
    isLoading: isLoadingR,
    isSuccess: isSuccessR,
    data: dataR,
    error: errorR,
    isError: isErrorR,
  } = res;

  if (isErrorR) {
    return alert.error("An error has occured");
  }

  if (isError) {
    return alert.error("An error has occured");
  }
  if (isSuccessR) {
    alert.success("Submit review successfully");
    console.log("working");
  }
  if (isLoadingR || isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const options = {
    size: "large",
    value: data && data.product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (data.product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,

        quantity,
      },
    });

    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    createReview({
      _id: data.product._id,
      myForm,
    });
    setOpen(false);
    /*  navigate(`/`); */
  };
  if (errorR) {
    console.log(errorR);
  }

  return (
    <>
      `
      {data ? (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {data.product.images &&
                  data.product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      alt={`${i} Slide`}
                      key={item.url}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{data.product.name}</h2>
                <p>Product # {data.product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className=".detailsBlock-2-span">
                  ({data.product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>${data.product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={data.product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      data.product.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {data.product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{data.product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Reaview
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {data.product.reviews[0] ? (
            <div className="reviews">
              {data.product.reviews &&
                data.product.reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}
        </>
      ) : (
        <Loader />
      )}
      `
    </>
  ); /* avabe amra kono element a conditional styling dite pari */
};

export default ProductDetails;
