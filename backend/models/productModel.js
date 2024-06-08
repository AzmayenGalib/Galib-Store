const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const { stringify } = require("nodemon/lib/utils");

// creating schema for product model
const productSchema = new mongoose.Schema({
    name:{
        type:String,//datatype er class ta akhane dita hobe
        required:[true,"pleas enter product name"],
        // zodi client a name na day tale ai msg ta show hobe
        trim:true
    },
    description:{
        type:String,
        required:[true,"pleas enter product descriptiom"]
    },
    price:{
        type:Number,
        required:[true,"pleas enter product price"],
        maxLength:[8,"price can't exceed 8 charecter"]
       // akhane zai lenth dibo tar thaka boro data client dita parbena
    },
   
    ratings:{
        type:Number,
        default:0, /* akhane zeta dibo sata hobe 
        rating er default value */
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        } /* akhane akadhik img thakbe protiti img er zonno 
        akta kore obj .tai akhane akadhik obj er akta
        array nita hobe.ar akhane client k images property 
        er value hisabe akadhik obj  er akta array
        pathate hobe zai obj gulate public_id ar url ai
         2ta property dita hobe .ar ai property gular value kmn
          hobe stata upora schema ta bola daua ase.

         */
    ],
    category:{
        type :String,
        required:[true,"pleas enter product category"],
        /* akhne enum property er maddhome akta nirtdristo
        category ba akta nirdristo namer category er Data 
        dauar zonno amra client ka baddo korta partam but ai kaz 
        frontend au kora zay.enum er kaz holo enum er value 
        zeta dibo client k ai property er value saitai dita hobe
 */

    },
    stock:{
        type:Number,
        required:[true,"pleas enter product stock"],
        maxLength:[4,"stock can't exceed 4 charecter"],
        default:1,

    },
    numOfReviews:{
        type:Number,
        default:0,
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:"true"
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:"true"
        /* ref:"User" er mane holo User model diya zai data
        gulo create hobe tader id er data type zeta hobe
        sai data type er data user a dita hobe */
    },


    createdAt:{
        type:Date,
        default:Date.now,
    }

});

// creating model class and exporting it
module.exports= mongoose.model("Product",productSchema);
