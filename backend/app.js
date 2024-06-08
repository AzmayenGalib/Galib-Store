/* controller er modda env k acces korte chaile amader k obossoi
app.js file a env k import korte hobe nahole kaz korbena */

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path:"backend/config/config.env" });
  }

/* warning ::
akta kotha khub importent mone rakhte hoe seta holo
dotenv require and configure k sobar upoore rakhte hobe 
nahole onek somoy env kaz nao korte pare */


// importing express
const express = require("express");
const errorMiddleare = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");



//  ceating app obj
const app = express();




app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(cors(  {
       credentials:true ,  
    origin: 'http://localhost:3000',
}  ));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));



app.use(fileUpload( { useTempFiles: true } ));

// importing router
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
// akhane /api/v1 ai base url er under a product url ta thakbe
app.use("/api/v1", user);

app.use("/api/v1", order);
app.use("/api/v1", payment);

 app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
}) 

app.use(errorMiddleare);

// exporting app obj

module.exports = app;
