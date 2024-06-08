import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../Api/orderApi";
import { useParams } from "react-router-dom";
import "./ProcessOrder.css";

import Loader from "../Loader/Loader";

const ProcessOrder = () => {
  const alert = useAlert();
  const { id } = useParams();

  const { data, isLoading, error, isError } = useGetOrderDetailsQuery(id);
  const [status, setStatus] = useState("");

  const [updateOrder, res] = useUpdateOrderMutation();

  const {
    isLoading: isLoadingU,
    isSuccess: isSuccessU,
    data: dataU,
    error: errorU,
    isError: isErrorU,
  } = res;

 
    if (isErrorU) {
      return alert.error("An error has occured");
    }

    if (isError) {
      return alert.error("An error has occured");
    }
    if (isSuccessU) {
      alert.success("Update order Successfully");
    }
    if (isLoadingU || isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }


  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    updateOrder({
      id,
      myForm,
    });
  };
  return (
    <>
      {data ? (
        <div className="Pcontain ">
          <div className="sideB">
            {" "}
            <SideBar />
          </div>
          <div className="newProductContainer">
            <div
              className="confirmOrderPage"
              style={{
                display:
                  data.order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{data.order.user && data.order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {data.order.shippingInfo &&
                        data.order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {data.order.shippingInfo &&
                        `${data.order.shippingInfo.address}, ${data.order.shippingInfo.city}, ${data.order.shippingInfo.state}, ${data.order.shippingInfo.pinCode}, ${data.order.shippingInfo.country}`}
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
                    <span>
                      {data.order.totalPrice && data.order.totalPrice}
                    </span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        data.order.orderStatus &&
                        data.order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {data.order.orderStatus && data.order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
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
            <div
              style={{
                display:
                  data.order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {data.order.orderStatus === "processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {data.order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default ProcessOrder;
