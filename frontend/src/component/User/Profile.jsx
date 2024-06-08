import React from "react";
import MetaData from "../layout/MetaData";
import { useLoadUserQuery } from "../../Api/userApi";
import { Link } from "react-router-dom";
import "./Profile.css";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const Profile = () => {
  const alert = useAlert();
  const { isLoading, isError, isSuccess, data, error } = useLoadUserQuery();

  /* data thaka user k destructer korle err ashtise */

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

  return (
    <>
      {data ? (
        <>
          <MetaData title={`${data.user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={data.user.avater.url} alt={data.user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{data.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{data.user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(data.user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
};

export default Profile;
