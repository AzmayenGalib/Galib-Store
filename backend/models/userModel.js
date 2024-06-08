const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//crypto node er built in module

// creating schema for User model
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"pleas enter your name"],
        maxLength:[30,"name can't exceed 30 charecter"],
        minLength:[4,"name should have more then 4 char"]
    },

    email:{
        type:String,
        required:[true,"pleas enter your email"], 
        unique:true,
        validate:[validator.isEmail,"pleas enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"pleas enter your password"],
        minLength:[8,"password should be greater then  8 charecter"],
        select:false
        /* akhane select:false dauar fola model class er 
        select method er argmnt a zodi +password pass kori tale
        */
       
    },
    avater:{
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        
    },
    role :{
        type:String,
        required:true
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken : String,
    resetPasswordExpire :Date,
    /* zodi data er kono property er zonno sudhu matro aktai sorto
    dai ar sata holo type.then obj na diya avabe daua zay  */

    

});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    /* isModified() holo userSchema er akta method er modda agrmnt
    a  userSchema er property dita hoba .zodi sai property ta update
    hoy tale ai methos true return korbe.zodi update nahoy 
    tale next call korasi karon ata na korle encrypt protibar e
    hotai thakto orthat encrypted password tau abar encrypt hoito */

    
    this.password  = await bcrypt.hash(this.password,10);
    /* admin zano user er password k na dakhte pare sai zonna 
    amra akhane password k encrypt kora dilam.2nd argument a 
    zoto sonkha dibo toto digit er encrypt code generate hobe */
});
/* aita muloto akta event data ta db ta save houar age ai event 
ta start hobe.2nd argmnt er cb ta event handaler function dita 
hobe.akhane arrow func use kora hoyni karon arrow er mmodda
this use korala error hobe .zahatu pre() func ta, document obj er 
akta method tai amra pre er cb er modda this diya document obj 
er password property k access korta pari. */


/*  */

/* zodi amn hoy za same controller file er modda akadhik req
handaler funtion er modda kono akta same funtion use korte hossa
tokhon sai same func k amra oi controller er schema er 
user define mathod banay dibo */


// creating JWT Token
userSchema.methods.getJWTToken= function (){
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn:process.env.JWT_EXPIRE,
     })
}

/*  getJWTToken method ta akta jsonweb token creat kore saita 
return kore*/


/* JWT_SECRET aita khubi sensitve info kau aita paye gaaale
se amar app a login korte parbe */

//compare password 

userSchema.methods.comparePassword = async function(enteredPassword){
    console.log('working');
    return bcrypt.compare(enteredPassword,this.password)
   
}
/*  bcrypt.compare() er kaz holo ata client thaka asha password
k encrypt kora password er satha compare kore.1st argmnt a normal
value ar 2nd aegument encrypt kora value dita hoy */


// /* Generating password reset Token
userSchema.methods.getResetPasswordToken =  function (){

    //generate token
    const resetToken= crypto.randomBytes(20).toString("hex");
    /* randomBytes() er kaz holo ata zoto input dibo toto gulo
     random buffer data creat kore.toString("hex") sai buffer k 
     hexadecimal kore sai hexadecimal k string kore return kore */

     //hashing and adding resetPasswordTokento user schema
     this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

/* db ta token k hash kore store korta hoy tai hash kore nilam
    .but token k amra url er modda use korta chai but url a abar
    hash sara token use korta hoy tai amra hash sara token k return 
    korlam     */

    /* ai token ta amra coockie ta pathabona aota just email 
    a pathano hbe */
       

     this.resetPasswordExpire = Date.now()+15*60*1000;
     return resetToken;
     
     
}  

// creating model class and exporting it
module.exports= mongoose.model("User",userSchema);