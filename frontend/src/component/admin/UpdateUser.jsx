import React, { useState ,useEffect} from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import {
  useUpdateUserRoleMutation,
  useUserDetailsQuery,
} from "../../Api/userApi";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const UpdateUser = () => {
  const alert = useAlert();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  
  const { data, isSuccess,  isLoading, isError,error} = useUserDetailsQuery(id);
  const [updateUserRole, res] = useUpdateUserRoleMutation();
 
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
      alert.success("Update user role Successfully");
    }
    if (isLoadingU || isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }


 

 

  const userName = data && data.user.name;
  const userEmail = data && data.user.email;
  const userRole = data && data.user.role;

  /*  setEmail(data.user.email);
  setRole(data.user.role); */

  /* setName(userName);
    setEmail(userEmail);
    setRole(userRole); */

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    if (name === "") {
      myForm.set("name", userName);
    } else {
      myForm.set("name", name);
    }

    if (email === "") {
      myForm.set("email", userEmail);
    } else {
      myForm.set("email", email);
    }

    if (role === "") {
      myForm.set("role", userRole);
    } else {
      myForm.set("role", role);
    }

    /*   myForm.set("email", email);
    myForm.set("role", role); */
    console.log(myForm);
    updateUserRole({ id, myForm });
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  /* if(is){
    return <div>Loading</div>
  } */
  return (
    <>
      {data ? (
        <>
          <div className="Pcontain ">
            <div className="sideB">
              {" "}
              <SideBar />
            </div>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Update User</h1>
                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    /* required */
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    /* required */
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <VerifiedUserIcon />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  /*  disabled={
                  updateLoading ? true : false || role === "" ? true : false
                } */
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
};

export default React.memo(UpdateUser);
