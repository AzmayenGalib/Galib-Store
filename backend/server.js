// importing app obj

const app = require("./app");

// importing db connect  fuunction

const connectDatabase = require("./config/database");

/* handaling uncaught exeption:
zodi kono kisu define na korai use kori tale ai error hoy ai error
msg show holau amra opomanito hoi tai ai error ashlau amra server k 
shutdown kora dibo.ai error ta sobar upora handel korta hoy */
const cloudinary = require("cloudinary");

const https = require("node:https");
const fs = require("node:fs");
/* const fs = require("node:path"); */


process.on("uncaughtException", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down the server due to uncaught exeption`);


    process.exit(1);
  
});


// importing dotenv

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}





// connecting to data  base
connectDatabase();
/* obossoi mone rakhte hobe env file connect korar
pore ai func call korte hobe nahola ai func env er access pabena
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* const options ={
  key:fs.readFileSync('private-key.pem', 'utf8'),
  cert:fs.readFileSync('server-cert.pem', 'utf8')
} */


// creating server

const server = app.listen(process.env.PORT, () => {
  console.log(`the server is working on ${process.env.PORT}`);
  //here `` and &{} are the es6 syntax
  /* PORT is an env var.to access PORT we
   have to use process.env.PORT .
   app.listen method server obj k return kore*/
});

/* Unhandaled promise rejection:
Unhandaled promise rejection holo zai promise er error handaling
kora hoyni orthat zai promise a catch use kora hoyni orthat errror
unhandaled promise .ai rokomer promise zodi reject hoy tokhon 
Unhandaled promise rejection error ashe. catch 
block diya promise er error handal korla zai error msg show hoy
kono kono somoy aitar zonno amaderk opomanito hote hoy.
tai amra catch er maddoma promise er error handel na kore
Unhandaled promise rejection er maddoma error handel kori
zar subudha holo zodi kono error ashe orthat promise ta zodi reject hoy
 tale erroe msg ta show na hoye server ta shut down hoye zay
 fola amader mansomman bache zay


atar zonno server crash korena sudhu akta error ashe
tai amn kono error ashle amra essa korai server k crash korabo
ba shutdown kora dibo zano amader mansomman nosto na hoy */

process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down the server due to unhandaled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

/* zokhoni Unhandaled promise rejection hoba tokhoni process.on 
er cb ta call hobe.server obj er close method ta call korle 
server ta shutdown hoye  zabe er por er vitorer cb ta call hobers
  .process.exit(1); er kaz holo aita server.close method er alternative
  hisbe kaz korbe aita exe holai server ta shuttdown hoye zabe */
