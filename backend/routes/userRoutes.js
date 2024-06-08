const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile, 
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
    
  } = require("../controllers/userController");
 
 
  const { 
    isAuthenticatedUser,
    authorizeRoles 
  } = require("../middleware/auth");


// creating router obj
  const router = express.Router();

  router.route("/register").post(registerUser);

  router.route("/login").post(loginUser);

  router.route("/password/forgot").post(forgotPassword);

  /*  zodi db ta thaka search kore doc khuze bar kori tokhon 
  post req korta hobe */
  router.route("/password/reset/:token").put(resetPassword);

  router.route("/logout").delete(logout);

  router.route("/me").get(isAuthenticatedUser,getUserDetails);

  router.route("/password/update").put(isAuthenticatedUser,updatePassword);
  
  
  router.route("/me/update").put(isAuthenticatedUser,updateProfile )
  ;

  router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles ("admin"),getAllUser);

  router.route("/admin/user/:id")
  .get(isAuthenticatedUser,authorizeRoles ("admin"),getSingleUser)
  .put(isAuthenticatedUser,authorizeRoles ("admin"),updateUserRole)
  .delete(isAuthenticatedUser,authorizeRoles ("admin"),deleteUser)



  module.exports = router;