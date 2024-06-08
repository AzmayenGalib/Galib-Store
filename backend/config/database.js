const mongoose = require("mongoose");


//connecting data base with the server
const connectDatabase =()=>
{
    /* akhane connect method er argument a localhost er por 
    zai nam dibo sai namer akta database create hobe
    and ami ai argument er url a kono crud req dila
    sai namer databasai ai crud operation ta ghotbe  */
    mongoose.connect(process.env.DB_URI)
        .then((data )=> {
            console.log(`mongo db connected with server :${data.connection.host}`)
        });
        /* zahatu amra unhandaled promise rejection er zonno 
        error handaling korasi tai akhane catch dauar dorkar nai.
        karon catch dila error hole server shuttdown na hoye
        sai error ta show korba .but amra chai ai dhoroneer
        error show hoye amader mansomman nosto na hok tarthaka 
        server ta shuttdown hok */
      
}

module.exports=connectDatabase