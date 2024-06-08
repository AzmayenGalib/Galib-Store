import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useAlert } from "react-alert";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useGetAdminProductQuery } from "../../Api/productApi";
import { useAllUserQuery } from "../../Api/userApi";
import { useGetAllOrderQuery } from "../../Api/orderApi";
import Loader from "../Loader/Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const alert = useAlert();
  const {
    isLoading: isLoadingP,
    isError: isErrorP,
    data: dataP,
    error: errorP,
  } = useGetAdminProductQuery();
  const {
    isLoading: isLoadingU,
    isError: isErrorU,
    data: dataU,
    error: errorU,
  } = useAllUserQuery();
  const {
    isLoading: isLoadingO,
    isError: isErrorO,
    data: dataO,
    error: errorO,
  } = useGetAllOrderQuery();

  if (isErrorP) {
    return alert.error("An error has occured");
  }

  if (isErrorU) {
    return alert.error("An error has occured");
  }

  if (isErrorO) {
    return alert.error("An error has occured");
  }

  if (isLoadingU || isLoadingO || isLoadingP) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  let outOfStock = 0;

  dataP &&
    dataP.products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  console.log(outOfStock);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, dataO && dataO.totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, dataP && dataP.products.length],
      },
    ],
  };
  return (
    <>
      {dataP && dataU && dataO ? (
        <>
          <div className="parent">
            <div className="g1"></div>

            <div className="Pcontain">
              <div className="sideB">
                {" "}
                <Sidebar />
              </div>
              <div className="dash">
                {/*  <Typography component="h1">Dashboard</Typography> */}
                {/*  <Typography component="h1">Dashboard</Typography> */}
                <h1>Dashboard</h1>
                <div className="dashboardSummaryBox2">
                  <Link to="/productList">
                    <p>Product</p>
                    <p>{dataP.products.length}</p>
                  </Link>
                  <Link className="Do" to="/order/list">
                    <p>Orders</p>
                    <p>{dataO.orders.length}</p>
                  </Link>
                  <Link to="/user/list">
                    <p>Users</p>
                    <p>{dataU.users.length}</p>
                  </Link>
                </div>
                <div className="contain2">
                  <div className="amnt">
                    <p>
                      Total Amount <br />
                      {dataO.totalAmount} BDT
                    </p>
                  </div>
                  <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                  </div>
                </div>
                <div className="lineChart">
                  <Line data={lineState} />
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
