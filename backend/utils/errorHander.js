
// ai error class ta sync code er zonno

class ErrorHander extends Error {
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
    /* ai ErrorHander class k call korar somoy er modda duita
    argument pass korte hobe 1st argument a akta string dita hobe
    zar modda error message thakbe ar 2nd argument a akta number dita 
    hobe zeta hobe res er status code karon ai class er constructor
    method er duita peramitter ase message holo parent class er peramitr
    ar statusCode holo ai class er nizer peramitter.ai class er 
   duita property ase message holo parent class er property
    ar statusCode holo ai class er nizer property tai ai class ta
    ai duita property zukto akta obj k return korbe*/

    
    /* akhhae this keyword obj k represent kortisa
        ar this. costructor holo obj er constructor property zata
        oi obj er class k return kore.akhane amra Error parent
        class er  captureStackTrace method k ai class er modda 
        call korasi zokhon ai class diya obj banabo tokhon
        ai method ta call hobe */
  }
  /* ara akhane akta class creat kore satak node e pre define 
    class Error k inharit korlam.akhane message holo parent 
    class orthat Error class er constructor er peramiter.
    amra ai class a statusCode name akta property create korlam
    zar value input dita hobe */
}
module.exports= ErrorHander