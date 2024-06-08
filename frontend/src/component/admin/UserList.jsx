import React, { useEffect,useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useAllUserQuery, useDeleteUserMutation } from "../../Api/userApi";
import "./ProductList";
import Loader from "../Loader/Loader";






export const UserList = () => {

  const alert = useAlert();
  const {  isLoading, isError, isSuccess, data, error } = useAllUserQuery();
  const [deleteUser, res] = useDeleteUserMutation();
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
      alert.success("Delete user Successfully");
    }
    if (isLoadingU || isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }


  const deleteUserHandler = (id) => {
    deleteUser(id);
  };
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/updateRole/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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
    data.users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
      <div className="Pcontain ">
      <div className="sideB">
        {" "}
        <SideBar />
      </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
    </>
  );
};
