const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { Console } = require("console");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password ,role} = req.body;
  /* console.log(name, email, password); */
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  }); 
  const user = await User.create({
    name,
    email,
    password,
    /* akhane obj banate giya ES6 er shortcutt use korsi */
    role:role ||"user",
    avater: {
      public_id:  myCloud.public_id || "ckbkjhihgi",
      url:  myCloud.secure_url ||  "tguhiihi" ,
    },
    /* protita image er zonno akta kore myCloud obj thakbe
    sai obj gular public_id ar secure_url alada alada hobe.
    protita register rer er zonno alada id er myCloud obj create
     hobe */
    
     /* akhane amra creat method a req body pass na kore
        niza obj banaye seta pass korsi */
      
  });
  
 
//sending response
   sendToken(user,201,res);
  /* amderk user creat req er res a oi user er zonno
      zai token creat hoisa saita res hisabe client a pathate hobe */
});

// user login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  

  /* akhane user akadhikbaar login korbe fola req a same
  email akadhik bar pathabe fola sata unic hobena tale kivabe kaz 
  korbe?
  mone rakhbo schema ta daua sorto kbl matrro tokhon e kaz korbe
  zokhon oi schema er model class use kore database data creat 
  korbo but zodi data  creat na kore onno kono kaz kori zmn search
  tokhon ar sorto gula kaz korbe na
  */
  
  if (!email || !password) {
    return next(new ErrorHander("please enter email & password", 400));
  }

  //searching user in database by email propperty
  const user = await User.findOne({ email: email }).select("+password");
  
  if (!user) {
    return next(new ErrorHander("invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword( password);

  if(!isPasswordMatched){
    return next(new ErrorHander(" invalid email or password", 401));
  }
  
  
  
  //sending response
  sendToken(user,200,res);
});



// logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true

  })

  res.cookie("user",null,{
    expires:new Date(Date.now()),
    httpOnly:true

  })
  
/* res.cookie( ) method er kaz hlo cookie ta store kora kono
property k chane kora and cookie er option k change kora
zmn akhane token er vakue change kore null kora disi */



  res.status(200).json({
    success: true,
    message:"logged out"
    
  });
})



// forgot password
exports.forgotPassword =catchAsyncErrors(async (req, res, next) => {

  const user = await User.findOne({email:req.body.email});

  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }

  //get resetPassword Token
 
   const resetToken= user.getResetPasswordToken(); 

   await user.save({validateBeforeSave:false})
   /* user.find akta document k return korbe zata user a store hobe.
   user.getResetPasswordToken() call kore amra user namer document
   er resetPasswordToken and resetPasswordExpire ai duita
   property ta value assign korsi .fola document ta change
   hoye gase tai ai notun document a abar db ta save korte hobe
   tai user.save() call kore user doc k db ta save korlam */
  
  
   /*  amra zokhon bd thaka kono doc niya setak change kore
   abar save korbo tokhon db ta oi duita doc save hobena borong 
   ager doc tai update hoye save hobe.avabai amra doc k update 
   korbo*/

   const resetPasswordUrl = `${req.protocol}://${req.get("host")
  }/api/v1/password/reset/${resetToken}`;

  /* req.protocol kon protocol use hosssa sata return kore zmn http
   ar req.get("host") kothay host kora ase saita return kore*/

   const message = `your password reset token is:- \n\n ${resetPasswordUrl}
   \n\n if you have not requested this email then ,please ignore it`

   /* user zokhon password req er req korbe tokhon tar email a amra 
   ai message ta pathay dibo and massage er modda akta url pathay
   disi zatay click korle password reset hoye zabe */


   try{
     await sendEmail({
        email:user.email,
        subject:`ecommerce password recovery`,
        message,
     })

     res.status(200).json({
      success: true,
      message:`Email sent to ${user.email} successfully`
      
    });      

   }catch(error){
     user.resetPasswordToken= undefined ;
     user.resetPasswordExpire= undefined ;
     await user.save({validateBeforeSave:false});
     return next(new ErrorHander(error.message, 500));

   }
   /*  akhane try catch na dilau error handle hoto but err 
   ashle amra extra kisu kaz korte chai akhane oi extra kaz korar 
   zonno akta extra try catch nisi.avabe nasted try catch naua zay */
})


// Reset Password
exports.resetPassword =catchAsyncErrors(async (req, res, next) => {


  // creating token hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.perams.token) 
  .digest("hex");
/* amra tiken namer akta route peram banabo zeta url er vitor
 token er zaygay thakbe fole amra tokhon token k route peram  
 diya access korte parbo */

 /* amra client thaka route peram er modda asha token diya
 doc search korbo zahatu doc a token hash formate a ase
 tai route peram eer token kau hash kore nilam */

 const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire:{$gt:Date.now()}
  /* {$gt:Date.now()} mane holo doc er resetPasswordExpire er value
  ta Date.now er greaterthen hote hobe.avaabe amra condition 
  diyau db ta doc search korte pari */

 });

 if (!user) {
   return next(new ErrorHander("Reset passwoed token is invalid or has been expired", 400));

 }


 if(req.body.password !== req.body.confirmPassword){
  return next(new ErrorHander("password dose not match", 400));
 }

 user.password = req.body.password;
 user.resetPasswordToken = undefined
 user.resetPasswordExpire =undefined

 await user.save()
 sendToken(user,200,res);
 /* mone rakhbo zokhoni amra db er user collection er doc er kono 
 property k cgane korbo tokho obossoi sai doc er client k 
 notun token pathate hobe */
})

// get user detail
exports.getUserDetails =catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findById(req.user.id); 
   console.log("refetching")
  res.status(200).json({
    success: true,
    user,
    isAuthenticated:true,
    
  }); 
})


//Update User Password
exports.updatePassword =catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select ("+password")

  const isPasswordMatched = user.comparePassword( req.body.oldPassword);

  if(!isPasswordMatched){
    return next(new ErrorHander("old password is incorrect", 400));
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander("password dose not match", 400));
   }

   user.password = req.body.newPassword
   await user.save()
   sendToken(user,200,res);

}) 


//Update User Profile
exports.updateProfile =catchAsyncErrors(async (req, res, next) => {
    
 /*  console.log(req.body.avater); */
    const newUserData = {
      name:req.body.name,
      email:req.body.email
    }

    if (req.body.avater !== " ") {
      const user = await User.findById(req.user.id);
  
       const imageId = user.avater.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId); 
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avater, {
        folder: "avatars",
       /*  width: 150,
        crop: "scale",  */
      });

      newUserData.avater = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    
    
     
    
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })

    /* zai  obj diya amar doc update korbo tar kono property
    req body na dila ai khattrau schema er error msg kaz
    korbe */
   
    res.status(200).json({
      success: true,
      user
      
      
    }); 
})

//get all users (admin)
exports.getAllUser =catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
    
  }); 
})

//get single user (admin)
exports.getSingleUser =catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  
  if (!user) {
    return next(new ErrorHander(`User dose not exist with this id ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user,
    
  }); 
})




//Update User Role--admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
   /* console.log(req.params.id)
   console.log(req.body) */
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  /* zai  obj diya amar doc update korbo tar kono property
  req body na dila ai khattrau schema er error msg kaz
  korbe */
 
  res.status(200).json({
    success: true,
    
    
  }); 
})


//delete User --admin
exports.deleteUser =catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHander(`User dose not exist with this id ${req.params.id}`, 404));
  }


  await user.remove()

  /* zai  obj diya amar doc update korbo tar kono property
  req body na dila ai khattrau schema er error msg kaz
  korbe */
 
  res.status(200).json({
    success: true,
    
    
  }); 
})


