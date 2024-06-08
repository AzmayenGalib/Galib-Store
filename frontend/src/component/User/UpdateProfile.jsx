import React, { useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useUpdateProfileMutation } from "../../Api/userApi";
import { useLoadUserQuery } from "../../Api/userApi";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const UpdateProfile = () => {
  const alert = useAlert();
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [avater, setAvater] = useState(" ");
  const [avatarPreview, setAvatarPreview] = useState("/dummy");

/*    if (data.user) {
    setName(data.user.name);
    setEmail(data.user.email);
      setAvatarPreview(data.user.avatar.url); 
  }  */

  const { isLoading, isError, isSuccess, data, error } = useLoadUserQuery();

   const [updateProfile, resU] = useUpdateProfileMutation();
  const {
    isLoading: isLoadingU,
    isSuccess: isSuccessU,
    data: dataU,
    error: errorU,
    isError:isErrorU
  } = resU;

  if (isErrorU) {
    return alert.error("An error has occured");
  }

  if (isError) {
    return alert.error("An error has occured");
  }
  if (isSuccessU) {
    alert.success("Profile updated successfully");
  }
  if (isLoadingU || isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const updateProfileSubmit = (e) => {
     e.preventDefault(); 

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avater", avater);
    updateProfile({
      /* _id: data.user._id, */
      myForm,
    });
    
   
    navigate(`/Account`)
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvater(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      { data ? (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
            <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateProfile;
