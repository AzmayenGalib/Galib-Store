import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "./LoginSignUp.css";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../../Api/userApi";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export const LoginSignUp = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  /* akhane ai /Profile.png holo public folder er png file*/
  const { name, email, password } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [login, resl] = useLoginMutation();
  const {
    isLoading: isLoadingl,
    isSuccess: isSuccessl,
    data: datal,
    error: errorl,
    isError:isErrorl
  } = resl;

  const [register, resr] = useRegisterMutation();
  const {
    isLoading: isLoadingr,
    isSuccess: isSuccessr,
    data: datar,
    error: errorr,
    isError:isErrorL
  } = resr;


  if (isErrorl) {
    return alert.error("An error has occured") 
 }
 if (isErrorl) {
  return alert.error("An error has occured") 
}
 if (isSuccessl) {
    alert.success("Login successful");  
} 
if (isSuccessr) {
  alert.success("Sign in successful");  
} 
  if (isLoadingl||isLoadingr) {
   return <div><Loader/></div>;
 }  

 
  /* react a amra direct dom manipulation korte parina
  ar zodi seta kortai hoy tokhon react a ref use kora hoy.
  dom manipulation a amra kono element k tar class ba id 
  diye select ba access kore sai element k manipulation korte
  pari but react a amra id ba class diye access korte parina
  borrong react a kono element  k access korar zonno 
  sai element er ref diye access korte hoy  */

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

    myForm.set("password", password);
    myForm.set("avatar", avatar);
    register(myForm);
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      /* akhane amra input a zai file tak upload korlam sai file
        tak amra file reader diye access korlam kore saita
        state a store korlam */
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      /* amra avabe on change event er modda input er name
      ar value atribute er value k access korte pari 
      [e.target.name]: e.target.value avabe amra obj er vitorai
      obj er property te dynamically value bosate pari*/
    }
  };

  /*  navigate(`/Home`); */

  const loginSubmit = (e) => {
    e.preventDefault();
    login({
      email: loginEmail,
      password: loginPassword,
    });
    console.log(resl);
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      /* akhane amra switcherTab ref diye button k acess
      korlam */

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                /*required atribute dila ai input ta fulfil na korle
                form submit hobena  */
                value={loginEmail}
                /* value atribute er value zaita dibo ai input
                ba e.target.value er default value o saitai hobe  */
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            /* amra ai input diye user er image o upload 
                dibo tai encType="multipart/form-data" daua 
                hoiisa */
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                /* name= atribute er value zaita dibo saita 
                ai input value er sathe server a chole zabe */
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};
