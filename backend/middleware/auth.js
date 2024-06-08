const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config({ path: "Backend/config/config.env" });


// creating middleware function for User authentication
exports.isAuthenticatedUser=catchAsyncErrors(async(req, res, next)=>{
    const {token}= req.cookies;
    /* zodi amra cookieParser middleware k app er satha add kori
    tale app er req handaler midleware er modda amra avabe browser
    er  coockie k access korte pari orthat cookie er modda 
    store kora sob kisu k accesss korta pari*/
    

    if(!token){
        return next(new ErrorHander("please login ",401))
    }
    const decodedData = jwt.verify(token ,process.env.JWT_SECRET)
    /* akhane amra verify korta pari za token er modda amar daua secret
    code ase naki zodi thake tar mane holo aita amar daua token
    ar na thakle bujhta hobe aita onno karo daua token.orthat
    akhane amara aita chake kori za token ta amar daua kina*/

   /* verify() method ta token bananor somor sign method er 
   1st argmnt a zai obj disilam sai obj k decode kora return kore */

   req.user = await User.findById(decodedData.id);
   /* akhhane amra req obj er modda user nameer peoperty creat
   korlam tarmodda token thaka paua id er data k store korlam */

   next();
})


// creating  function for authorizeRoles middleware
exports.authorizeRoles= (...roles)=>{
    /* (...roles) akhane argument zai value dibo seta role namer
    akta array ta store hobe  */
    return (req, res, next)=>{
            if(!roles.includes(req.user.role)){
               return next(
                new ErrorHander (
                    `Role:${req.user.role} is not allowed to access 
                    this resource`,403
                )
               )
            }
            /* data ta role namer akta property amra schema ta
            define korsi zar default value disi user .
            zahatu er ager middleware a req er user property er
            modda data k save korsi tai req.user.role diya
            data er role property k access kora hoyese*/

            next();
    }
}


/* ai midleware er kaz holo er agrmnt a zai role dibo sai role er
data er  token zukto client e kble matro ai midleware
zukto rote gulate req korte parbe onno role hola parbena
 */
