const mongoose = require("mongoose");


// creating schema for order model

const orderSchema = new mongoose.Schema({

    shippingInfo:{
        address:{
            type:String,
            required:[true,"pleas enter your adress"]
        },
        city:{
            type:String,
            required:[true,"pleas enter your city"]
        },
            
        state:{
            type:String,
            required:[true,"pleas enter your state"]
        },
        country:{
            type:String,
            required:[true,"pleas enter your country"]
        },
        pinCode:{
            type:Number,
            required:[true,"pleas enter your pinCode"]
        },
        phoneNo:{
            type:Number,
            required:[true,"pleas enter your phoneNo "]
        }
        
    },

    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"product",
                required:"true"
            }
        },
    ],

    /* aavbe array of obj bananor subidha holo amra akta user
    er zonno sudhu akta order doc banalai hoye zasse se
    se aksathe akadhik item order korle notun kore doc na banye
    akta dok er moddai akadhik item rakhte pari
    ata na korla amader protita order er zonno akta kore doc
    banate hoto.tobe se zodi aksathe akadhik item order na kore
    alada alada time a akadhik item order kore tokhon kintu thiki 
    protita order er zonno vinno vinno doc banate hobe*/

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:"true"
    },

    /*mongoose.Schema.ObjectId dile order collection er data
    er user property te oi ObjectId er data er first 3ta property
    store hoye zabe 
    avabe amra ak collection er modda onno collection er data 
    k store korte pari tob  */


    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
    },

    paidAt:{
        type:Date,
        
        required:true
    },
   
    itemsPrice:{
        type:Number,
        default:0,
        required:true
        /* itemPrice holo orderItems er vitorer sob obj er price 
        er zogfol */
    },
    texPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        default:"processing"

    },
    deliveredAt:{
        type:Date,
        
        
    },

    cteatedAt:{
        type:Date,
        default:Date.now
        
        
    },
})


// creating model class and exporting it
module.exports= mongoose.model("Order",orderSchema);