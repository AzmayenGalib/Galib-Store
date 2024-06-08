/* zahatu amra register ar login er zonno same response pathassi 
tai response er zonno akta func banaye saita call korbo */

const sendToken = (user, statusCode, res) => {
  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      /* mili sec korar zonno 1000 diya gun korsi */
    ),
      httpOnly: true, 
      /* secure:false, */
     /*  sameSite:'strict', 
     path:'/',
     domain:"localhost"  */
  };

  //crating token
  const token = user.getJWTToken();

  //sending response
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
/* res er coockie method er modda zeta pathabo seta browsr
er cookie ta giya store hobe  */


module.exports = sendToken;