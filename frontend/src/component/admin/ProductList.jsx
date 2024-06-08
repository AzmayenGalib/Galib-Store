import React ,{ useEffect} from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductQuery,
} from "../../Api/productApi";
import { Link } from "react-router-dom";
import "./ProductList.css";

import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const ProductList = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { data, isLoading, error, isError  } = useGetAdminProductQuery();
  const [deleteProduct, res] = useDeleteProductMutation();

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


  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  /* if (isSuccess) {
   /*  window.alert.su("Product Deleted Successfully"); */
  /* navigate("/admin/dashboard"); */

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            {/* avabe amra same row er ono column er value k access 
                korte pari.  */}
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      {data ? (
        <div className="Pcontain ">
          <div className="sideB">
            {" "}
            <SideBar />
          </div>
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default ProductList;
