const ErrorHandler = require("../utils/errorHander");
/* amra akhon sobar ses er invisible predefine error handalling
middleware k overwrite kore nizer moto kore customize kore nibo */


// ai error handaling midleware ta sync code er zonno
module.exports = (err, req,res ,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";


/* mongo db wrong id error
zodi vul id dai tale ai error hoy*/
if(err.name === "CastError"){
  const message = `resource not found .invalied:${err.path}`;
  err= new ErrorHandler(message,400);
  /* akhane amra error msg k just customize korar korar zonno
  ai error handaaling ta korbo */
}

// mongoose duplicate key err
if(err.code === 11000 ){
  const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  err= new ErrorHandler(message,400);
  /* akhane amra error msg k just customize korar korar zonno
  ai error handaaling ta korbo */
}

//wrong jwt err
if(err.name === "JsonWebTokenError" ){
  const message = `Json web token is invalid, try again`;
  err= new ErrorHandler(message,400);
  /* akhane amra error msg k just customize korar korar zonno
  ai error handaaling ta korbo */
}

// JWT expire error
if(err.name === "TokenExpiredError" ){
  const message = `Json web token is Expired, try again`;
  err= new ErrorHandler(message,400);
  /* akhane amra error msg k just customize korar korar zonno
  ai error handaaling ta korbo */
}
  


res.status(err.statusCode).json({
    success: false,
    message:err.message ,
    errDetails:err.stack /*err.stack stack method er kaz holo error er sob details
    return kora */
  });
  // 1st argument er err obj ta kintu Error class er instance
};
/* || ata akta shorthand er zai paser statement true saitai
kbl assign hobbe ar duitai true hola 1st ta assign hobe
mone rakhbo faka string false return kore */