import React from "react";
import { useGetOrderDetailsQuery } from "../../Api/orderApi";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./OrderDetails.css";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";



const OrderDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const { isLoading, isError, isSuccess, data, error } =
    useGetOrderDetailsQuery(id);

   
    if (isError) {
      return alert.error("An error has occured");
    } 
  
     if ( isLoading) {
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
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">Order #{data.order._id}</Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{data.order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{data.order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {`${data.order.shippingInfo.address},
                      ${data.order.shippingInfo.city}, 
                      ${data.order.shippingInfo.state}, 
                      ${data.order.shippingInfo.pinCode}, 
                      ${data.order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      data.order.paymentInfo &&
                      data.order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {data.order.paymentInfo &&
                    data.order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{data.order.totalPrice && data.order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      data.order.orderStatus && data.order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {data.order.orderStatus && data.order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {data.order.orderItems &&
                  data.order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetails;
