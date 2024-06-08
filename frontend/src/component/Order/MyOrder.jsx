import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";

import LaunchIcon from "@material-ui/icons/Launch";
import { useMyOrdersQuery } from "../../Api/orderApi";
import { useLoadUserQuery } from "../../Api/userApi";
import Loader from "../Loader/Loader";

const MyOrder = () => {
  //data.orders
  const alert = useAlert();

  const { data, isError, isLoading } = useMyOrdersQuery();
  const {
    data:userData,
    isError:isErrorR,
    isLoading:isLoadingR,
  } = useLoadUserQuery();
 
  if (isErrorR) {
    return alert.error("An error has occured");
  }

  if (isError) {
    return alert.error("An error has occured");
  } 

   if (isLoadingR || isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } 

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 30, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 15,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 15,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 27,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 15,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            {/* avabe amra same row er ono column er value k access 
                korte pari.  */}
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  if (data) {
    data.orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  }
  return (
    <>
      {userData ? (
        <>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">
              {userData.user.name}'s Orders
            </Typography>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyOrder;
